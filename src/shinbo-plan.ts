/* Copied verbatim from the app (desktop/shared/plan.ts) so the hero's plan
   graph is laid out by the same code the real one is: rows are waves, x is
   pulled toward the middle of what a node feeds. */
export type PlanStep = {
  id: string;
  title: string;
  status: "todo" | "running" | "done" | "failed";
  needs: string[];
};
export type PlanSpot = { x: number; y: number; wave: number };

export const planEdges = (steps: PlanStep[]): { from: string; to: string }[] =>
  steps.flatMap((step) =>
    step.needs.map((need) => ({ from: need, to: step.id })),
  );

export function planRows(steps: PlanStep[]): string[][] {
  const level = new Map<string, number>();
  for (let pass = 0; pass < steps.length; pass += 1) {
    let moved = false;
    for (const step of steps) {
      if (step.needs.some((need) => !level.has(need))) continue;
      const row = step.needs.length
        ? Math.max(...step.needs.map((need) => level.get(need) ?? 0)) + 1
        : 0;
      if (level.get(step.id) !== row) {
        level.set(step.id, row);
        moved = true;
      }
    }
    if (!moved) break;
  }
  const stranded = steps.filter((step) => !level.has(step.id));
  const depth = Math.max(-1, ...level.values());
  for (const step of stranded) level.set(step.id, depth + 1);
  const rows: string[][] = [];
  for (const step of steps)
    (rows[level.get(step.id) ?? 0] ??= []).push(step.id);
  return rows.map((row) => row ?? []);
}

export const PLAN_ROW = 30; // px between drawn rows
export const PLAN_PAD = 15; // px above the first row and below the last
const LANE = 6; // nodes on one line before a wide wave folds onto a second
const PULL = 0.4;

export function planLayout(
  waves: string[][],
  steps: PlanStep[] = [],
  row = PLAN_ROW,
): { spots: Map<string, PlanSpot>; height: number } {
  const spots = new Map<string, PlanSpot>();
  const needsOf = new Map(steps.map((step) => [step.id, step.needs]));
  const branch = (id: string) =>
    steps
      .filter((step) => step.needs.length === 1 && step.needs[0] === id)
      .map((step) => step.id);
  const middle = (ids: string[]) => {
    const xs = ids
      .map((id) => spots.get(id)?.x)
      .filter((x): x is number => x !== undefined);
    return xs.length
      ? xs.reduce((total, x) => total + x, 0) / xs.length
      : undefined;
  };
  const lines: string[][] = [];
  let y = PLAN_PAD;
  waves.forEach((wave, index) => {
    const under = wave
      .map((id, at) => ({ id, at, x: middle(needsOf.get(id) ?? []) ?? 50 }))
      .sort((left, right) => left.x - right.x || left.at - right.at);
    for (let at = 0; at < under.length; at += LANE) {
      const line = under.slice(at, at + LANE).map((item) => item.id);
      line.forEach((id, i) =>
        spots.set(id, {
          x: ((i + 1) / (line.length + 1)) * 100,
          y,
          wave: index,
        }),
      );
      lines.push(line);
      y += row;
    }
  });
  for (const line of lines.reverse()) {
    const slot = 100 / (line.length + 1);
    line.forEach((id, i) => {
      const mid = middle(branch(id));
      if (mid === undefined) return;
      spots.set(id, {
        ...spots.get(id)!,
        x: Math.min(
          Math.max(mid, (i + 1 - PULL) * slot),
          (i + 1 + PULL) * slot,
        ),
      });
    });
  }
  return { spots, height: spots.size ? y - row + PLAN_PAD : 0 };
}

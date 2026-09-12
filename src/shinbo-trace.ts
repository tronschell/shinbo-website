/* Copied from the app (desktop/shared/trace.ts): the waterfall geometry, so the
   hero's timeline is laid out by the same pure functions the real one uses. */
export type TraceStatus = "running" | "ok" | "failed" | "cancelled";

export type TraceSpan = {
  id: string;
  parentId?: string;
  name: string;
  kind: string;
  startedAt: number;
  endedAt?: number;
  status: TraceStatus;
  tokens?: number;
};

const MIN_BAR = 1.5;

export type TraceRow = {
  span: TraceSpan;
  depth: number;
  offset: number;
  width: number;
  durationMs: number;
  children: number;
};

export function layoutSpans(
  spans: readonly TraceSpan[],
  now: number,
  collapsed: ReadonlySet<string> = new Set(),
): TraceRow[] {
  if (!spans.length) return [];
  const close = (span: TraceSpan) => span.endedAt ?? now;
  const start = Math.min(...spans.map((span) => span.startedAt));
  const total = Math.max(1, Math.max(...spans.map(close)) - start);

  const ids = new Set(spans.map((span) => span.id));
  const children = new Map<string, TraceSpan[]>();
  const roots: TraceSpan[] = [];
  for (const span of spans) {
    const parent =
      span.parentId && ids.has(span.parentId) ? span.parentId : undefined;
    if (!parent) roots.push(span);
    else children.set(parent, [...(children.get(parent) ?? []), span]);
  }
  for (const list of children.values())
    list.sort((left, right) => left.startedAt - right.startedAt);
  roots.sort((left, right) => left.startedAt - right.startedAt);

  const rows: TraceRow[] = [];
  const walk = (list: TraceSpan[], depth: number) => {
    for (const span of list) {
      const kids = children.get(span.id) ?? [];
      const durationMs = Math.max(0, close(span) - span.startedAt);
      const offset = ((span.startedAt - start) / total) * 100;
      rows.push({
        span,
        depth,
        offset,
        width: Math.min(
          100 - offset,
          Math.max(MIN_BAR, (durationMs / total) * 100),
        ),
        durationMs,
        children: kids.length,
      });
      if (!collapsed.has(span.id)) walk(kids, depth + 1);
    }
  };
  walk(roots, 0);
  return rows;
}

export function tokenAxis(spans: readonly TraceSpan[]): TraceSpan[] {
  const rows = layoutSpans(spans, 0);
  const seen: number[] = [];
  const parents = rows.map((row, index) => {
    seen[row.depth] = index;
    return row.depth ? seen[row.depth - 1] : -1;
  });
  const totals = rows.map((row) => Math.max(0, row.span.tokens ?? 0));
  for (let index = rows.length - 1; index > 0; index -= 1) {
    if (parents[index] >= 0) totals[parents[index]] += totals[index];
  }
  const cursors = rows.map(() => 0);
  let root = 0;
  return rows.map((row, index) => {
    const parent = parents[index];
    const at = parent >= 0 ? cursors[parent] : root;
    if (parent >= 0) cursors[parent] = at + totals[index];
    else root = at + totals[index];
    cursors[index] = at;
    return { ...row.span, startedAt: at, endedAt: at + totals[index] };
  });
}

export function formatDuration(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  const seconds = Math.round(ms / 1000);
  if (seconds < 60) return `${(ms / 1000).toFixed(2)}s`;
  return `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, "0")}s`;
}

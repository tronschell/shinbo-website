/* The plan graph as it looks in the app: numbered squares, done waves filled,
   one branch failed, everything downstream still dashed and waiting. */
const COL = [18, 62, 106, 150, 194, 238, 282];
const ROW = [6, 28, 50, 72];
const S = 16;

type State = "done" | "fail" | "run" | "wait";

const nodes: [n: number, c: number, r: number, w: number, s: State][] = [
  [1, 0, 0, 0, "done"],
  [2, 0, 1, 0, "done"],
  [3, 0, 2, 0, "done"],
  [4, 0, 3, 0, "done"],
  [5, 1, 0, 1, "done"],
  [6, 1, 1, 1, "done"],
  [7, 1, 2, 1, "done"],
  [8, 1, 3, 1, "done"],
  [9, 2, 1, 2, "done"],
  [10, 2, 2, 2, "done"],
  [11, 2, 3, 2, "fail"],
  [12, 3, 1, 3, "done"],
  [13, 3, 2, 3, "run"],
  [14, 4, 2, 4, "wait"],
  [15, 5, 2, 5, "wait"],
  [16, 6, 2, 6, "wait"],
];

const edges: [from: number, to: number, dead?: 1][] = [
  [1, 5],
  [1, 6],
  [2, 6],
  [3, 7],
  [4, 7],
  [4, 8],
  [5, 9],
  [6, 9],
  [6, 10],
  [7, 10],
  [8, 11],
  [9, 12],
  [10, 12],
  [10, 13],
  [11, 13, 1],
  [12, 14],
  [13, 14],
  [14, 15],
  [15, 16],
];

const at = (n: number) => {
  const [, c, r] = nodes[n - 1];
  return [COL[c], ROW[r]] as const;
};

export default function Plan() {
  return (
    <svg
      className="tile-art"
      viewBox="0 0 320 108"
      role="img"
      aria-label="A plan drawn as a dependency graph: finished waves of numbered nodes on the left, one failed branch, and the nodes behind it still waiting"
    >
      <style>{`
        .pl-e { stroke: var(--border-strong); stroke-width: 1; fill: none; }
        .pl-e.pl-dead { stroke: var(--text-3); stroke-dasharray: 2 3; opacity: .5; }
        .pl-e.pl-hot { stroke: var(--orange); }
        .pl-b { stroke-width: 1; }
        .pl-wait .pl-b { fill: var(--surface-3); stroke: var(--text-3); stroke-dasharray: 2 2; }
        .pl-done .pl-b { fill: var(--lime); stroke: var(--lime); }
        .pl-run .pl-b { fill: var(--orange); stroke: var(--orange); }
        .pl-fail .pl-b { fill: var(--rose); stroke: var(--rose); }
        .pl-t {
          font-family: var(--font-mono); font-size: 9px;
          text-anchor: middle; dominant-baseline: central;
        }
        .pl-wait .pl-t { fill: var(--text-2); }
        .pl-done .pl-t, .pl-run .pl-t, .pl-fail .pl-t { fill: var(--bg); }

        @media (prefers-reduced-motion: no-preference) {
          .pl-done .pl-b { animation: pl-done 8s linear infinite both; }
          .pl-fail .pl-b { animation: pl-fail 8s linear infinite both; }
          .pl-run .pl-b { animation: pl-run 8s linear infinite both; }
          .pl-done .pl-t, .pl-fail .pl-t, .pl-run .pl-t {
            animation: pl-ink 8s linear infinite both;
          }
          .pl-hot { animation: pl-edge 8s linear infinite both; }
          .pl-w0 .pl-b, .pl-w0 .pl-t { animation-delay: 0s; }
          .pl-w1 .pl-b, .pl-w1 .pl-t { animation-delay: .7s; }
          .pl-w2 .pl-b, .pl-w2 .pl-t { animation-delay: 1.4s; }
          .pl-w3 .pl-b, .pl-w3 .pl-t, .pl-hot { animation-delay: 2.1s; }
          @keyframes pl-done {
            0%, 6% { fill: var(--surface-3); stroke: var(--text-3); }
            7%, 11% { fill: var(--orange); stroke: var(--orange); }
            12%, 94% { fill: var(--lime); stroke: var(--lime); }
            96%, 100% { fill: var(--surface-3); stroke: var(--text-3); }
          }
          @keyframes pl-fail {
            0%, 6% { fill: var(--surface-3); stroke: var(--text-3); }
            7%, 11% { fill: var(--orange); stroke: var(--orange); }
            12%, 94% { fill: var(--rose); stroke: var(--rose); }
            96%, 100% { fill: var(--surface-3); stroke: var(--text-3); }
          }
          @keyframes pl-run {
            0%, 6% { fill: var(--surface-3); stroke: var(--text-3); }
            7%, 94% { fill: var(--orange); stroke: var(--orange); }
            96%, 100% { fill: var(--surface-3); stroke: var(--text-3); }
          }
          @keyframes pl-ink {
            0%, 6% { fill: var(--text-2); }
            7%, 94% { fill: var(--bg); }
            96%, 100% { fill: var(--text-2); }
          }
          @keyframes pl-edge {
            0%, 6% { stroke: var(--border-strong); }
            7%, 94% { stroke: var(--orange); }
            96%, 100% { stroke: var(--border-strong); }
          }
        }
      `}</style>

      {edges.map(([a, b, dead]) => {
        const [ax, ay] = at(a);
        const [bx, by] = at(b);
        const hot = nodes[a - 1][4] === "run";
        return (
          <line
            key={`${a}-${b}`}
            className={`pl-e${dead ? " pl-dead" : hot ? " pl-hot" : ""}`}
            x1={ax + S}
            y1={ay + S / 2}
            x2={bx}
            y2={by + S / 2}
          />
        );
      })}

      {nodes.map(([n, c, r, w, s]) => (
        <g key={n} className={`pl-n pl-${s} pl-w${Math.min(w, 3)}`}>
          <rect className="pl-b" x={COL[c]} y={ROW[r]} width={S} height={S} />
          <text className="pl-t" x={COL[c] + S / 2} y={ROW[r] + S / 2 + 0.5}>
            {n}
          </text>
        </g>
      ))}
    </svg>
  );
}

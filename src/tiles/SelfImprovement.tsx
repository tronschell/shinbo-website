export default function SelfImprovement() {
  const rows = [0, 1, 2, 3];
  const cols = [0, 1, 2, 3, 4, 5, 6, 7];
  const y = (r: number) => 28 + r * 14;
  return (
    <svg
      className="tile-art"
      viewBox="0 0 320 108"
      role="img"
      aria-label="Rows of finished-turn traces, one repeating mark flagged across all of them, and a single proposed change held beside it"
    >
      <style>{`
        .si-t { font-family: var(--font-mono); font-size: 8px; letter-spacing: 0.08em; text-transform: uppercase; fill: var(--text-3); }
        .si-t-s { font-size: 7px; }
        .si-mark { fill: var(--border-strong); }
        .si-hit { fill: var(--orange); }
        .si-wire { stroke: var(--border-strong); stroke-dasharray: 44; stroke-dashoffset: 0; }
        .si-box { fill: none; stroke: var(--orange); stroke-dasharray: 3 2; }

        @media (prefers-reduced-motion: no-preference) {
          .si-row { animation: si-land 8s linear infinite; }
          .si-r2 { animation-delay: 0.4s; } .si-r3 { animation-delay: 0.8s; } .si-r4 { animation-delay: 1.2s; }
          .si-flag { animation: si-flag 8s linear infinite; }
          .si-wire { animation: si-wire 8s linear infinite; }
          .si-draft { animation: si-draft 8s linear infinite; }

          @keyframes si-land { 0% { opacity: 0; transform: translateY(-3px); } 8%, 92% { opacity: 1; transform: none; } 100% { opacity: 0; transform: translateY(-3px); } }
          @keyframes si-flag { 0%, 30% { opacity: 0; } 42%, 92% { opacity: 1; } 100% { opacity: 0; } }
          @keyframes si-wire { 0%, 46% { stroke-dashoffset: 44; } 60%, 92% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 44; } }
          @keyframes si-draft { 0%, 56% { opacity: 0; transform: translateX(-4px); } 68%, 92% { opacity: 1; transform: none; } 100% { opacity: 0; transform: translateX(-4px); } }
        }
      `}</style>

      {rows.map((r) => (
        <g key={r} className={`si-row si-r${r + 1}`}>
          {cols.map((c) => (
            <rect
              key={c}
              className="si-mark"
              x={14 + c * 13}
              y={y(r)}
              width="8"
              height="8"
            />
          ))}
        </g>
      ))}

      <g className="si-flag">
        {rows.map((r) => (
          <rect
            key={r}
            className="si-hit"
            x={66}
            y={y(r)}
            width="8"
            height="8"
          />
        ))}
        <rect
          x="62"
          y="24"
          width="16"
          height="62"
          fill="none"
          stroke="var(--orange)"
          strokeDasharray="2 3"
        />
        <text className="si-t si-t-s" x="70" y="97" textAnchor="middle">
          REPEATS
        </text>
      </g>

      <line className="si-wire" x1="122" y1="54" x2="166" y2="54" />

      <g className="si-draft">
        <rect className="si-box" x="170" y="34" width="138" height="40" />
        <text className="si-t" x="180" y="52">
          ONE CHANGE PROPOSED
        </text>
        <text className="si-t si-t-s" x="180" y="65">
          HELD UNTIL PROVED
        </text>
      </g>
    </svg>
  );
}

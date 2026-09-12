export default function OpenSource() {
  return (
    <svg
      className="tile-art"
      viewBox="0 0 320 108"
      role="img"
      aria-label="A commit graph where one branch forks off a trunk and keeps committing on its own, labelled shinbo-cli, Apache-2.0"
    >
      <style>{`
        .os-t { font-family: var(--font-mono); font-size: 7.5px;
          letter-spacing: 0.08em; text-transform: uppercase; fill: var(--text-3); }
        .os-line { stroke: var(--border-strong); stroke-width: 1; fill: none; }
        .os-node { fill: var(--surface-4); stroke: var(--border-strong); stroke-width: 1; }
        .os-fork { stroke: var(--orange); stroke-width: 1; fill: none; }
        .os-seed { fill: var(--orange); }
        .os-bnode { fill: var(--orange); }
        .os-blabel { fill: var(--orange); }
        @media (prefers-reduced-motion: no-preference) {
          .os-fork { stroke-dasharray: 1; animation: os-draw 8s ease-in-out infinite both; }
          .os-d1 { animation-delay: 0.9s; }
          .os-bnode, .os-blabel { animation: os-in 8s ease-in-out infinite both; }
          .os-b1 { animation-delay: 1.4s; }
          .os-b2 { animation-delay: 2.0s; }
          .os-b3 { animation-delay: 2.6s; }
          .os-b4 { animation-delay: 3.2s; }
          .os-b5 { animation-delay: 3.8s; }
          .os-blabel { animation-delay: 4.4s; }
          .os-seed { animation: os-beat 8s ease-in-out infinite both; }
          @keyframes os-draw {
            0%, 8% { stroke-dashoffset: 1; }
            26%, 92% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: 1; }
          }
          @keyframes os-in {
            0%, 4% { opacity: 0; }
            14%, 90% { opacity: 1; }
            100% { opacity: 0; }
          }
          @keyframes os-beat {
            0%, 4% { opacity: 0.45; }
            12%, 100% { opacity: 1; }
          }
        }
      `}</style>

      <text className="os-t" x="20" y="24">
        vercel-labs/fx
      </text>
      <text className="os-t" x="300" y="24" textAnchor="end">
        apache-2.0
      </text>

      <line className="os-line" x1="20" y1="38" x2="272" y2="38" />
      {[20, 56, 92, 128, 164, 200, 236, 272].map((x) => (
        <rect
          key={x}
          className="os-node"
          x={x - 3}
          y="35"
          width="6"
          height="6"
        />
      ))}
      <rect className="os-seed" x="89" y="35" width="6" height="6" />

      <line
        className="os-fork"
        x1="92"
        y1="38"
        x2="128"
        y2="74"
        pathLength="1"
      />
      <line
        className="os-fork os-d1"
        x1="128"
        y1="74"
        x2="272"
        y2="74"
        pathLength="1"
      />
      {[128, 164, 200, 236, 272].map((x, i) => (
        <rect
          key={x}
          className={`os-bnode os-b${i + 1}`}
          x={x - 3}
          y="71"
          width="6"
          height="6"
        />
      ))}
      <text className="os-t os-blabel" x="128" y="92">
        shinbo-cli · zig
      </text>
    </svg>
  );
}

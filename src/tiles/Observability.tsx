const SPANS: [number, number, string][] = [
  [8, 62, "ob-m"],
  [70, 18, "ob-t"],
  [88, 14, "ob-t"],
  [102, 40, "ob-m"],
  [142, 96, "ob-s"],
  [150, 22, "ob-t"],
  [146, 110, "ob-s"],
  [160, 70, "ob-c"],
  [176, 26, "ob-t"],
  [256, 48, "ob-m"],
];

export default function Observability() {
  return (
    <svg
      className="tile-art"
      viewBox="0 0 320 108"
      role="img"
      aria-label="A dense span waterfall for one turn: model steps, tool calls, subagents and a CLI run drawing themselves left to right under a sweeping playhead"
    >
      <style>{`
        .ob-b { transform-box: fill-box; transform-origin: left center; }
        .ob-m { fill: var(--blue); }
        .ob-s { fill: var(--teal); }
        .ob-c { fill: var(--orange); }
        .ob-t { fill: var(--text-3); }
        .ob-l {
          font-family: var(--font-mono);
          font-size: 7px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          fill: var(--text-3);
        }
        .ob-rule { stroke: var(--surface-4); }
        .ob-base { stroke: var(--border-strong); }
        .ob-play { fill: var(--text-3); opacity: 0.45; }
        @media (prefers-reduced-motion: no-preference) {
          .ob-b { animation: ob-grow 8s linear infinite; }
          .ob-rows rect:nth-of-type(2) { animation-delay: 1.33s; }
          .ob-rows rect:nth-of-type(3) { animation-delay: 1.72s; }
          .ob-rows rect:nth-of-type(4) { animation-delay: 2.02s; }
          .ob-rows rect:nth-of-type(5) { animation-delay: 2.88s; }
          .ob-rows rect:nth-of-type(6) { animation-delay: 3.05s; }
          .ob-rows rect:nth-of-type(7) { animation-delay: 2.96s; }
          .ob-rows rect:nth-of-type(8) { animation-delay: 3.26s; }
          .ob-rows rect:nth-of-type(9) { animation-delay: 3.61s; }
          .ob-rows rect:nth-of-type(10) { animation-delay: 5.33s; }
          .ob-play { animation: ob-sweep 8s linear infinite; }
          @keyframes ob-grow {
            0% { transform: scaleX(0); }
            9%, 90% { transform: scaleX(1); }
            100% { transform: scaleX(0); }
          }
          @keyframes ob-sweep {
            0% { transform: translateX(-222px); opacity: 0.45; }
            80% { transform: translateX(76px); opacity: 0.45; }
            82%, 100% { transform: translateX(76px); opacity: 0; }
          }
        }
      `}</style>
      <text className="ob-l" x="8" y="8">
        ONE TURN · 10 SPANS
      </text>
      <line className="ob-rule" x1="8" y1="12" x2="306" y2="12" />
      <g className="ob-rows">
        {SPANS.map(([x, w, cls], i) => (
          <rect
            key={i}
            className={`ob-b ${cls}`}
            x={x}
            y={16 + i * 8.5}
            width={w}
            height="6"
          />
        ))}
      </g>
      <line className="ob-base" x1="8" y1="103" x2="306" y2="103" />
      <rect className="ob-play" x="230" y="12" width="1" height="90" />
    </svg>
  );
}

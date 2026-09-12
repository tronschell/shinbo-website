export default function Widgets() {
  return (
    <svg
      className="tile-art"
      viewBox="0 0 320 108"
      role="img"
      aria-label="An app layout in outline: one empty panel slot is claimed by a small live bar chart wired to the ledger panel beside it"
    >
      <style>{`
        .wg-l { fill: none; stroke: var(--border-strong); }
        .wg-dim { fill: var(--surface-4); }
        .wg-t {
          font-family: var(--font-mono);
          font-size: 7px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          fill: var(--text-3);
        }
        .wg-slot { fill: none; stroke: var(--border-strong); stroke-dasharray: 3 2; }
        .wg-empty { opacity: 0; }
        .wg-new { fill: none; stroke: var(--orange); }
        .wg-wire { stroke: var(--teal); stroke-dasharray: 2 2; }
        .wg-bars rect { fill: var(--teal); transform-box: fill-box; transform-origin: bottom; }
        @media (prefers-reduced-motion: no-preference) {
          .wg-empty { animation: wg-out 8s linear infinite; }
          .wg-live { animation: wg-in 8s linear infinite; }
          .wg-bars rect { animation: wg-pulse 6s ease-in-out infinite; }
          .wg-bars rect:nth-child(2) { animation-delay: -1s; }
          .wg-bars rect:nth-child(3) { animation-delay: -2s; }
          .wg-bars rect:nth-child(4) { animation-delay: -3s; }
          .wg-bars rect:nth-child(5) { animation-delay: -4s; }
          .wg-bars rect:nth-child(6) { animation-delay: -5s; }
        }
        @keyframes wg-out { 0%, 32% { opacity: 1; } 40%, 94% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes wg-in { 0%, 34% { opacity: 0; } 42%, 94% { opacity: 1; } 100% { opacity: 0; } }
        @keyframes wg-pulse { 0%, 100% { transform: scaleY(0.62); } 50% { transform: scaleY(1); } }
      `}</style>

      <rect className="wg-l" x="6" y="8" width="308" height="92" />
      <line className="wg-l" x1="6" y1="24" x2="314" y2="24" />
      <line className="wg-l" x1="64" y1="24" x2="64" y2="100" />
      <rect className="wg-dim" x="12" y="12" width="4" height="4" />
      <rect className="wg-dim" x="20" y="12" width="4" height="4" />
      <rect className="wg-dim" x="28" y="12" width="4" height="4" />
      <rect className="wg-dim" x="12" y="34" width="44" height="5" />
      <rect className="wg-dim" x="12" y="44" width="44" height="5" />
      <rect className="wg-dim" x="12" y="54" width="44" height="5" />

      <rect className="wg-l" x="72" y="30" width="104" height="26" />
      <text className="wg-t" x="78" y="41">
        LEDGER
      </text>
      <rect x="78" y="45" width="30" height="5" fill="var(--blue)" />
      <rect x="108" y="45" width="22" height="5" fill="var(--teal)" />
      <rect x="130" y="45" width="16" height="5" fill="var(--violet)" />
      <rect className="wg-dim" x="146" y="45" width="24" height="5" />

      <rect className="wg-l" x="72" y="64" width="104" height="26" />
      <rect className="wg-dim" x="78" y="72" width="76" height="4" />
      <rect className="wg-dim" x="78" y="80" width="52" height="4" />

      <g className="wg-empty">
        <rect className="wg-slot" x="186" y="30" width="118" height="60" />
        <text className="wg-t" x="245" y="63" textAnchor="middle">
          SLOT
        </text>
      </g>

      <g className="wg-live">
        <line className="wg-wire" x1="176" y1="47" x2="186" y2="47" />
        <rect className="wg-new" x="186" y="30" width="118" height="60" />
        <text className="wg-t" x="192" y="42">
          FROM LEDGER
        </text>
        <line className="wg-l" x1="192" y1="84" x2="298" y2="84" />
        <g className="wg-bars">
          <rect x="194" y="62" width="10" height="22" />
          <rect x="210" y="50" width="10" height="34" />
          <rect x="226" y="68" width="10" height="16" />
          <rect x="242" y="46" width="10" height="38" />
          <rect x="258" y="56" width="10" height="28" />
          <rect x="274" y="42" width="10" height="42" />
        </g>
      </g>
    </svg>
  );
}

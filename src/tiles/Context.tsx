export default function Context() {
  return (
    <svg
      className="tile-art"
      viewBox="0 0 320 108"
      role="img"
      aria-label="A segmented context-window bar by kind; a fact drops out of the far end and is re-injected at the front"
    >
      <style>{`
        .cx-t {
          font-family: var(--font-mono);
          font-size: 8px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          fill: var(--text-3);
        }
        .cx-grow, .cx-fact { transform-box: view-box; }
        .cx-grow { transform-origin: 274px 47px; }
        @media (prefers-reduced-motion: no-preference) {
          .cx-grow { animation: cx-fill 8s ease-in-out infinite; }
          .cx-fact { animation: cx-drop 8s ease-in-out infinite; }
        }
        @keyframes cx-fill {
          0%   { transform: scaleX(0.3); }
          55%  { transform: scaleX(1); }
          72%  { transform: scaleX(1); }
          100% { transform: scaleX(0.3); }
        }
        @keyframes cx-drop {
          0%, 50% { transform: translate(0, 0); opacity: 1; }
          62%     { transform: translate(2px, 30px); opacity: 0.55; }
          74%     { transform: translate(-272px, 30px); opacity: 0.55; }
          84%, 94%{ transform: translate(-274px, 0); opacity: 1; }
          97%     { transform: translate(-274px, 0); opacity: 0; }
          98%     { transform: translate(0, 0); opacity: 0; }
          100%    { transform: translate(0, 0); opacity: 1; }
        }
      `}</style>

      <text className="cx-t" x="16" y="30">
        CONTEXT WINDOW
      </text>

      <rect
        x="16"
        y="40"
        width="288"
        height="14"
        fill="var(--surface-3)"
        stroke="var(--border-strong)"
      />
      <rect x="16" y="40" width="130" height="14" fill="var(--blue)" />
      <rect x="146" y="40" width="60" height="14" fill="var(--teal)" />
      <rect x="206" y="40" width="40" height="14" fill="var(--rose)" />
      <rect x="246" y="40" width="28" height="14" fill="var(--orange)" />
      <rect
        className="cx-grow"
        x="274"
        y="40"
        width="14"
        height="14"
        fill="var(--violet)"
      />

      <line
        x1="296"
        y1="77"
        x2="22"
        y2="77"
        stroke="var(--border-strong)"
        strokeDasharray="3 4"
      />

      <rect
        className="cx-fact"
        x="290"
        y="41"
        width="12"
        height="12"
        fill="var(--lime)"
      />

      <text className="cx-t" x="16" y="98">
        RE-INJECT
      </text>
      <text className="cx-t" x="304" y="98" textAnchor="end">
        DROPS OUT
      </text>
    </svg>
  );
}

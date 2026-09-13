/* Animated art for the feature bento and the home-page sections. Every
   piece is CSS-keyframed (see features.css), loops, pauses under
   [data-motion="paused"] and collapses to its first frame under
   prefers-reduced-motion. */
import type { CSSProperties, ReactNode } from "react";
import { brands, clis, modes } from "../shared";
import Plan from "./Plan";
import "./features.css";

/* Stacks children and shows one at a time, `seconds` each. Siblings that
   share a length and duration stay in phase, which the permissions table
   relies on. */
function Cycle({
  items,
  seconds = 2.4,
  className = "",
}: {
  items: ReactNode[];
  seconds?: number;
  className?: string;
}) {
  const n = items.length;
  return (
    <div
      className={`ft-cycle ${className}`}
      data-n={n}
      style={{ "--t": `${n * seconds}s` } as CSSProperties}
    >
      {items.map((item, i) => (
        <div key={i} style={{ "--i": i } as CSSProperties}>
          {item}
        </div>
      ))}
    </div>
  );
}

export function AgentClis() {
  return (
    <div className="ft ft-clis" aria-hidden="true">
      <Cycle
        className="ft-clis-big"
        items={clis.map((cli) => (
          <>
            <img src={`/brands/${cli.brand}`} alt="" width="44" height="44" />
            <span>{cli.name}</span>
          </>
        ))}
      />
      <div className="ft-clis-row">
        {clis.map((cli) => (
          <img
            key={cli.name}
            src={`/brands/${cli.brand}`}
            alt=""
            width="20"
            height="20"
          />
        ))}
      </div>
    </div>
  );
}

// Seven entries so Cycle's ft-cycle-7 keyframes line up.
const headline: [ns: string, model: string][] = [
  ["openai", "gpt-6-astra"],
  ["anthropic", "claude-fable-5.1"],
  ["anthropic", "claude-opus-5"],
  ["moonshotai", "kimi-k3"],
  ["z-ai", "glm-5.3"],
  ["meta-llama", "meta-muse-1.3"],
  ["thinkingmachines", "inkling"],
];

// Every model provider with a logo, for the scrolling strip.
const strip = Object.values(brands)
  .slice(0, Object.keys(brands).indexOf("ollama"))
  .flatMap(([file]) => (file ? [file] : []));

export function Models() {
  return (
    <div className="ft ft-models" aria-hidden="true">
      <Cycle
        items={headline.map(([ns, model]) => (
          <>
            <img
              src={`/brands/${brands[ns][0]}`}
              alt=""
              width="40"
              height="40"
            />
            <b>{model}</b>
            <span>{brands[ns][1]}</span>
          </>
        ))}
      />
      <div className="ft-strip">
        <div>
          {[...strip, ...strip].map((file, i) => (
            <img
              key={i}
              src={`/brands/${file}`}
              alt=""
              width="20"
              height="20"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const waves: [label: string, x: number][][] = [
  [
    ["read docs", 104],
    ["check types", 216],
  ],
  [
    ["fix lint", 104],
    ["run suite", 216],
  ],
];

/* A small robot: antenna, head, two eyes. Marks every agent box. */
function Bot({ x, y }: { x: number; y: number }) {
  return (
    <g className="ft-bot" transform={`translate(${x} ${y})`}>
      <path d="M6 0v-3" />
      <circle cx="6" cy="-3.5" r="1.2" />
      <rect x="0" y="0" width="12" height="9" />
      <rect className="ft-bot-eye" x="3" y="3" width="2" height="3" />
      <rect className="ft-bot-eye" x="7" y="3" width="2" height="3" />
    </g>
  );
}

export function Subagents() {
  return (
    <svg
      className="ft ft-sub"
      viewBox="0 0 320 132"
      aria-hidden="true"
      focusable="false"
    >
      <g className="ft-sub-parent">
        <rect x="108" y="6" width="104" height="30" />
        <Bot x={116} y={16} />
        <text x="134" y="21">
          main agent
        </text>
      </g>
      {waves.map((wave, w) => (
        <g key={w} className="ft-sub-wave" data-wave={w}>
          {wave.map(([label, x], i) => (
            <g key={label} style={{ "--i": i } as CSSProperties}>
              <path className="ft-sub-wire" d={`M160 36 V58 H${x} V78`} />
              <g className="ft-sub-child">
                <rect x={x - 52} y="78" width="104" height="30" />
                <Bot x={x - 44} y={88} />
                <text x={x - 26} y="93">
                  {label}
                </text>
                <circle className="ft-sub-spin" cx={x + 42} cy="93" r="3" />
                <path className="ft-sub-done" d={`M${x + 37} 93 l3 3 l6 -7`} />
              </g>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}

type Verdict = "ask" | "run" | "screen" | "block";
const verdictText: Record<Verdict, string> = {
  ask: "Asks you",
  run: "Runs",
  screen: "Runs after a check",
  block: "Blocked · prohibited action",
};
/* One request against the four modes, in `modes` order: Ask, Accept edits,
   Auto, Full access. Verdicts follow the permission guide: Auto screens
   ten prohibited actions, other apps always ask, computer use never unlocks. */
const requests: [request: string, verdicts: Verdict[]][] = [
  ["Write src/app.ts", ["ask", "run", "run", "run"]],
  ["Run npm test", ["ask", "ask", "screen", "run"]],
  ["Delete ~/Downloads", ["ask", "ask", "block", "run"]],
  ["Open Safari", ["ask", "ask", "ask", "ask"]],
  ["Click the pointer", ["ask", "ask", "ask", "ask"]],
];

export function Permissions() {
  return (
    <div className="ft ft-perm" aria-hidden="true">
      <div className="ft-perm-req">
        <span>Request</span>
        <Cycle
          seconds={3.2}
          items={requests.map(([request]) => (
            <b>{request}</b>
          ))}
        />
      </div>
      {modes.map(([glyph, name], m) => (
        <div className="ft-perm-row" key={name}>
          <span>
            <i>{glyph}</i>
            {name}
          </span>
          <Cycle
            seconds={3.2}
            items={requests.map(([, verdicts]) => (
              <em data-verdict={verdicts[m]}>{verdictText[verdicts[m]]}</em>
            ))}
          />
        </div>
      ))}
    </div>
  );
}

const memories: [
  kind: "user" | "project",
  text: string,
  x: number,
  y: number,
][] = [
  ["user", "prefers pnpm", 96, 46],
  ["project", "api lives in /server", 150, 68],
  ["user", "keep replies short", 108, 92],
  ["project", "tests use vitest", 172, 112],
];

export function Memory() {
  return (
    <svg
      className="ft ft-mem"
      viewBox="0 0 320 150"
      aria-hidden="true"
      focusable="false"
    >
      {/* brain: two lobes plus a centre fold */}
      <path
        className="ft-mem-brain"
        d="M160 26c-14-14-44-12-56 6-22 0-40 22-32 44-14 14-6 42 14 46 8 18 40 22 54 8 4 4 8 6 20 6s16-2 20-6c14 14 46 10 54-8 20-4 28-32 14-46 8-22-10-44-32-44-12-18-42-20-56-6z"
      />
      <path className="ft-mem-fold" d="M160 26c-6 24-6 76 0 110" />
      {memories.map(([kind, text, x, y], i) => (
        <g
          key={text}
          className="ft-mem-chip"
          data-kind={kind}
          style={{ "--i": i } as CSSProperties}
          transform={`translate(${x} ${y})`}
        >
          <rect
            width={(kind.length + text.length + 1) * 5.2 + 12}
            height="16"
          />
          <text x="6" y="8.5">
            <tspan className="ft-mem-kind">{kind}</tspan>
            <tspan dx="4">{text}</tspan>
          </text>
        </g>
      ))}
    </svg>
  );
}

const extensions: [label: string, logo: string | null][] = [
  ["GitHub", "github.svg"],
  ["Skill", null],
  ["Linear", "linear.svg"],
  ["MCP server", null],
  ["Notion", "notion.svg"],
  ["Figma", "figma.png"],
  ["Obsidian", "obsidian.svg"],
  ["Widget", null],
  ["Slack", "slack.png"],
  ["Plugin", null],
  ["Vercel", "vercel.png"],
  ["Stripe", "stripe.png"],
  ["OpenRouter", "openrouter.svg"],
  ["Sentry", "sentry.svg"],
  ["Supabase", "supabase.png"],
];

export function Extensions() {
  return (
    <div className="ft ft-ext" aria-hidden="true">
      {extensions.map(([label, logo], i) => (
        <span key={label} style={{ "--i": i } as CSSProperties}>
          {logo ? (
            <img src={`/brands/${logo}`} alt="" width="16" height="16" />
          ) : (
            <i />
          )}
          {label}
        </span>
      ))}
    </div>
  );
}

const learningSteps: [step: string, caption: string][] = [
  ["Run", "The task runs. This one fails."],
  ["Review", "Reads the trace and finds the cause."],
  ["Repair", "Proposes one change."],
  ["Replay", "Runs the same task again."],
];

/* Per-step visuals: a progress bar that fails, a trace with one span
   flagged, a one-line diff, and a progress bar that passes. */
const learningViz = [
  <div className="ft-learn-bar" key="run">
    <i />
    <em>✕ failed</em>
  </div>,
  <div className="ft-learn-trace" key="review">
    <i />
    <i />
    <i data-cause="" />
    <i />
    <em>cause</em>
  </div>,
  <div className="ft-learn-diff" key="repair">
    <s>retry: 1</s>
    <ins>retry: 3, backoff</ins>
  </div>,
  <div className="ft-learn-bar" data-pass="" key="replay">
    <i />
    <em>✓ passed</em>
  </div>,
];

export function Learning() {
  return (
    <div className="ft ft-learn" aria-hidden="true">
      <ol>
        {learningSteps.map(([step, caption], i) => (
          <li key={step} data-step={i}>
            <b>{step}</b>
            <span>{caption}</span>
            {learningViz[i]}
          </li>
        ))}
      </ol>
      <div className="ft-learn-result">
        <span className="ft-learn-keep">✓ Replay passed · change kept</span>
        <span className="ft-learn-drop">
          ✕ Still failing · change discarded
        </span>
      </div>
    </div>
  );
}

/* The schedule fires, then the workflow below it runs node by node. */
export function ScheduledRun({ compact = false }: { compact?: boolean } = {}) {
  return (
    <svg
      className="ft ft-sched"
      viewBox="0 0 360 184"
      aria-hidden="true"
      focusable="false"
    >
      <g className="ft-sched-card">
        <rect x="8" y="12" width="140" height="160" />
        {compact ? (
          <text className="ft-sched-h" x="20" y="40">
            Mon 09:00
          </text>
        ) : (
          <>
            <text className="ft-sched-h" x="20" y="34">
              weekly project brief
            </text>
            <text x="20" y="50">
              Mon 09:00 UTC
            </text>
            <text className="ft-sched-cron" x="20" y="64">
              0 9 * * 1
            </text>
          </>
        )}
        <circle className="ft-sched-ring-bg" cx="78" cy="118" r="26" />
        <circle className="ft-sched-ring" cx="78" cy="118" r="26" />
        <text className="ft-sched-wait" x="78" y="118">
          waiting
        </text>
        <text className="ft-sched-fire" x="78" y="118">
          run
        </text>
      </g>
      <path className="ft-sched-wire" d="M148 86 H176 V26 H204" />
      <g className="ft-sched-node" data-node="0">
        <rect x="204" y="12" width="120" height="28" />
        <text x="214" y="26">
          AGENT digest
        </text>
      </g>
      <path className="ft-sched-edge" d="M264 40 V52" />
      <g className="ft-sched-node" data-node="1">
        <rect x="204" y="52" width="120" height="28" />
        <text x="214" y="66">
          SET window
        </text>
      </g>
      <path className="ft-sched-edge" d="M264 80 V92" />
      <g className="ft-sched-node" data-node="2">
        <rect x="204" y="92" width="120" height="28" />
        <text x="214" y="106">
          IF errors
        </text>
      </g>
      <path className="ft-sched-edge" d="M234 120 V144" />
      <text className="ft-sched-label" x="240" y="132">
        true
      </text>
      <path className="ft-sched-edge" d="M300 120 V144" />
      <text className="ft-sched-label" x="306" y="132">
        false
      </text>
      <g className="ft-sched-node" data-node="3">
        <rect x="204" y="144" width="76" height="28" />
        <text x="214" y="158">
          {compact ? "SCRIPT" : "SCRIPT ship"}
        </text>
      </g>
      <g className="ft-sched-node" data-node="4">
        <rect x="288" y="144" width="40" height="28" />
        <text x="298" y="158">
          END
        </text>
      </g>
    </svg>
  );
}

export function Workspace() {
  return (
    <img
      className="vc-feature-shot"
      src="/shots/thumbs/workspace.png"
      alt=""
      width="720"
      height="448"
      loading="lazy"
      decoding="async"
    />
  );
}

export const featureTiles: Record<string, () => ReactNode> = {
  harness: AgentClis,
  delegation: Subagents,
  plan: Plan,
  models: Models,
  control: Permissions,
  surfaces: Workspace,
  knowledge: Memory,
  jobs: () => <ScheduledRun compact />,
  agent: Learning,
  tools: Extensions,
};

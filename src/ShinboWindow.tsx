/* The hero window is Shinbo, not a picture of Shinbo.
   Every class name below is the app's own — .app-shell, .conversation,
   .thread-bar, .transcript, .message, .steps-more, .step-edit, .turn-agents,
   .task-bar, .composer, .model-menu, .inspector, .context-usage, .trace,
   .plan-graph, .subagents — copied out of desktop/src/*.tsx, and the CSS it
   renders against is desktop/src/styles/*.css scoped under .ew by
   scripts/shinbo-css.mjs. The geometry of the waterfall and the plan graph is
   the app's own code too (src/shinbo-trace.ts, src/shinbo-plan.ts).
   What is fake is only the session: a scripted model that thinks, calls tools,
   edits files, delegates to subagents, walks a task list, and fills a context
   ledger and a timeline as it goes, on a loop. Nothing here talks to anything. */
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { chain } from "./shared";
import {
  layoutSpans,
  formatDuration,
  tokenAxis,
  type TraceSpan,
} from "./shinbo-trace";
import {
  planEdges,
  planLayout,
  planRows,
  PLAN_ROW,
  type PlanStep,
} from "./shinbo-plan";
import {
  BranchIcon,
  BrandIcon,
  CaretIcon,
  CurveIcon,
  ExpandIcon,
  GlobeIcon,
  InspectorIcon,
  Mark,
  PencilIcon,
  ReviewIcon,
  TerminalIcon,
  TextIcon,
  ToolIcon,
  ToolMark,
} from "./shinbo-icons";

/* --- the app's own vocabulary (shared/usage.ts, shared/permissions.ts) ------ */

const CHARS_PER_TOKEN = 4;
const charLabel = (chars: number) =>
  chars < 1000
    ? `${chars}`
    : `${(chars / 1000).toFixed(chars < 10_000 ? 1 : 0)}k`;
const tokenLabel = (chars: number) =>
  charLabel(Math.round(chars / CHARS_PER_TOKEN));
const shareLabel = (part: number, whole: number) =>
  whole > 0 ? `${((part / whole) * 100).toFixed(1)}%` : "—";
const plural = (count: number, one: string, many = `${one}s`) =>
  count === 1 ? one : many;
const clock = (ms: number) => `${Math.round(ms / 1000)}s`;
const barLabel = (value: number) => `${charLabel(Math.round(value))} tok`;

type StepStatus =
  "pending" | "in_progress" | "completed" | "failed" | "cancelled";
type Hunk = { kind: "+" | "-" | " "; line: number; text: string };
type Edit = { path: string; added: number; removed: number; hunks: Hunk[] };
type Step = {
  id: number;
  toolName: string;
  title: string;
  status: StepStatus;
  edit?: Edit;
};
type Agent = {
  threadId: string;
  title: string;
  activity: string;
  color: string;
  status: "running" | "done";
  model: string;
};
type TaskStatus = "pending" | "in_progress" | "completed" | "blocked";
type Task = { id: string; title: string; status: TaskStatus; subtasks: Task[] };
type Row = {
  kind: "messages" | "system" | "tools" | "mcp" | "skills" | "memory";
  label: string;
  chars: number;
  turns: number;
};

type Turn = {
  key: number;
  role: "user" | "assistant";
  content: string;
  thinking?: string;
  steps?: Step[];
  agents?: Agent[];
  model?: string;
  time?: string;
  ms?: number;
  outputTokens?: number;
};

const PATH_TOOLS = new Set([
  "read_file",
  "file_info",
  "open_file",
  "write_file",
  "edit_file",
  "delete_file",
  "create_folder",
  "list_files",
  "look_at_image",
]);
const stepLabel = (step: Step) =>
  step.edit ? `Edited ${step.edit.path.split(/[\\/]+/).pop()}` : step.title;

/* --- the script: one exchange per entry, replayed on a loop ---------------- */

type Beat =
  | { t: "think"; text: string }
  | { t: "tool"; tool: string; title: string; ms: number; fails?: true }
  | {
      t: "edit";
      path: string;
      added: number;
      removed: number;
      hunks: Hunk[];
      ms: number;
    }
  | {
      t: "agents";
      agents: { title: string; activity: string; color: string }[];
    }
  | { t: "settle" }
  | { t: "task" }
  | { t: "say"; text: string };

type Script = {
  ask: string;
  list: { title: string; goal: string; tasks: [string, string[]][] };
  beats: Beat[];
};

const hunks = (lines: [Hunk["kind"], number, string][]): Hunk[] =>
  lines.map(([kind, line, text]) => ({ kind, line, text }));

const SCRIPTS: Script[] = [
  {
    ask: "The hero on the site is a drawing of you. Make it actually be you — same markup, same styles, fake conversation.",
    list: {
      title: "Clone the window into the hero",
      goal: "The site's hero is the app itself, not a lookalike",
      tasks: [
        [
          "Read the conversation surface",
          ["thread bar", "transcript", "composer"],
        ],
        [
          "Scope the app CSS under .ew",
          ["write the generator", "check for collisions"],
        ],
        ["Rebuild the hero window", []],
        ["Wire the fake harness", ["ledger", "timeline"]],
        ["Check the build", []],
      ],
    },
    beats: [
      {
        t: "think",
        text: "A picture of the app undersells the app. The honest version is the app's own markup against the app's own stylesheet, with a scripted model behind it — so read the conversation surface first, then take the CSS as it is instead of re-typing it.",
      },
      {
        t: "tool",
        tool: "grep_files",
        title: 'Searched desktop/src for className="message',
        ms: 640,
      },
      {
        t: "tool",
        tool: "read_file",
        title: "Read desktop/src/App.tsx",
        ms: 1180,
      },
      {
        t: "tool",
        tool: "read_file",
        title: "Read desktop/src/styles/conversation.css",
        ms: 720,
      },
      {
        t: "agents",
        agents: [
          {
            title: "survey",
            activity: "reading the inspector widgets",
            color: "var(--teal)",
          },
          {
            title: "extract",
            activity: "scoping the app CSS",
            color: "var(--violet)",
          },
        ],
      },
      { t: "task" },
      {
        t: "tool",
        tool: "write_file",
        title: "Wrote scripts/shinbo-css.mjs",
        ms: 900,
      },
      { t: "settle" },
      {
        t: "edit",
        path: "src/ShinboWindow.tsx",
        added: 214,
        removed: 96,
        ms: 1520,
        hunks: hunks([
          [" ", 41, "export default function ShinboWindow() {"],
          ["-", 42, '  return <div className="ew">'],
          ["+", 42, '  return <div className="ew-frame" ref={frame}>'],
          ["+", 43, '    <div className="ew"><div className="app-shell">'],
          ["+", 44, "      <Conversation turns={turns} live={live} />"],
        ]),
      },
      { t: "task" },
      { t: "settle" },
      { t: "tool", tool: "terminal", title: "Ran npm run build", ms: 1240 },
      { t: "task" },
      {
        t: "say",
        text: "Done — the hero is the window now. The markup is Shinbo's own, and the stylesheet is desktop/src/styles scoped under .ew by a script, so nothing was re-typed by hand. Everything you can see moves: the task list fills in, the ledger grows, the timeline lays itself down, and the composer takes a turn.",
      },
    ],
  },
  {
    ask: "The check is red on formatting. Fix it and keep the diff small.",
    list: {
      title: "Get the check green",
      goal: "npm run check passes on main",
      tasks: [
        ["Run the check", []],
        ["Format what drifted", ["prettier", "re-read the generator"]],
        ["Re-run the check", []],
      ],
    },
    beats: [
      {
        t: "think",
        text: "Formatting, not types — three files drifted when the generated CSS landed. Run the formatter, re-run the check, touch nothing else. A red check is not the place to start refactoring.",
      },
      {
        t: "tool",
        tool: "terminal",
        title: "Ran npm run check",
        ms: 2100,
        fails: true,
      },
      { t: "task" },
      {
        t: "tool",
        tool: "terminal",
        title: "Ran npx prettier --write src",
        ms: 860,
      },
      {
        t: "edit",
        path: "src/shinbo-window.css",
        added: 12,
        removed: 12,
        ms: 640,
        hunks: hunks([
          [
            "-",
            118,
            ".ew .step{display:flex;align-items:baseline;gap:var(--s-2)}",
          ],
          ["+", 118, ".ew .step {"],
          ["+", 119, "  display: flex;"],
          ["+", 120, "  align-items: baseline;"],
        ]),
      },
      { t: "task" },
      { t: "tool", tool: "terminal", title: "Ran npm run check", ms: 3400 },
      { t: "task" },
      {
        t: "say",
        text: "Green. Formatting only — the generator wrote its CSS minified and prettier wanted it expanded, so the fix is in the output, not in any rule. tsc, eslint and prettier all pass.",
      },
    ],
  },
  {
    ask: "Every three hours, check the free chain still answers and open a thread if one is down.",
    list: {
      title: "Watch the free chain",
      goal: "Know within three hours when a free model stops answering",
      tasks: [
        ["Write the job", ["probe", "thread on failure"]],
        ["Dry-run it once", []],
        ["Put it on the schedule", []],
      ],
    },
    beats: [
      {
        t: "think",
        text: "This is a scheduled job, not a turn: it should run without me, hold its own thread, and only bother you when a model stops answering. Write it, dry-run it against the ten free models, then schedule it at three hours.",
      },
      { t: "tool", tool: "read_file", title: "Read src/shared.tsx", ms: 560 },
      {
        t: "agents",
        agents: [
          {
            title: "probe",
            activity: "pinging ten endpoints",
            color: "var(--blue)",
          },
        ],
      },
      {
        t: "tool",
        tool: "web_fetch",
        title: "Fetched openrouter.ai/api/v1/models",
        ms: 1460,
      },
      { t: "settle" },
      { t: "task" },
      {
        t: "edit",
        path: ".shinbo/jobs/chain-watch.ts",
        added: 47,
        removed: 0,
        ms: 980,
        hunks: hunks([
          ["+", 1, 'export const every = "3h";'],
          ["+", 2, "export async function run({ thread }) {"],
          ["+", 3, "  const down = await probe(CHAIN);"],
          [
            "+",
            4,
            '  if (down.length) await thread.open(`chain: ${down.join(", ")} down`);',
          ],
        ]),
      },
      { t: "task" },
      { t: "tool", tool: "run_tool", title: "Ran the job once, dry", ms: 2240 },
      { t: "task" },
      {
        t: "say",
        text: "Scheduled — every three hours, in its own thread. It pings all ten free models and only writes to you when one stops answering; the run that just went through found all ten up.",
      },
    ],
  },
];

/* --- the model catalogue: the site's own free chain ------------------------ */

const CONTEXT: Record<string, number> = {
  "nvidia/nemotron-3-ultra-550b-a55b:free": 1_000_000,
  "thinkingmachines/inkling:free": 262_144,
  "z-ai/glm-5.2:free": 1_000_000,
  "poolside/laguna-s-2.1:free": 131_072,
  "nvidia/nemotron-3-super-120b-a12b:free": 262_144,
  "thinkingmachines/inkling-small:free": 262_144,
  "dots-studio/dots-3-note-preview:free": 131_072,
  "poolside/laguna-xs-2.1:free": 131_072,
  "cohere/north-mini-code:free": 256_000,
  "nvidia/nemotron-3.5-lightning:free": 131_072,
};

const contextMark = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 0,
});
const MODELS = chain.map((id) => ({
  key: id,
  name: id.split("/")[1],
  maker: id.split("/")[0],
  context: CONTEXT[id] ?? 131_072,
}));

const THINKING = ["off", "minimal", "low", "medium", "high", "max"] as const;
const THINKING_LABELS: Record<string, string> = {
  off: "Off",
  minimal: "Minimal",
  low: "Low",
  medium: "Medium",
  high: "High",
  max: "Max",
};
const MODES = ["ask", "acceptEdits", "auto", "full"] as const;
const MODE_NAMES: Record<string, string> = {
  ask: "Ask",
  acceptEdits: "Accept edits",
  auto: "Auto",
  full: "Full access",
};
const MODE_GLYPHS: Record<string, string> = {
  ask: "◈",
  acceptEdits: "◆",
  auto: "⬗",
  full: "⬥",
};
const MODE_MEANINGS: Record<string, string> = {
  ask: "Request permission before making any changes",
  acceptEdits: "Edit files without asking, but ask before running anything",
  auto: "A verifier clears gated calls; app access still asks you",
  full: "Skip file and command approvals; app access still asks you",
};

/* --- the thread as it stands when the window opens ------------------------- */

const SEED: Turn[] = [
  {
    key: -4,
    role: "user",
    content:
      "Before you touch the hero: what is actually in the context window right now?",
  },
  {
    key: -3,
    role: "assistant",
    content:
      "About 41k tokens of a 1M window — a tenth of it is this thread, and the rest is the system prompt, the tool schemas, one MCP server and the four memory files this folder loads. The ledger on the right breaks it down by kind, and the timeline under it is this turn's waterfall.",
    thinking:
      "Answer off the ledger rather than guessing: it already knows the split by kind, so read it back instead of counting tokens in my head.",
    steps: [
      {
        id: -3,
        toolName: "read_tool_result",
        title: "Read the context ledger",
        status: "completed",
      },
      {
        id: -2,
        toolName: "list_files",
        title: "Listed .shinbo/memory",
        status: "completed",
      },
    ],
    model: "z-ai/glm-5.2:free",
    time: "16:31",
    ms: 4200,
    outputTokens: 420,
  },
];

const BASE_ROWS: Row[] = [
  { kind: "messages", label: "This thread", chars: 16_400, turns: 2 },
  { kind: "system", label: "System prompt", chars: 34_800, turns: 1 },
  { kind: "tools", label: "System tools", chars: 61_200, turns: 1 },
  { kind: "mcp", label: "MCP · playwright", chars: 24_900, turns: 1 },
  { kind: "skills", label: "Skills · 3 imported", chars: 15_600, turns: 1 },
  { kind: "memory", label: "Memory · 4 files", chars: 11_800, turns: 1 },
];

const SEED_SPANS: TraceSpan[] = [
  {
    id: "root",
    name: "answer the ledger",
    kind: "agent",
    startedAt: 0,
    endedAt: 4200,
    status: "ok",
    tokens: 1200,
  },
  {
    id: "m0",
    parentId: "root",
    name: "z-ai/glm-5.2:free",
    kind: "model",
    startedAt: 40,
    endedAt: 2640,
    status: "ok",
    tokens: 2400,
  },
  {
    id: "t0",
    parentId: "root",
    name: "read_tool_result",
    kind: "tool",
    startedAt: 2700,
    endedAt: 2940,
    status: "ok",
    tokens: 600,
  },
  {
    id: "t1",
    parentId: "root",
    name: "list_files",
    kind: "tool",
    startedAt: 2980,
    endedAt: 3160,
    status: "ok",
    tokens: 220,
  },
  {
    id: "m1",
    parentId: "root",
    name: "z-ai/glm-5.2:free",
    kind: "model",
    startedAt: 3200,
    endedAt: 4200,
    status: "ok",
    tokens: 1800,
  },
];

/* --- transcript pieces ----------------------------------------------------- */

function FileMark({ path }: { path: string }) {
  const name = path.slice(path.lastIndexOf("/") + 1).toLowerCase();
  const extension = name.includes(".")
    ? name.slice(name.lastIndexOf(".") + 1)
    : "";
  return (
    <span className="git-type" aria-hidden>
      {extension.slice(0, 4) || "·"}
    </span>
  );
}

function Thought({
  text,
  ms,
  tokens,
  live,
}: {
  text: string;
  ms: number;
  tokens: number;
  live?: string;
}) {
  if (!text.trim() && !live) return null;
  return (
    <details className="thinking" data-live={live ? "true" : undefined}>
      <summary>
        {live
          ? `${clock(ms)} · ${charLabel(tokens)} tokens · ${live}`
          : ms > 0
            ? `Thought for ${clock(ms)} · ${charLabel(tokens)} tokens`
            : `Thought · ${charLabel(tokens)} tokens`}
      </summary>
      <p>{text}</p>
    </details>
  );
}

const stepPath = (step: Step) => {
  if (step.edit) return step.edit.path;
  if (!PATH_TOOLS.has(step.toolName)) return undefined;
  const value = step.title.slice(step.title.indexOf(" ") + 1).trim();
  return value.includes("/") || value.includes(".") ? value : undefined;
};

function StepTitle({ step }: { step: Step }) {
  const label = stepLabel(step);
  const path = stepPath(step);
  const at = path ? label.lastIndexOf(path) : -1;
  if (!path || at < 0) return <span className="step-title">{label}</span>;
  return (
    <button
      type="button"
      className="step-title step-file"
      title={`Open ${path}`}
    >
      {label.slice(0, at)}
      <FileMark path={path} />
      {label.slice(at)}
    </button>
  );
}

function EditStep({ step, edit }: { step: Step; edit: Edit }) {
  return (
    <details className="step-edit">
      <summary title={edit.path}>
        <PencilIcon />
        <span className="step-title">{stepLabel(step)}</span>
        <span className="step-diff">
          <b>+{edit.added}</b>
          <i>-{edit.removed}</i>
        </span>
        <CaretIcon />
      </summary>
      <button
        type="button"
        className="step-path"
        title="Open this file in Changes"
      >
        {edit.path}
      </button>
      <pre className="diff">
        {edit.hunks.map((line, index) => (
          <span
            key={index}
            className={
              line.kind === "+"
                ? "added"
                : line.kind === "-"
                  ? "removed"
                  : undefined
            }
          >
            <i>{line.line}</i>
            {line.kind}
            {line.text}
            {"\n"}
          </span>
        ))}
      </pre>
    </details>
  );
}

function StepRow({ step }: { step: Step }) {
  return (
    <li className={`step ${step.status}`}>
      {step.edit ? (
        <EditStep step={step} edit={step.edit} />
      ) : (
        <>
          <ToolMark name={step.toolName} />
          <StepTitle step={step} />
        </>
      )}
      {step.status === "cancelled" && (
        <span className="step-note">interrupted</span>
      )}
    </li>
  );
}

function EditCount({ steps }: { steps: Step[] }) {
  const added = steps.reduce(
    (total, step) => total + (step.edit?.added ?? 0),
    0,
  );
  const removed = steps.reduce(
    (total, step) => total + (step.edit?.removed ?? 0),
    0,
  );
  if (!added && !removed) return null;
  return (
    <span className="step-diff">
      <b>+{added}</b>
      <i>-{removed}</i>
    </span>
  );
}

/* STEPS_SHOWN is 0 in the app, so every step but the latest folds away. */
function Steps({ steps }: { steps: Step[] }) {
  if (!steps.length) return null;
  const latest = steps.at(-1)!;
  return (
    <details className="steps-more">
      <summary>
        <CaretIcon />
        <span key={latest.id} className={`steps-latest ${latest.status}`}>
          {stepLabel(latest)}
        </span>
        <EditCount steps={steps} />
        <span className="steps-count">{steps.length} more</span>
      </summary>
      <ol className="steps">
        {steps.map((step) => (
          <StepRow key={step.id} step={step} />
        ))}
      </ol>
    </details>
  );
}

function SubagentChips({ spawned }: { spawned: Agent[] }) {
  if (!spawned.length) return null;
  const live = spawned.filter((agent) => agent.status === "running");
  const done = spawned.filter((agent) => agent.status !== "running");
  const chip = (agent: Agent) => (
    <button
      type="button"
      key={agent.threadId}
      className="turn-agent"
      title={`${agent.title} — ${agent.activity}`}
    >
      <i
        className="subagent-square"
        data-status={agent.status === "running" ? "running" : "done"}
        style={{ background: agent.color }}
        aria-hidden="true"
      />
      <span>{agent.title}</span>
      <small>{agent.activity}</small>
    </button>
  );
  return (
    <div
      className="turn-agents"
      aria-label={`${spawned.length} ${plural(spawned.length, "subagent")}`}
    >
      {live.map(chip)}
      {!!done.length && (
        <details className="turn-agents-done">
          <summary>
            <CaretIcon />
            {done.length} finished
          </summary>
          <div className="turn-agents">{done.map(chip)}</div>
        </details>
      )}
    </div>
  );
}

function CopyTurn() {
  return (
    <button
      type="button"
      className="message-copy"
      aria-label="Copy message"
      title="Copy message"
    >
      <svg
        viewBox="0 0 16 16"
        width="11"
        height="11"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="5.5" y="5.5" width="8" height="8" />
        <path d="M10.5 3.5v-1h-8v8h1" />
      </svg>
    </button>
  );
}

function TurnView({ item, index }: { item: Turn; index: number }) {
  const rate =
    item.ms && item.outputTokens
      ? Math.round((item.outputTokens / item.ms) * 1000)
      : 0;
  return (
    <article className={`message ${item.role}`} data-turn={index}>
      {item.thinking && (
        <Thought
          text={item.thinking}
          ms={item.ms ?? 0}
          tokens={Math.round(item.thinking.length / CHARS_PER_TOKEN)}
        />
      )}
      {!!item.steps?.length && <Steps steps={item.steps} />}
      <div className="message-body">
        <p>{item.content}</p>
      </div>
      {!!item.agents?.length && <SubagentChips spawned={item.agents} />}
      <footer className="message-meta">
        <CopyTurn />
        {item.model && (
          <span className="message-model" title={`Answered by ${item.model}`}>
            <BrandIcon
              ns={item.model.split("/")[0]}
              className="message-model-mark"
            />
            <span>{item.model}</span>
          </span>
        )}
        <time>{item.time}</time>
        {rate > 0 && (
          <span
            className="generation-rate"
            title={`${item.outputTokens} output tokens in ${item.ms} ms`}
          >
            {rate.toLocaleString()} tok/s
          </span>
        )}
      </footer>
    </article>
  );
}

/** The streaming turn: blocks first, chips, and the thinking summary last. */
function Streaming({
  turn,
  ms,
  live,
}: {
  turn: Turn;
  ms: number;
  live?: string;
}) {
  return (
    <article className="message assistant streaming">
      {!!turn.steps?.length && <Steps steps={turn.steps} />}
      {turn.content && (
        <div className="message-body">
          <p>{turn.content}</p>
        </div>
      )}
      {!!turn.agents?.length && <SubagentChips spawned={turn.agents} />}
      <Thought
        text={turn.thinking ?? ""}
        ms={ms}
        tokens={Math.round((turn.thinking ?? "").length / CHARS_PER_TOKEN)}
        live={live}
      />
    </article>
  );
}

function TranscriptRail({ turns }: { turns: Turn[] }) {
  const [peek, setPeek] = useState<number>();
  const marks = turns.flatMap((item, index) =>
    item.role === "user" ? [{ item, index }] : [],
  );
  if (marks.length < 2) return null;
  return (
    <nav
      className="rail"
      aria-label="Jump to a message"
      style={
        {
          "--rail-gap": `${Math.max(2, Math.min(7, 360 / marks.length))}px`,
        } as CSSProperties
      }
      onMouseLeave={() => setPeek(undefined)}
    >
      {marks.map(({ item }, at) => (
        <button
          key={item.key}
          type="button"
          className="rail-mark"
          aria-label={`Jump to: ${item.content.slice(0, 80)}`}
          onMouseEnter={() => setPeek(at)}
          onFocus={() => setPeek(at)}
          onBlur={() => setPeek(undefined)}
        >
          {peek === at && (
            <span className="rail-peek" aria-hidden="true">
              <b>{item.content.split("\n")[0]}</b>
            </span>
          )}
        </button>
      ))}
    </nav>
  );
}

/* --- the task list: the composer bar and the inspector's graph ------------- */

const flatten = (
  tasks: Task[],
  depth = 0,
  parentId?: string,
): { task: Task; depth: number; parentId?: string }[] =>
  tasks.flatMap((task) => [
    { task, depth, parentId },
    ...flatten(task.subtasks, depth + 1, task.id),
  ]);

const visualState = (status: TaskStatus) =>
  status === "completed"
    ? "done"
    : status === "in_progress"
      ? "running"
      : status === "blocked"
        ? "failed"
        : "ready";
const planStatus = (status: TaskStatus): PlanStep["status"] =>
  status === "completed"
    ? "done"
    : status === "in_progress"
      ? "running"
      : status === "blocked"
        ? "failed"
        : "todo";

function TaskListBar({ list }: { list: { title: string; tasks: Task[] } }) {
  const [open, setOpen] = useState(false);
  if (!list.tasks.length) return null;
  const tasks = list.tasks;
  const done = tasks.filter((task) => task.status === "completed").length;
  const said = `${list.title} — ${done} of ${tasks.length} ${plural(tasks.length, "task")} done`;
  return (
    <div className="task-bar">
      <button
        type="button"
        className="task-bar-head"
        aria-expanded={open}
        title={said}
        aria-label={said}
        onClick={() => setOpen((was) => !was)}
      >
        <span className="task-bar-label">Tasks</span>
        <strong>{list.title}</strong>
        <em>
          {done}/{tasks.length}
        </em>
        <span className="task-bar-track">
          {tasks.map((task) => (
            <i
              key={task.id}
              data-status={visualState(task.status)}
              title={`${task.title} — ${task.status.replace("_", " ")}`}
            >
              {task.subtasks.length > 0 && (
                <span>
                  {task.subtasks.map((subtask) => (
                    <b
                      key={subtask.id}
                      data-status={visualState(subtask.status)}
                    />
                  ))}
                </span>
              )}
            </i>
          ))}
        </span>
        <CaretIcon />
      </button>
      {open && (
        <ol className="task-bar-list">
          {flatten(tasks).map(({ task, depth }) => (
            <li
              key={task.id}
              data-status={visualState(task.status)}
              style={{ marginLeft: `calc(${depth} * var(--s-4))` }}
            >
              <i aria-hidden="true" />
              <span>{task.title}</span>
              <em>{task.status.replace("_", " ")}</em>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function TaskListRail({
  list,
}: {
  list: { title: string; goal: string; tasks: Task[] };
}) {
  const [picked, setPicked] = useState("");
  const flat = useMemo(() => flatten(list.tasks), [list]);
  const { steps, shape } = useMemo(() => {
    const steps: PlanStep[] = flat.map(({ task, parentId }) => ({
      id: task.id,
      title: task.title,
      status: planStatus(task.status),
      needs: parentId ? [parentId] : [],
    }));
    const waves = planRows(steps);
    const { spots, height } = planLayout(waves, steps, PLAN_ROW);
    const statuses = new Map(flat.map(({ task }) => [task.id, task.status]));
    return {
      steps,
      shape: {
        waves,
        spots,
        height,
        row: PLAN_ROW,
        state: (step: PlanStep) =>
          visualState(statuses.get(step.id) ?? "pending"),
      },
    };
  }, [flat]);
  if (!list.tasks.length) {
    return (
      <section className="plan-widget task-list-widget">
        <span>Tasks</span>
        <p className="subagent-empty">
          Nothing tracked yet — Shinbo writes one per{" "}
          <code>task_list write</code>.
        </p>
      </section>
    );
  }
  const entry =
    flat.find(({ task }) => task.id === picked) ??
    [...flat].reverse().find(({ task }) => task.status === "in_progress") ??
    flat[0];
  const at = shape.spots.get(entry.task.id);
  const lit =
    at === undefined
      ? []
      : (shape.waves[at.wave] ?? []).map((id) => shape.spots.get(id)?.y ?? 0);
  const done = flat.filter(({ task }) => task.status === "completed").length;
  const states = (
    ["in_progress", "pending", "completed", "blocked"] as const
  ).filter((status) => flat.some(({ task }) => task.status === status));
  return (
    <section className="plan-widget task-list-widget">
      <span>
        <span className="context-title">
          Tasks · {done} of {flat.length} {plural(flat.length, "task")}
          <button
            type="button"
            className="context-expand"
            aria-haspopup="dialog"
            aria-label="Read the task list file"
            title="Read tasks.md"
          >
            <ExpandIcon />
          </button>
        </span>
      </span>
      <div className="plan-head">
        <strong title={list.goal}>{list.title}</strong>
        <em>
          {done}/{flat.length}
        </em>
      </div>
      <div className="plan-graph" style={{ height: shape.height }}>
        {lit.length > 0 && (
          <div
            className="plan-band"
            style={{
              top: Math.min(...lit) - PLAN_ROW / 2,
              height: Math.max(...lit) - Math.min(...lit) + PLAN_ROW,
            }}
          />
        )}
        <svg className="plan-edges" aria-hidden="true">
          {planEdges(steps).map(({ from, to }) => {
            const a = shape.spots.get(from);
            const b = shape.spots.get(to);
            if (!a || !b) return null;
            return (
              <line
                key={`${from}>${to}`}
                className={`${b.wave - a.wave > 1 ? "far" : ""} ${entry.task.id === from || entry.task.id === to ? "lit" : ""}`}
                x1={`${a.x}%`}
                y1={a.y}
                x2={`${b.x}%`}
                y2={b.y}
              />
            );
          })}
        </svg>
        {steps.map((step, index) => {
          const spot = shape.spots.get(step.id);
          if (!spot) return null;
          const task = flat.find(({ task }) => task.id === step.id)!.task;
          const said = `${task.title} — ${task.status.replace("_", " ")}`;
          return (
            <button
              key={step.id}
              type="button"
              className={`plan-node ${step.id === entry.task.id ? "active" : ""}`}
              data-status={shape.state(step)}
              style={{ left: `${spot.x}%`, top: spot.y }}
              aria-label={said}
              title={`${said} · ${task.subtasks.length} ${plural(task.subtasks.length, "subtask")}`}
              onClick={() => setPicked(step.id === picked ? "" : step.id)}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
      <div className="plan-key">
        {states.map((status) => (
          <span key={status} data-status={visualState(status)}>
            <i aria-hidden="true" />
            {status.replace("_", " ")}
          </span>
        ))}
      </div>
      <div className="plan-tasks">
        <p className="plan-step-title">
          <b>{flat.indexOf(entry) + 1}</b>
          <span>{entry.task.title}</span>
        </p>
        <p className="plan-result">
          {entry.task.status.replace("_", " ")}
          {entry.parentId ? ` · subtask of ${entry.parentId}` : " · top level"}
        </p>
        <ol className="plan-list">
          {entry.task.subtasks.map((subtask) => (
            <li
              key={subtask.id}
              className={subtask.status === "completed" ? "done" : ""}
            >
              <i aria-hidden="true">
                {subtask.status === "completed" ? "▣" : "▢"}
              </i>
              <span>{subtask.title}</span>
            </li>
          ))}
          {!entry.task.subtasks.length && (
            <li className="plan-none">
              No subtasks — this node is one action.
            </li>
          )}
        </ol>
      </div>
    </section>
  );
}

/* --- the inspector --------------------------------------------------------- */

function ContextStats({
  cells,
}: {
  cells: { id: string; value: string; label: string }[];
}) {
  const [curveOpen, setCurveOpen] = useState(false);
  const curve = [
    { context: 8192, rate: 104, turns: 3 },
    { context: 16_384, rate: 96, turns: 6 },
    { context: 32_768, rate: 81, turns: 4 },
    { context: 65_536, rate: 62, turns: 1 },
    { context: 131_072, rate: 0, turns: 0 },
  ];
  const peak = Math.max(...curve.map((point) => point.rate), 1);
  return (
    <section className="context-stats" data-orientation="horizontal">
      <div className="agent-metrics">
        {cells.map((cell) => (
          <span
            key={cell.id}
            className={cell.id === "rate" ? "metric-rate" : undefined}
          >
            <b>{cell.value}</b> {cell.label}
            {cell.id === "rate" && (
              <button
                type="button"
                className="rate-toggle"
                aria-expanded={curveOpen}
                aria-label="Tokens a second by context size"
                title="Tokens a second by context size"
                onClick={() => setCurveOpen((open) => !open)}
              >
                <CurveIcon />
              </button>
            )}
          </span>
        ))}
      </div>
      {curveOpen && (
        <div className="rate-curve">
          <ol>
            {curve.map((point) => (
              <li
                key={point.context}
                title={`${point.turns} ${plural(point.turns, "reply", "replies")} sent with ${charLabel(point.context)}–${charLabel(point.context * 2)} tokens of input`}
              >
                <span>{point.context / 1024}K</span>
                <i
                  data-empty={point.turns === 0 || undefined}
                  style={{ width: `${(point.rate / peak) * 100}%` }}
                />
                <b>{point.turns ? point.rate : "—"}</b>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}

const KIND_NAMES: Record<Row["kind"], string> = {
  messages: "Messages",
  system: "System prompt",
  tools: "System tools",
  mcp: "MCP tools",
  skills: "Skills",
  memory: "Memory files",
};
const LEGEND_COLLAPSED = 3;

function ContextLedger({ rows, capacity }: { rows: Row[]; capacity: number }) {
  const [showAll, setShowAll] = useState(false);
  const total = rows.reduce((sum, row) => sum + row.chars, 0);
  const whole = Math.max(capacity, total);
  const free = Math.max(0, capacity - total);
  const shown = showAll ? rows : rows.slice(0, LEGEND_COLLAPSED);
  return (
    <section className="context-usage" data-orientation="vertical">
      <span>
        <span className="context-title">
          Context window
          <button
            type="button"
            className="context-expand"
            aria-haspopup="dialog"
            aria-label="Expand the context ledger"
            title="Expand the context ledger"
          >
            <ExpandIcon />
          </button>
        </span>
        <b>
          {tokenLabel(total)} / {tokenLabel(capacity)}{" "}
          {plural(Math.round(total / CHARS_PER_TOKEN), "token")} (
          {shareLabel(total, whole)})
        </b>
      </span>
      <div className="context-grid" aria-hidden="true">
        {rows.map((row) => (
          <i
            key={row.label}
            data-kind={row.kind}
            style={{ flexGrow: row.chars }}
          />
        ))}
        {free > 0 && <i data-kind="free" style={{ flexGrow: free }} />}
      </div>
      <ul className="context-legend">
        {shown.map((row) => (
          <li
            key={row.label}
            data-kind={row.kind}
            title={`${KIND_NAMES[row.kind]} · ${row.label} · ${row.chars.toLocaleString()} chars · ${row.turns} ${plural(row.turns, "turn")}`}
          >
            <i />
            <span>{row.label}</span>
            <b>{tokenLabel(row.chars)}</b>
            <em>{shareLabel(row.chars, whole)}</em>
          </li>
        ))}
        {rows.length > LEGEND_COLLAPSED && (
          <li className="context-more">
            <button
              type="button"
              aria-expanded={showAll}
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Less" : `${rows.length - LEGEND_COLLAPSED} more`}
            </button>
          </li>
        )}
        {showAll && (
          <li
            data-kind="free"
            title={`${free.toLocaleString()} of ${capacity.toLocaleString()} characters left before this model's window is full`}
          >
            <i />
            <span>Free space</span>
            <b>{tokenLabel(free)}</b>
            <em>{shareLabel(free, whole)}</em>
          </li>
        )}
      </ul>
    </section>
  );
}

const LABEL_AFTER = 78;
const LABEL_BEFORE = 12;
const OVERALL = "overall";

function Timeline({
  turns,
  carriedTokens,
  now,
}: {
  turns: { key: string; label: string; spans: TraceSpan[]; live: boolean }[];
  carriedTokens: number;
  now: number;
}) {
  const [collapsed, setCollapsed] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const [selected, setSelected] = useState<string>();
  const [axis, setAxis] = useState<"time" | "context">("time");

  const spans = useMemo(() => {
    const out: TraceSpan[] = [];
    let cursor = 0;
    turns.forEach((turn, index) => {
      if (!turn.spans.length) return;
      const close = (span: TraceSpan) =>
        span.endedAt ?? (turn.live ? now : span.startedAt);
      const from = Math.min(...turn.spans.map((span) => span.startedAt));
      const to = Math.max(...turn.spans.map(close));
      const shift = cursor - from;
      for (const span of turn.spans) {
        out.push({
          ...span,
          id: `${turn.key}/${span.id}`,
          parentId: span.parentId ? `${turn.key}/${span.parentId}` : OVERALL,
          name: span.parentId ? span.name : `Turn ${index + 1} · ${turn.label}`,
          startedAt: span.startedAt + shift,
          endedAt: close(span) + shift,
        });
      }
      cursor = to + shift;
    });
    const grew = out.reduce((sum, span) => sum + (span.tokens ?? 0), 0);
    const running = turns.some((turn) => turn.live);
    out.unshift({
      id: OVERALL,
      name: "Overall",
      kind: "agent",
      startedAt: 0,
      endedAt: cursor,
      status: running ? "running" : "ok",
      tokens: Math.max(0, carriedTokens - grew),
    });
    return out;
  }, [turns, now, carriedTokens]);

  const measured = useMemo(
    () => (axis === "context" ? tokenAxis(spans) : spans),
    [axis, spans],
  );
  const format = axis === "context" ? barLabel : formatDuration;
  const rows = useMemo(() => {
    const laid = layoutSpans(measured, now, collapsed);
    if (!laid.length) return laid;
    const groups: (typeof laid)[] = [];
    for (const row of laid.slice(1)) {
      if (row.depth === 1) groups.push([row]);
      else groups[groups.length - 1]?.push(row);
    }
    return [laid[0], ...groups.reverse().flat()];
  }, [measured, now, collapsed]);
  if (spans.length < 2) return null;
  const open = turns.some((turn) => turn.live);
  const toggle = (id: string) =>
    setCollapsed((current) => {
      const next = new Set(current);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  return (
    <section className="trace" aria-label="Agent timeline">
      <span>
        <span className="trace-title">
          Timeline
          <span
            className="trace-axes"
            role="group"
            aria-label="What the bars measure"
          >
            <button
              type="button"
              aria-pressed={axis === "time"}
              title="Bars are how long each span took"
              onClick={() => setAxis("time")}
            >
              Time
            </button>
            <button
              type="button"
              aria-pressed={axis === "context"}
              title="Bars are what each span added to the context window"
              onClick={() => setAxis("context")}
            >
              Context
            </button>
          </span>
          <button
            type="button"
            className="trace-expand"
            aria-haspopup="dialog"
            aria-label="Expand the timeline"
            title="Expand the timeline"
          >
            <ExpandIcon />
          </button>
        </span>
        <b>
          {format(rows[0].durationMs)}
          {open ? " · running" : ""}
        </b>
      </span>
      <div className="trace-scroll">
        <ol className="trace-rows">
          {rows.map(({ span, depth, offset, width, durationMs, children }) => {
            const id = span.id;
            const shut = collapsed.has(id);
            const end = offset + width;
            const label =
              end <= LABEL_AFTER
                ? { className: "trace-bar-label", style: { left: `${end}%` } }
                : offset >= LABEL_BEFORE
                  ? {
                      className: "trace-bar-label trace-bar-label-before",
                      style: { right: `${100 - offset}%` },
                    }
                  : {
                      className: "trace-bar-label trace-bar-label-in",
                      style: { left: `${offset}%` },
                    };
            return (
              <li
                key={id}
                className="trace-row"
                data-kind={
                  span.kind === "agent"
                    ? "agent"
                    : span.kind === "model"
                      ? "model"
                      : "tool"
                }
                data-status={span.status}
              >
                <div
                  className="trace-head"
                  style={{ paddingLeft: `calc(${depth} * var(--s-3))` }}
                >
                  {children > 0 ? (
                    <button
                      type="button"
                      className="trace-caret"
                      aria-expanded={!shut}
                      aria-label={`${shut ? "Expand" : "Collapse"} ${span.name}`}
                      onClick={() => toggle(id)}
                    >
                      {shut ? "▸" : "▾"}
                    </button>
                  ) : (
                    <i className="trace-caret" aria-hidden="true" />
                  )}
                  {children > 0 && (
                    <i className="trace-kids" aria-hidden="true">
                      {children}
                    </i>
                  )}
                  {span.kind !== "agent" && span.kind !== "model" && (
                    <ToolIcon />
                  )}
                  <button
                    type="button"
                    className="trace-name"
                    aria-pressed={selected === id}
                    title={`${span.name} — ${span.kind} · ${format(durationMs)}`}
                    onClick={() =>
                      setSelected(selected === id ? undefined : id)
                    }
                  >
                    {span.name}
                  </button>
                  <b>{format(durationMs)}</b>
                </div>
                <span className="trace-op" aria-hidden="true">
                  {span.kind}
                </span>
                <div className="trace-track" aria-hidden="true">
                  <i style={{ left: `${offset}%`, width: `${width}%` }} />
                  <b {...label}>{format(durationMs)}</b>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* No plan file in this thread, so the plan widget shows the app's empty state. */
function PlanRail() {
  return (
    <section className="plan-widget">
      <span>Plan</span>
      <p className="subagent-empty">
        Nothing planned yet — Shinbo writes one per <code>plan write</code>.
      </p>
    </section>
  );
}

const railColumns = (count: number) =>
  ({ "--cols": Math.max(1, Math.ceil(Math.sqrt(count))) }) as CSSProperties;

function SubagentRail({ agents }: { agents: Agent[] }) {
  const live = agents.filter((agent) => agent.status === "running");
  const done = agents.filter((agent) => agent.status !== "running");
  const branch = (agent: Agent) => (
    <li key={agent.threadId}>
      <button
        type="button"
        className="subagent"
        title={`${agent.title} — ${agent.activity} · ${agent.model}`}
      >
        <i
          className="subagent-square"
          style={{ background: agent.color }}
          data-status={agent.status}
          aria-hidden="true"
        />
        <span>{agent.title}</span>
        <BrandIcon ns={agent.model.split("/")[0]} className="subagent-model" />
      </button>
    </li>
  );
  return (
    <section className="subagents" data-orientation="vertical">
      <span>Subagents{live.length ? ` · ${live.length} working` : ""}</span>
      {!!live.length && (
        <ul className="subagent-list" style={railColumns(live.length)}>
          {live.map(branch)}
        </ul>
      )}
      {!live.length && !done.length && (
        <p className="subagent-empty">
          Nothing delegated yet — a subagent gets a row here the moment it
          starts.
        </p>
      )}
      {!!done.length && (
        <details className="subagent-done">
          <summary>
            <CaretIcon />
            {done.length} finished
          </summary>
          <ul className="subagent-list">{done.map(branch)}</ul>
        </details>
      )}
    </section>
  );
}

function SubthreadRail({
  threads,
}: {
  threads: { id: string; label: string; since: string }[];
}) {
  return (
    <section className="subthreads" data-orientation="vertical">
      <span>
        Sub threads{threads.length ? ` · 0 of ${threads.length} working` : ""}
      </span>
      <ul className="subthread-list">
        {threads.map((thread) => (
          <li key={thread.id}>
            <button
              type="button"
              className="subthread"
              title={`${thread.label} — idle · last moved ${thread.since} ago`}
            >
              <i
                className="subthread-branch"
                data-status="idle"
                aria-hidden="true"
              >
                ↳
              </i>
              <span>{thread.label}</span>
              <em>{thread.since}</em>
            </button>
          </li>
        ))}
        {!threads.length && (
          <li>
            <p className="subagent-empty">No sub threads yet.</p>
          </li>
        )}
      </ul>
    </section>
  );
}

/* --- the window ------------------------------------------------------------ */

const nap = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));
const WINDOW = { width: 1040, height: 660 };
let seq = 1;

export default function ShinboWindow() {
  const [turns, setTurns] = useState<Turn[]>(SEED);
  const [live, setLive] = useState<{
    turn: Turn;
    startedAt: number;
    activity: string;
  } | null>(null);
  const [rows, setRows] = useState<Row[]>(BASE_ROWS);
  const [traces, setTraces] = useState<
    { key: string; label: string; spans: TraceSpan[]; live: boolean }[]
  >([{ key: "seed", label: "16:31", spans: SEED_SPANS, live: false }]);
  const [spans, setSpans] = useState<TraceSpan[]>([]);
  const [list, setList] = useState<{
    title: string;
    goal: string;
    tasks: Task[];
  }>({ title: "", goal: "", tasks: [] });
  const [agents, setAgents] = useState<Agent[]>([]);
  const [calls, setCalls] = useState(2);
  const [now, setNow] = useState(() => Date.now());
  const [message, setMessage] = useState("");
  const [queued, setQueued] = useState<string[]>([]);
  const [model, setModel] = useState(MODELS[2]);
  const [thinking, setThinking] = useState<string>("medium");
  const [mode, setMode] = useState<string>("acceptEdits");
  const [menu, setMenu] = useState<"none" | "model" | "mode">("none");
  const [query, setQuery] = useState("");
  const [freeOnly, setFreeOnly] = useState(true);
  const [maker, setMaker] = useState("");
  const [review, setReview] = useState(false);
  const [zoom, setZoom] = useState(0.4);
  const [visible, setVisible] = useState(true);
  const script = useRef(0);
  const alive = useRef(true);
  /* React double-invokes state updaters in development, so no updater below is
     allowed to do anything but return the next state: the running turn and the
     queue are mirrored here and read from these instead. */
  const held = useRef<Turn | null>(null);
  const pending = useRef<string[]>([]);
  const transcript = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const sending = live !== null;

  /* Drawn at the app's real pixel sizes and zoomed into whatever the hero
     column gives it, so this is the app seen small, not a small drawing. */
  useEffect(() => {
    const node = frame.current;
    if (!node) return;
    const fit = () => setZoom(Math.min(1, node.clientWidth / WINDOW.width));
    fit();
    const watch = new ResizeObserver(fit);
    watch.observe(node);
    /* Offscreen the window costs nothing: no clock, no new runs. */
    const seen = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    seen.observe(node);
    return () => {
      watch.disconnect();
      seen.disconnect();
    };
  }, []);

  /* StrictMode mounts twice in dev, so the flag has to be re-armed on mount —
     the cleanup of the first pass would otherwise leave the run engine dead. */
  useEffect(() => {
    alive.current = true;
    return () => void (alive.current = false);
  }, []);
  useEffect(() => {
    if (!sending || !visible) return;
    const timer = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(timer);
  }, [sending, visible]);
  useEffect(() => {
    const node = transcript.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [turns, live]);

  const capacity = model.context * CHARS_PER_TOKEN;
  const total = rows.reduce((sum, row) => sum + row.chars, 0);
  const grow = (kind: Row["kind"], chars: number) =>
    setRows((all) =>
      all.map((row) =>
        row.kind === kind
          ? {
              ...row,
              chars: row.chars + chars,
              turns: row.turns + (kind === "messages" ? 1 : 0),
            }
          : row,
      ),
    );

  const stop = () => {
    alive.current = false;
    const turn = held.current;
    const startedAt = live?.startedAt ?? Date.now();
    if (turn) {
      setTurns((all) =>
        [
          ...all,
          {
            ...turn,
            steps: turn.steps?.map((step) =>
              step.status === "in_progress"
                ? { ...step, status: "cancelled" as const }
                : step,
            ),
            agents: turn.agents?.map((agent) => ({
              ...agent,
              status: "done" as const,
            })),
            model: model.key,
            time: "now",
            ms: Date.now() - startedAt,
            outputTokens: Math.round(turn.content.length / CHARS_PER_TOKEN),
          },
        ].slice(-8),
      );
    }
    held.current = null;
    setLive(null);
    setAgents((all) =>
      all.map((agent) => ({ ...agent, status: "done" as const })),
    );
    setSpans((all) =>
      all.map((span) =>
        span.endedAt === undefined
          ? { ...span, endedAt: Date.now(), status: "cancelled" as const }
          : span,
      ),
    );
    setTimeout(() => void (alive.current = true), 0);
  };

  /* The fake model. One script per exchange: it thinks, calls tools, edits
     files, delegates, walks its task list, and every beat lands in the ledger
     and in the trace the way a real turn's telemetry would. */
  const run = (entry: Script, startedAt: number) => {
    let stepId = 0;
    let spanId = 0;
    const span = (
      name: string,
      kind: string,
      ms: number,
      tokens: number,
      status: TraceSpan["status"] = "ok",
    ) => {
      const at = Date.now();
      setSpans((all) => [
        ...all,
        {
          id: `s${spanId++}`,
          parentId: "root",
          name,
          kind,
          startedAt: at - ms,
          endedAt: at,
          status,
          tokens,
        },
      ]);
    };
    setList({
      title: entry.list.title,
      goal: entry.list.goal,
      tasks: entry.list.tasks.map(([title, subtasks], index) => ({
        id: `t${index + 1}`,
        title,
        status: index === 0 ? "in_progress" : "pending",
        subtasks: subtasks.map((sub, at) => ({
          id: `t${index + 1}.${at + 1}`,
          title: sub,
          status: "pending" as TaskStatus,
          subtasks: [],
        })),
      })),
    });
    setSpans([
      {
        id: "root",
        name: entry.list.title.toLowerCase(),
        kind: "agent",
        startedAt,
        status: "running",
        tokens: 600,
      },
    ]);
    let current: Turn = { key: seq++, role: "assistant", content: "" };
    held.current = current;
    setLive({ turn: current, startedAt, activity: "thinking" });
    setAgents([]);
    grow("messages", entry.ask.length);

    const edit = (change: (turn: Turn) => Turn) => {
      current = change(current);
      held.current = current;
      setLive((running) => (running ? { ...running, turn: current } : running));
    };
    const doing = (text: string) =>
      setLive((running) =>
        running ? { ...running, activity: text } : running,
      );

    void (async () => {
      for (const beat of entry.beats) {
        if (!alive.current) return;
        if (beat.t === "think") {
          for (const [ms, said] of [
            [900, "thinking"],
            [900, "planning the turn"],
            [700, "thinking"],
          ] as [number, string][]) {
            if (!alive.current) return;
            edit((turn) => ({ ...turn, thinking: beat.text }));
            doing(said);
            await nap(ms);
          }
          span(
            model.key,
            "model",
            2500,
            Math.round(beat.text.length / CHARS_PER_TOKEN),
          );
          grow("messages", beat.text.length);
        } else if (beat.t === "tool" || beat.t === "edit") {
          const id = stepId++;
          const step: Step =
            beat.t === "edit"
              ? {
                  id,
                  toolName: "edit_file",
                  title: `Edited ${beat.path}`,
                  status: "in_progress",
                  edit: {
                    path: beat.path,
                    added: beat.added,
                    removed: beat.removed,
                    hunks: beat.hunks,
                  },
                }
              : {
                  id,
                  toolName: beat.tool,
                  title: beat.title,
                  status: "in_progress",
                };
          edit((turn) => ({ ...turn, steps: [...(turn.steps ?? []), step] }));
          doing(
            beat.t === "edit"
              ? `editing ${beat.path.split("/").pop()}`
              : beat.title.toLowerCase(),
          );
          await nap(Math.min(1600, beat.ms));
          if (!alive.current) return;
          const landed: StepStatus =
            beat.t === "tool" && beat.fails ? "failed" : "completed";
          edit((turn) => ({
            ...turn,
            steps: (turn.steps ?? []).map((was) =>
              was.id === id ? { ...step, status: landed } : was,
            ),
          }));
          setCalls((count) => count + 1);
          span(
            beat.t === "edit" ? "edit_file" : beat.tool,
            beat.t === "edit" ? "edit" : "tool",
            beat.ms,
            beat.t === "edit" ? 340 : 210,
            landed === "failed" ? "failed" : "ok",
          );
          grow(
            beat.t === "edit" ? "messages" : "tools",
            beat.t === "edit" ? 1400 : 620,
          );
          await nap(300);
        } else if (beat.t === "agents") {
          const started: Agent[] = beat.agents.map((agent, index) => ({
            ...agent,
            threadId: `a${seq}${index}`,
            status: "running",
            model: MODELS[(index + 5) % MODELS.length].key,
          }));
          setAgents((all) => [...all, ...started]);
          edit((turn) => ({
            ...turn,
            agents: [...(turn.agents ?? []), ...started],
          }));
          for (const agent of started) {
            setSpans((all) => [
              ...all,
              {
                id: agent.threadId,
                parentId: "root",
                name: `subagent · ${agent.title}`,
                kind: "agent",
                startedAt: Date.now(),
                status: "running",
                tokens: 900,
              },
            ]);
          }
          await nap(520);
        } else if (beat.t === "settle") {
          setAgents((all) => {
            const index = all.findIndex((agent) => agent.status === "running");
            return index < 0
              ? all
              : all.map((agent, at) =>
                  at === index
                    ? {
                        ...agent,
                        status: "done" as const,
                        activity: agent.activity.replace(/^(\w+)ing/, "$1ed"),
                      }
                    : agent,
                );
          });
          edit((turn) => ({
            ...turn,
            agents: (turn.agents ?? []).map((agent, index, list) =>
              index === list.findIndex((item) => item.status === "running")
                ? { ...agent, status: "done" as const }
                : agent,
            ),
          }));
          setSpans((all) => {
            const at = all.findIndex(
              (span) =>
                span.kind === "agent" &&
                span.endedAt === undefined &&
                span.id !== "root",
            );
            return at < 0
              ? all
              : all.map((span, index) =>
                  index === at
                    ? {
                        ...span,
                        endedAt: Date.now(),
                        status: "ok" as const,
                        tokens: 2400,
                      }
                    : span,
                );
          });
          grow("messages", 2600);
          await nap(420);
        } else if (beat.t === "task") {
          setList((current) => {
            const index = current.tasks.findIndex(
              (task) => task.status === "in_progress",
            );
            if (index < 0) return current;
            return {
              ...current,
              tasks: current.tasks.map((task, at) =>
                at === index
                  ? {
                      ...task,
                      status: "completed" as TaskStatus,
                      subtasks: task.subtasks.map((sub) => ({
                        ...sub,
                        status: "completed" as TaskStatus,
                      })),
                    }
                  : at === index + 1
                    ? {
                        ...task,
                        status: "in_progress" as TaskStatus,
                        subtasks: task.subtasks.map((sub, order) => ({
                          ...sub,
                          status:
                            order === 0
                              ? ("completed" as TaskStatus)
                              : sub.status,
                        })),
                      }
                    : task,
              ),
            };
          });
          await nap(260);
        } else {
          doing("writing the answer");
          const words = beat.text.split(" ");
          for (let index = 1; index <= words.length; index += 2) {
            if (!alive.current) return;
            edit((turn) => ({
              ...turn,
              content: words
                .slice(0, Math.min(index + 1, words.length))
                .join(" "),
            }));
            await nap(60);
          }
          span(
            model.key,
            "model",
            1800,
            Math.round(beat.text.length / CHARS_PER_TOKEN),
          );
          grow("messages", beat.text.length);
        }
      }
      if (!alive.current) return;
      const ms = Date.now() - startedAt;
      setSpans((all) =>
        all.map((span) =>
          span.id === "root"
            ? { ...span, endedAt: startedAt + ms, status: "ok" as const }
            : span,
        ),
      );
      const done = current;
      setTurns((all) =>
        [
          ...all,
          {
            ...done,
            model: model.key,
            time: "now",
            ms,
            outputTokens: Math.round(done.content.length / CHARS_PER_TOKEN),
          },
        ].slice(-8),
      );
      held.current = null;
      setLive(null);
      const [next, ...rest] = pending.current;
      if (next !== undefined) {
        pending.current = rest;
        setQueued(rest);
        setTurns((all) =>
          [...all, { key: seq++, role: "user" as const, content: next }].slice(
            -8,
          ),
        );
        setTimeout(
          () => run(SCRIPTS[script.current++ % SCRIPTS.length], Date.now()),
          500,
        );
      }
    })();
  };

  /* A finished turn's spans move onto the thread, which is where the timeline
     reads them from — the same handoff the app makes when a run ends. */
  useEffect(() => {
    if (sending || !spans.length) return;
    const timer = setTimeout(() => {
      setTraces((all) =>
        [...all, { key: `t${all.length}`, label: "now", spans }]
          .map((turn) => ({ ...turn, live: false }))
          .slice(-4),
      );
      setSpans([]);
    }, 0);
    return () => clearTimeout(timer);
  }, [sending, spans]);

  /* Left alone, the window keeps working. Reduced motion leaves it at rest. */
  useEffect(() => {
    if (
      typeof matchMedia === "function" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    if (sending || queued.length || !visible) return;
    const timer = setTimeout(
      () => {
        const entry = SCRIPTS[script.current++ % SCRIPTS.length];
        setTurns((all) =>
          [
            ...all,
            { key: seq++, role: "user" as const, content: entry.ask },
          ].slice(-8),
        );
        run(entry, Date.now());
      },
      turns.length > SEED.length ? 6500 : 2400,
    );
    return () => clearTimeout(timer);
  }, [sending, queued.length, turns.length, visible]);

  const send = () => {
    const text = message.trim();
    if (!text) return;
    setMessage("");
    if (sending) {
      pending.current = [...pending.current, text];
      setQueued(pending.current);
      return;
    }
    setTurns((all) =>
      [...all, { key: seq++, role: "user" as const, content: text }].slice(-8),
    );
    run(SCRIPTS[script.current++ % SCRIPTS.length], Date.now());
  };

  const composerKeys = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      if (menu !== "none") setMenu("none");
      else if (sending) stop();
      return;
    }
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      send();
    }
  };

  const needle = query.trim().toLowerCase();
  const listed = freeOnly ? MODELS : MODELS;
  const searched = listed.filter(
    (entry) =>
      !needle || `${entry.name} ${entry.key}`.toLowerCase().includes(needle),
  );
  const makers = [...new Set(MODELS.map((entry) => entry.maker))];
  const shown = maker
    ? searched.filter((entry) => entry.maker === maker)
    : searched;
  const replies = turns.filter((turn) => turn.role === "assistant").length;
  const output = turns.reduce((sum, turn) => sum + (turn.outputTokens ?? 0), 0);
  const elapsed = turns.reduce((sum, turn) => sum + (turn.ms ?? 0), 0);
  const stats = [
    {
      id: "messages",
      value: `${turns.length}`,
      label: plural(turns.length, "message"),
    },
    {
      id: "replies",
      value: `${replies}`,
      label: `Shinbo ${plural(replies, "reply", "replies")}`,
    },
    { id: "attachments", value: "1", label: "attachment" },
    { id: "calls", value: `${calls}`, label: `tool ${plural(calls, "call")}` },
    {
      id: "rate",
      value: elapsed ? `${Math.round((output / elapsed) * 1000)}` : "—",
      label: "avg tok/s",
    },
    {
      id: "output",
      value: output ? charLabel(output) : "—",
      label: `output ${plural(output, "token")}`,
    },
  ];
  const timelineTurns =
    sending && spans.length
      ? [...traces, { key: "live", label: "Running", spans, live: true }]
      : traces;

  return (
    <div
      className="ew-frame"
      ref={frame}
      aria-label="A working miniature of the Shinbo app"
    >
      <div
        className="ew"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "0 0",
          width: WINDOW.width,
          height: WINDOW.height,
        }}
      >
        <div className="app-shell">
          <div className="drag-region" />
          <span className="ew-lights" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <main id="content" className="content">
            <div className="thread-layout">
              <div className="thread-column">
                <div className="thread-stage">
                  <div className="chat-pane">
                    <section
                      className="conversation"
                      aria-label="Thread: hero window"
                    >
                      <header className="thread-bar">
                        <input
                          className="thread-name"
                          defaultValue="hero window"
                          aria-label="Thread name"
                        />
                        <button
                          type="button"
                          className="page-info-button"
                          aria-label="Show thread details"
                        >
                          i
                        </button>
                        <span className="tag-picker">
                          <button
                            type="button"
                            className="tag-trigger"
                            data-state="auto"
                          >
                            site
                          </button>
                        </span>
                        <div className="thread-actions">
                          <button
                            type="button"
                            className="pane-toggle"
                            aria-label="Open the Git page"
                            title="Git · main"
                          >
                            <BranchIcon />
                          </button>
                          <button
                            type="button"
                            className="pane-toggle"
                            aria-label="Open the terminal"
                          >
                            <TerminalIcon />
                          </button>
                          <button
                            type="button"
                            className="pane-toggle"
                            aria-label="Open the browser pane"
                          >
                            <GlobeIcon />
                          </button>
                          <button
                            type="button"
                            className="pane-toggle"
                            aria-pressed="true"
                            aria-label="Collapse thread inspector"
                          >
                            <InspectorIcon />
                          </button>
                        </div>
                      </header>
                      <div className="transcript-wrap">
                        <TranscriptRail turns={turns} />
                        <div className="transcript" ref={transcript}>
                          <p className="project-rules">
                            <TextIcon />
                            <button type="button">AGENTS.md</button>
                            <span>84 lines read into context</span>
                          </p>
                          {turns.map((item, index) => (
                            <TurnView
                              key={item.key}
                              item={item}
                              index={index}
                            />
                          ))}
                          {live && (
                            <Streaming
                              turn={live.turn}
                              ms={now - live.startedAt}
                              live={live.activity}
                            />
                          )}
                          {sending &&
                            !live?.turn.steps?.length &&
                            !live?.turn.content &&
                            !live?.turn.thinking && (
                              <p className="waiting" role="status">
                                <Mark /> {live?.activity}…
                              </p>
                            )}
                        </div>
                      </div>
                      <div className="composer-project">
                        <span className="project-chip">
                          <button
                            type="button"
                            className="project-button"
                            aria-haspopup="listbox"
                            aria-label="Project folder, currently shinbo-website"
                            title="~/Documents/shinbo-website"
                          >
                            <span className="project-name">
                              /shinbo-website
                            </span>
                            <span aria-hidden="true">▾</span>
                          </button>
                        </span>
                        <span className="project-chip">
                          <button
                            type="button"
                            className="project-branch"
                            aria-haspopup="listbox"
                            aria-label="Branch, currently main"
                            title="Check out another branch, or start one here"
                          >
                            ⑂ main
                          </button>
                        </span>
                        <label title="Work on a checkout of this repo beside the folder itself">
                          <input type="checkbox" readOnly checked={false} />
                          worktree
                        </label>
                      </div>
                      {queued.length > 0 && (
                        <div
                          className="queued-stack"
                          aria-label="Queued messages"
                        >
                          {queued.map((text, index) => (
                            <div
                              className="queued-row"
                              key={`${index}-${text}`}
                            >
                              <span>Queued · {text}</span>
                              <button
                                type="button"
                                className="steering"
                                title="Steer — cut into what Shinbo is doing now and hand it this message"
                              >
                                steer
                              </button>
                              <button
                                type="button"
                                aria-label="Drop this queued message"
                                onClick={() => {
                                  pending.current = pending.current.filter(
                                    (_, at) => at !== index,
                                  );
                                  setQueued(pending.current);
                                }}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <TaskListBar list={list} />
                      <form
                        className="composer"
                        onSubmit={(event) => event.preventDefault()}
                      >
                        <div className="composer-input">
                          <div
                            className="composer-highlight"
                            aria-hidden="true"
                          >
                            {message}
                            {"\n"}
                          </div>
                          <textarea
                            rows={2}
                            value={message}
                            aria-label="Message Shinbo"
                            placeholder={
                              sending
                                ? "Shinbo is working — Enter queues, ⌘Enter steers (empty: oldest queued first), Esc Esc stops…"
                                : "Ask Shinbo to continue…"
                            }
                            onChange={(event) => setMessage(event.target.value)}
                            onKeyDown={composerKeys}
                          />
                        </div>
                        <div className="composer-row">
                          <div className="composer-tools">
                            <button
                              type="button"
                              className="source-trigger"
                              aria-label="Add context or plugin"
                            >
                              ＋
                            </button>
                            <div className="mode-picker" data-mode={mode}>
                              <button
                                type="button"
                                className="mode-trigger"
                                aria-haspopup="listbox"
                                aria-expanded={menu === "mode"}
                                onClick={() =>
                                  setMenu(menu === "mode" ? "none" : "mode")
                                }
                              >
                                <b aria-hidden="true">{MODE_GLYPHS[mode]}</b>
                                <span className="mode-label">
                                  {MODE_NAMES[mode]}
                                </span>
                                <span aria-hidden="true">▾</span>
                              </button>
                              {menu === "mode" && (
                                <div
                                  className="source-popover mode-menu"
                                  role="listbox"
                                  aria-label="Permission mode"
                                >
                                  {MODES.map((value) => (
                                    <button
                                      key={value}
                                      type="button"
                                      role="option"
                                      aria-selected={value === mode}
                                      className="add-row mode-row"
                                      data-mode={value}
                                      onClick={() => {
                                        setMode(value);
                                        setMenu("none");
                                      }}
                                    >
                                      <b aria-hidden="true">
                                        {MODE_GLYPHS[value]}
                                      </b>
                                      <div>
                                        <strong>{MODE_NAMES[value]}</strong>
                                        <small>{MODE_MEANINGS[value]}</small>
                                      </div>
                                      {value === mode && <em>Active</em>}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                            <button
                              type="button"
                              className="review-toggle"
                              aria-pressed={review}
                              aria-label={
                                review
                                  ? "Second-model review is on for this thread"
                                  : "Second-model review is off for this thread"
                              }
                              onClick={() => setReview(!review)}
                            >
                              <ReviewIcon />
                            </button>
                          </div>
                          <button
                            type="button"
                            className="model-button"
                            aria-haspopup="dialog"
                            aria-expanded={menu === "model"}
                            aria-label={`Select model, currently ${model.key}`}
                            onClick={() =>
                              setMenu(menu === "model" ? "none" : "model")
                            }
                          >
                            <BrandIcon
                              ns={model.maker}
                              className="model-brand"
                            />
                            <span className="model-label">{model.name}</span>
                            <em className="model-route remote">Free</em>
                            <em className="model-effort" data-level={thinking}>
                              {THINKING_LABELS[thinking]}
                            </em>
                            <span aria-hidden="true">▾</span>
                          </button>
                          {sending ? (
                            message.trim() ? (
                              <button
                                className="composer-send"
                                aria-label="Queue message"
                                title="Queue — sent when this turn ends"
                                onClick={(event) => {
                                  event.preventDefault();
                                  send();
                                }}
                              >
                                ↑
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="composer-send stopping"
                                onClick={stop}
                                aria-label="Stop this turn"
                                title="Stop this turn — Esc Esc"
                              >
                                ■
                              </button>
                            )
                          ) : (
                            <button
                              className="composer-send"
                              disabled={!message.trim()}
                              aria-label="Send message"
                              onClick={(event) => {
                                event.preventDefault();
                                send();
                              }}
                            >
                              ↑
                            </button>
                          )}
                        </div>
                        {menu === "model" && (
                          <section
                            className="source-popover model-menu"
                            role="dialog"
                            aria-label="Model"
                          >
                            <nav
                              className="model-rail"
                              aria-label="Filter models by maker"
                            >
                              <button
                                type="button"
                                className="model-mark model-star"
                                aria-pressed={false}
                                title="Starred"
                                aria-label="Starred models"
                              >
                                ★
                              </button>
                              <hr />
                              {makers.map((id) => (
                                <div className="model-mark-sort" key={id}>
                                  <button
                                    type="button"
                                    className="model-mark"
                                    aria-pressed={maker === id}
                                    title={id}
                                    aria-label={id}
                                    onClick={() =>
                                      setMaker(maker === id ? "" : id)
                                    }
                                  >
                                    <BrandIcon
                                      ns={id}
                                      className="model-brand"
                                    />
                                  </button>
                                </div>
                              ))}
                            </nav>
                            <div className="model-body">
                              <div
                                className="role-strip"
                                role="tablist"
                                aria-label="What this model is for"
                              >
                                {[
                                  ["Agent", model.name],
                                  ["Verifier", "Off"],
                                  ["Advisor", "north-mini-code"],
                                  ["Vision", "Off"],
                                ].map(([role, value]) => (
                                  <button
                                    key={role}
                                    type="button"
                                    role="tab"
                                    className="role-tab"
                                    aria-selected={role === "Agent"}
                                  >
                                    <strong>{role}</strong>
                                    <small>{value}</small>
                                  </button>
                                ))}
                              </div>
                              <div className="model-find">
                                <input
                                  className="model-search"
                                  value={query}
                                  aria-label="Search models"
                                  placeholder="Search models…"
                                  onChange={(event) =>
                                    setQuery(event.target.value)
                                  }
                                />
                                <button
                                  type="button"
                                  className="model-free-only"
                                  aria-pressed={freeOnly}
                                  title="Only the models the catalog lists as free"
                                  onClick={() => setFreeOnly(!freeOnly)}
                                >
                                  Free only
                                </button>
                              </div>
                              <div className="model-rows">
                                {shown.map((entry) => (
                                  <div
                                    className={`model-row ${entry.key === model.key ? "current" : ""}`}
                                    key={entry.key}
                                  >
                                    <button
                                      type="button"
                                      className="model-row-pick"
                                      aria-current={entry.key === model.key}
                                      title={entry.key}
                                      onClick={() => {
                                        setModel(entry);
                                        setMenu("none");
                                        setQuery("");
                                      }}
                                    >
                                      <strong>
                                        <span>{entry.name}</span>
                                        <span className="model-free">Free</span>
                                      </strong>
                                      <small>
                                        <BrandIcon
                                          ns={entry.maker}
                                          className="model-brand"
                                        />
                                        <span>{entry.maker}</span>
                                      </small>
                                    </button>
                                    <span
                                      className="model-context"
                                      title={`${entry.context.toLocaleString()}-token context window`}
                                    >
                                      {contextMark.format(entry.context)}
                                    </span>
                                    <button
                                      type="button"
                                      className="model-star"
                                      aria-pressed={entry.key === model.key}
                                      aria-label={`Star ${entry.name}`}
                                    >
                                      {entry.key === model.key ? "★" : "☆"}
                                    </button>
                                  </div>
                                ))}
                                {!shown.length && (
                                  <p className="model-menu-note">
                                    Nothing matches “{query}”.
                                  </p>
                                )}
                              </div>
                              <div className="model-menu-thinking">
                                <span>Thinking</span>
                                <label
                                  className="thinking-slider"
                                  data-level={thinking}
                                  style={
                                    {
                                      "--stop": String(
                                        THINKING.indexOf(
                                          thinking as (typeof THINKING)[number],
                                        ),
                                      ),
                                      "--stops": String(THINKING.length - 1),
                                    } as CSSProperties
                                  }
                                  title={`Thinking · ${THINKING_LABELS[thinking]}`}
                                >
                                  <span className="thinking-control">
                                    <span
                                      className="thinking-track"
                                      aria-hidden="true"
                                    >
                                      <span className="thinking-fill" />
                                      {THINKING.map((stop, position) => (
                                        <i
                                          key={stop}
                                          data-on={
                                            position <=
                                            THINKING.indexOf(
                                              thinking as (typeof THINKING)[number],
                                            )
                                              ? "true"
                                              : "false"
                                          }
                                        />
                                      ))}
                                      <span className="thinking-knob" />
                                    </span>
                                    <input
                                      type="range"
                                      min={0}
                                      max={THINKING.length - 1}
                                      step={1}
                                      value={THINKING.indexOf(
                                        thinking as (typeof THINKING)[number],
                                      )}
                                      aria-label="Thinking effort"
                                      onChange={(event) =>
                                        setThinking(
                                          THINKING[Number(event.target.value)],
                                        )
                                      }
                                    />
                                  </span>
                                  <em>{THINKING_LABELS[thinking]}</em>
                                </label>
                              </div>
                              <div className="model-menu-foot">
                                <button
                                  type="button"
                                  className="model-menu-row quiet"
                                >
                                  <span>
                                    All models, keys, and local profiles
                                  </span>
                                  <b aria-hidden="true">↗</b>
                                </button>
                              </div>
                            </div>
                          </section>
                        )}
                      </form>
                    </section>
                  </div>
                </div>
              </div>
              <aside className="inspector">
                <div className="inspector-body">
                  <header>
                    <span>Context</span>
                  </header>
                  <ContextStats cells={stats} />
                  <ContextLedger rows={rows} capacity={capacity} />
                  <Timeline
                    turns={timelineTurns}
                    carriedTokens={Math.round(total / CHARS_PER_TOKEN)}
                    now={now}
                  />
                  <TaskListRail list={list} />
                  <PlanRail />
                  <SubagentRail agents={agents} />
                  <SubthreadRail
                    threads={[
                      { id: "s1", label: "dither plates", since: "2h" },
                      { id: "s2", label: "og image pass", since: "1d" },
                    ]}
                  />
                  <footer className="inspector-arrange">
                    <button
                      type="button"
                      className="bar-add"
                      aria-label="Add a component to this page"
                      title="Add a component"
                    >
                      ＋
                    </button>
                    <button
                      type="button"
                      className="bar-edit"
                      aria-pressed={false}
                      title="Reorder, flip and remove the components on this page"
                    >
                      Edit
                    </button>
                  </footer>
                </div>
              </aside>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

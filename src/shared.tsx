export function Link({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
}

export const clis = [
  {
    brand: "claude.svg",
    name: "Claude Code",
    binary: "claude",
    resume: "--resume <uuid>",
    unattended: "--dangerously-skip-permissions",
    owns: true,
  },
  {
    brand: "openai.svg",
    name: "Codex",
    binary: "codex",
    resume: "exec resume --last",
    unattended: "--dangerously-bypass-approvals-and-sandbox",
    owns: false,
  },
  {
    brand: "pi.svg",
    name: "Pi",
    binary: "pi",
    resume: "--session-id <uuid>",
    unattended: "none",
    owns: true,
  },
  {
    brand: "opencode.svg",
    name: "OpenCode",
    binary: "opencode",
    resume: "run --continue",
    unattended: "--auto",
    owns: false,
  },
  {
    brand: "gemini.png",
    name: "Gemini CLI",
    binary: "gemini",
    resume: "--resume latest",
    unattended: "--approval-mode=yolo",
    owns: false,
  },
  {
    brand: "antigravity.png",
    name: "Antigravity CLI",
    binary: "agy",
    resume: "--continue --print",
    unattended: "--dangerously-skip-permissions",
    owns: false,
  },
  {
    brand: "cursor.svg",
    name: "Cursor CLI",
    binary: "cursor-agent",
    resume: "--print --resume",
    unattended: "--force",
    owns: false,
  },
];

export const imports = [
  ["claude", "Claude"],
  ["openai", "Codex"],
  ["antigravity", "Antigravity"],
  ["pi", "Pi"],
  ["opencode", "OpenCode"],
  ["cursor", "Cursor CLI"],
  ["windsurf", "Windsurf"],
];

export const brands: Record<string, [string | null, string]> = {
  openai: ["openai.svg", "OpenAI"],
  anthropic: ["anthropic.svg", "Anthropic"],
  google: ["gemini.png", "Gemini"],
  "x-ai": ["xai.svg", "xAI"],
  "meta-llama": ["meta.svg", "Meta"],
  deepseek: ["deepseek.svg", "DeepSeek"],
  qwen: ["qwen.svg", "Qwen"],
  mistralai: ["mistralai.svg", "Mistral"],
  moonshotai: ["kimi.svg", "Kimi"],
  "z-ai": ["zai.svg", "Z.ai / GLM"],
  thinkingmachines: ["thinkingmachines.svg", "Thinking Machines"],
  nvidia: ["nvidia.svg", "NVIDIA"],
  cohere: ["cohere.svg", "Cohere"],
  minimax: ["minimax.svg", "MiniMax"],
  bytedance: ["bytedance.svg", "ByteDance Seed"],
  poolside: ["poolside.svg", "Poolside"],
  liquid: ["liquid.svg", "Liquid AI"],
  baidu: ["ernie.svg", "ERNIE"],
  tencent: ["hunyuan.svg", "Hunyuan"],
  xiaomi: ["xiaomi.svg", "Xiaomi"],
  naver: ["naver.svg", "HyperCLOVA"],
  sakana: ["sakana.png", "Sakana AI"],
  openrouter: ["openrouter.svg", "OpenRouter"],
  ollama: [null, "Ollama"],
  lmstudio: [null, "LM Studio"],
  claude: ["claude.svg", "Claude subscription"],
  cursor: ["cursor.svg", "Cursor"],
  github: ["github.svg", "GitHub Copilot"],
  windsurf: ["windsurf.svg", "Windsurf"],
  antigravity: ["antigravity.png", "Antigravity"],
};

export const chain = [
  "nvidia/nemotron-3-ultra-550b-a55b:free",
  "thinkingmachines/inkling:free",
  "z-ai/glm-5.2:free",
  "poolside/laguna-s-2.1:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "thinkingmachines/inkling-small:free",
  "dots-studio/dots-3-note-preview:free",
  "poolside/laguna-xs-2.1:free",
  "cohere/north-mini-code:free",
  "nvidia/nemotron-3.5-lightning:free",
];

export const modes = [
  ["◈", "Ask", "Every write, command and click asks first. The default."],
  [
    "◆",
    "Accept edits",
    "File writes and searches go through. Commands, the browser and the pointer still ask.",
  ],
  [
    "⬗",
    "Auto",
    "Everything runs on its own except ten prohibited actions, like deleting outside what you named or sending your data elsewhere. Anything that matches stops and asks you.",
  ],
  [
    "⬥",
    "Full access",
    "Every tool runs on its own except computer use, which always asks. Other apps still ask. During computer use, global Escape stops computer access while the agent continues.",
  ],
];

export const secondModels = [
  {
    name: "Advisor",
    role: "A stronger model the agent consults mid-turn with the transcript so far",
    model: "off until you pick one",
    budget: "120 s · 1024 tokens",
  },
  {
    name: "Vision",
    role: "Answers one question about one image for a model that cannot see",
    model: "nvidia/nemotron-nano-12b-v2-vl:free",
    budget: "60 s · 1024 tokens",
  },
  {
    name: "Secrets",
    role: "Reads a command's output for keys and tokens without them reaching the thread",
    model: "off until you pick one",
    budget: "60 s · 1024 tokens",
  },
  {
    name: "Note tagger",
    role: "Titles and tags a note a moment after it lands in your vault",
    model: "liquid/lfm-2.5-2.6b:free",
    budget: "20 s · 256 tokens",
  },
  {
    name: "Thread namer",
    role: "Gives a new thread its title once there is enough to name",
    model: "the free chain",
    budget: "20 s · 64 tokens",
  },
];

export const tools: [string, "ask" | "auto"][] = [
  ["browser", "ask"],
  ["cli", "ask"],
  ["cli_runs", "auto"],
  ["computer", "ask"],
  ["shortcut", "auto"],
  ["write_skill", "auto"],
  ["write_tool", "auto"],
  ["write_plugin", "auto"],
  ["run_tool", "ask"],
  ["memory", "auto"],
  ["advisor", "auto"],
  ["vision", "auto"],
  ["secret", "ask"],
  ["web_search", "auto"],
  ["task_list", "auto"],
  ["plan", "auto"],
  ["goal", "auto"],
  ["threads", "auto"],
  ["read_trace", "auto"],
  ["context", "auto"],
  ["keep", "auto"],
  ["agents", "auto"],
  ["install_mcp", "ask"],
  ["workflow", "ask"],
  ["artifact", "auto"],
  ["component", "auto"],
  ["visualize", "auto"],
];

export const widgets = [
  ["▦", "Thread stats", "Any of twenty-one metrics, as tiles or rows"],
  [
    "▤",
    "Context window",
    "What the last turn carried, by kind, against the window",
  ],
  [
    "⌇",
    "Timeline",
    "Every turn as a waterfall of requests, tools and children",
  ],
  ["☷", "Tasks", "The durable checklist the agent keeps for itself"],
  ["◰", "Plan", "The plan as a graph; pressing a node lights its wave"],
  [
    "⌸",
    "Subagents",
    "One row per live child, into the transcript it is writing",
  ],
  ["⑃", "Sub threads", "Threads this one started, working or idle"],
  ["⑂", "Git", "Branch, working tree, and the diff behind it"],
  ["◫", "Machine", "CPU, memory, GPU and network as numbers"],
  ["∿", "Machine graph", "The same four as sparklines over the last minute"],
  ["▥", "Machine meters", "The same four as 16-cell segmented gauges"],
];

export const surfaces = [
  {
    label: "Terminal",
    title: "A real login shell under the thread",
    copy: "Up to eight real login shells in the thread's folder, through Shinbo's own pty helper and xterm.js. Select output and it becomes a context chip; ⌘-click a URL and Shinbo asks which browser takes it.",
  },
  {
    label: "Browser",
    title: "One Chromium session per thread",
    copy: "Its own cookies and its own place, and the agent drives the page you are looking at. Dock it in the column or float it as a PIP — same session either way.",
  },
  {
    label: "Voice",
    title: "Dictation that never leaves the Mac",
    copy: "Off until you turn it on. Recording is local; transcription is Speech.framework or llama.cpp on loopback. A non-local endpoint is refused when saved and again before use.",
  },
  {
    label: "Artifacts",
    title: "Files that outlive the conversation",
    copy: "Seven kinds — markdown, code, html, app, svg, mermaid, react. Pages get their own CSP, and an artifact that names a surface is mounted as a real module in Shinbo's own interface.",
  },
  {
    label: "Goals",
    title: "One objective a thread keeps working at",
    copy: "Shinbo re-drives the thread without being asked again, and stops on evidence, on the same blocker three turns running, or at 200,000 tokens and 40 turns. The invariants live in Rust.",
  },
  {
    label: "Knowledge",
    title: "Markdown in a folder you already own",
    copy: "An Obsidian vault or any plain directory. One note per save, YAML front matter under <vault>/knowledge-base, attachments beside it. No mirror, no database.",
  },
];

export function Mark({ size = 24 }: { size?: number }) {
  return (
    <img
      src="/shinbo.svg"
      alt=""
      width={size}
      height={size}
      aria-hidden="true"
    />
  );
}

export function Apple({ size = 13 }: { size?: number }) {
  return (
    <svg
      className="apple"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.36 12.78c.02-2.4 1.96-3.55 2.05-3.6-1.12-1.63-2.86-1.86-3.48-1.88-1.48-.15-2.89.87-3.64.87-.75 0-1.91-.85-3.14-.83-1.61.02-3.1.94-3.93 2.38-1.68 2.91-.43 7.22 1.2 9.58.8 1.16 1.75 2.45 3 2.4 1.2-.05 1.66-.78 3.11-.78 1.45 0 1.86.78 3.13.75 1.29-.02 2.11-1.17 2.9-2.33.91-1.34 1.29-2.63 1.31-2.7-.03-.01-2.51-.96-2.53-3.84zM14.1 5.7c.66-.8 1.11-1.92.99-3.03-.95.04-2.11.63-2.8 1.43-.61.71-1.15 1.85-1.01 2.94 1.06.08 2.15-.54 2.82-1.34z" />
    </svg>
  );
}

export function Windows({ size = 13 }: { size?: number }) {
  return (
    <svg
      className="apple"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3 5.5 11 4.4v7.1H3zm0 13L11 19.6v-7.1H3zM12 4.2 21 3v8.5h-9zm0 15.6 9 1.2v-8.5h-9z" />
    </svg>
  );
}

export function PlatformIcon({ icon }: { icon?: "mac" | "windows" }) {
  if (icon === "mac") return <Apple size={14} />;
  if (icon === "windows") return <Windows size={14} />;
  return null;
}

export function Brand({ id }: { id: string }) {
  const namespace = id.split("/")[0];
  const brand = brands[namespace];
  if (!brand)
    return (
      <i className="mark fallback">{namespace.slice(0, 1).toUpperCase()}</i>
    );
  const [file, label] = brand;
  if (!file) return <i className="mark fallback">{label.slice(0, 1)}</i>;
  return <img className="mark" src={`/brands/${file}`} alt="" title={label} />;
}

export function Ticker({
  label = (
    <>
      Providers <i>·</i> and any OpenAI-compatible endpoint
    </>
  ),
  className = "",
}: {
  label?: React.ReactNode;
  className?: string;
} = {}) {
  return (
    <section
      className={`ticker ${className}`.trim()}
      aria-label="Model providers, subscriptions and local runtimes Shinbo routes to"
    >
      <p className="shell label">{label}</p>
      <div className="track">
        <div className="lanes">
          {[false, true].map((clone) => (
            <ul key={String(clone)} aria-hidden={clone || undefined}>
              {Object.entries(brands).map(([namespace, [, label]]) => (
                <li key={namespace}>
                  <Brand id={namespace} />
                  {label}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

const harnesses: [file: string, name: string][] = [
  ["claude.svg", "Claude Code"],
  ["openai.svg", "Codex"],
  ["pi.svg", "Pi"],
  ["opencode.svg", "OpenCode"],
  ["gemini.png", "Gemini"],
  ["cursor.svg", "Cursor"],
];

export function HeroLoop() {
  return (
    <svg
      className="heroloop"
      viewBox="0 0 420 200"
      role="img"
      aria-label="Shinbo at the top, calling Claude Code, Codex, Pi, OpenCode, Gemini CLI and Cursor CLI below Shinbo as tools"
    >
      <style>{`
        .hl-b { fill: var(--surface-2); stroke: var(--border-strong); stroke-width: 1; }
        .hl-me { fill: var(--surface-3); stroke: var(--accent); }
        .hl-t {
          font-family: var(--font-mono); font-size: 7.5px; letter-spacing: .06em;
          text-transform: uppercase; fill: var(--text-2);
          text-anchor: middle; dominant-baseline: central;
        }
        .hl-me-t { fill: var(--text); font-size: 12px; letter-spacing: .08em; }
        .hl-w { stroke: var(--border-strong); stroke-width: 1; fill: none; }
        .hl-p { stroke: var(--accent); stroke-width: 1; fill: none;
                stroke-dasharray: 12 300; stroke-dashoffset: 312; }
        @media (prefers-reduced-motion: no-preference) {
          .hl-p { animation: hl-run 3.6s linear infinite; }
          .hl-p2 { animation-delay: .55s; }
          .hl-p3 { animation-delay: 1.1s; }
          .hl-p4 { animation-delay: 1.65s; }
          .hl-p5 { animation-delay: 2.2s; }
          .hl-p6 { animation-delay: 2.75s; }
          @keyframes hl-run { to { stroke-dashoffset: 0; } }
        }
      `}</style>

      {harnesses.map(([file, n], i) => {
        const x = 10 + i * 68;
        const cx = x + 30;
        const wire = `M210 56 V86 H${cx} V128`;
        return (
          <g key={n}>
            <path className="hl-w" d={wire} />
            <path className={`hl-p hl-p${i + 1}`} d={wire} />
            <rect className="hl-b" x={x} y="128" width="60" height="52" />
            <image
              href={`/brands/${file}`}
              x={cx - 10}
              y="138"
              width="20"
              height="20"
            />
            <text className="hl-t" x={cx} y="169">
              {n}
            </text>
          </g>
        );
      })}

      <rect className="hl-b hl-me" x="160" y="0" width="100" height="56" />
      <image href="/shinbo.svg" x="198" y="8" width="24" height="24" />
      <text className="hl-t hl-me-t" x="210" y="43">
        Shinbo
      </text>
    </svg>
  );
}

export const SHOT_SIZE: Record<string, [number, number]> = {
  "/shots/workspace-thread.png": [2760, 1720],
  "/shots/onboarding-connect.png": [2880, 1800],
  "/shots/model-picker.png": [2760, 1720],
  "/shots/plan-subagents.png": [2760, 1720],
  "/shots/scheduled-jobs.png": [2760, 1720],
  "/shots/scheduled-graph.png": [2760, 1720],
  "/shots/self-improvement-models.png": [2760, 1720],
  "/shots/archive.png": [2760, 1720],
  "/shots/agent-dashboard.png": [2760, 1720],
  "/shots/agent-import.png": [2880, 1800],
  "/shots/knowledge-base.png": [2880, 1800],
  "/shots/settings-context-bar.png": [2880, 1800],
  "/shots/settings-quick-actions.png": [2880, 1800],
  "/shots/settings-models.png": [2880, 1800],
  "/shots/settings-permissions.png": [2880, 1800],
  "/shots/settings-mobile.png": [2880, 1800],
  "/shots/settings-tools.png": [2880, 1800],
  "/shots/notch-island.png": [1240, 512],
};

export function Shot({
  src,
  alt,
  caption,
  title,
}: {
  src: string;
  alt: string;
  caption: string;
  title: string;
}) {
  const [w, h] = SHOT_SIZE[src] ?? [2760, 1720];
  return (
    <figure className="shot" data-reveal="">
      <a
        className="shot-win"
        href={src}
        aria-label={`Open ${title} screenshot at full size`}
      >
        <img
          src={src.replace(/\.png$/, ".webp")}
          alt={alt}
          width={w}
          height={h}
          loading="lazy"
          decoding="async"
        />
      </a>
      <figcaption>
        <b>{title}</b> — {caption}
        <small className="shot-provenance">
          Captured September 12, 2026 · current app source · example profile
        </small>
      </figcaption>
    </figure>
  );
}

export function PlanGraph() {
  const nodes = [
    { id: 1, x: 40, y: 26, state: "done" },
    { id: 2, x: 210, y: 26, state: "done" },
    { id: 3, x: 40, y: 78, state: "run" },
    { id: 4, x: 210, y: 78, state: "run" },
    { id: 5, x: 125, y: 130, state: "wait" },
    { id: 6, x: 125, y: 182, state: "wait" },
  ];
  const edges = [
    [1, 3],
    [1, 4],
    [2, 3],
    [2, 4],
    [3, 5],
    [4, 5],
    [5, 6],
  ];
  const fill = { done: "var(--lime)", run: "var(--orange)", wait: "none" };
  const at = (id: number) => nodes.find((n) => n.id === id)!;
  return (
    <figure className="diagram">
      <figcaption>Plan · dependency graph, one wave at a time</figcaption>
      <svg
        viewBox="0 0 290 212"
        role="img"
        aria-label="A six-step plan graph: two done steps feed two running steps, which feed two waiting steps"
      >
        {edges.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={at(a).x + 11}
            y1={at(a).y + 11}
            x2={at(b).x + 11}
            y2={at(b).y + 11}
            stroke="var(--border-strong)"
          />
        ))}
        {nodes.map((n) => (
          <g key={n.id}>
            <rect
              x={n.x}
              y={n.y}
              width="22"
              height="22"
              fill={fill[n.state as keyof typeof fill]}
              stroke={n.state === "wait" ? "var(--border-strong)" : "none"}
              strokeDasharray={n.state === "wait" ? "3 2" : undefined}
            />
            <text
              x={n.x + 11}
              y={n.y + 15}
              textAnchor="middle"
              fill={n.state === "wait" ? "var(--text-3)" : "var(--fg-invert)"}
            >
              {n.id}
            </text>
          </g>
        ))}
      </svg>
      <div className="legend">
        <span>
          <i style={{ background: "var(--orange)" }} /> running
        </span>
        <span>
          <i style={{ background: "var(--lime)" }} /> done
        </span>
        <span>
          <i style={{ border: "1px dashed var(--border-strong)" }} /> waiting
        </span>
      </div>
    </figure>
  );
}

export function WorkflowGraph() {
  return (
    <figure className="diagram" data-reveal="">
      <figcaption>Workflow · agent, script, set and if nodes</figcaption>
      <svg
        viewBox="0 0 290 212"
        role="img"
        aria-label="A workflow graph: an agent node feeds an if node, whose true branch runs a script and whose false branch ends"
      >
        <g stroke="var(--border-strong)" fill="none">
          <path d="M60 46v20" />
          <path d="M60 96v12" />
          <path d="M60 138v24" />
          <path d="M104 123h84v39" />
        </g>
        <g fill="none" stroke="var(--orange)" className="wf-live">
          <rect x="16" y="16" width="88" height="30" />
        </g>
        <text x="26" y="35" fill="var(--orange)">
          AGENT digest
        </text>
        <g fill="none" stroke="var(--border-strong)">
          <rect x="16" y="66" width="88" height="30" />
        </g>
        <text x="26" y="85">
          SET window
        </text>
        <g fill="none" stroke="var(--violet)">
          <rect x="16" y="108" width="88" height="30" />
        </g>
        <text x="26" y="127" fill="var(--violet)">
          IF errors
        </text>
        <g fill="none" stroke="var(--lime)">
          <rect x="16" y="162" width="88" height="30" />
        </g>
        <text x="26" y="181" fill="var(--lime)">
          SCRIPT deploy
        </text>
        <g fill="none" stroke="var(--border-strong)">
          <rect x="162" y="162" width="52" height="30" />
        </g>
        <text x="172" y="181">
          END
        </text>
        <text x="112" y="119" fill="var(--text-3)">
          false
        </text>
        <text x="66" y="158" fill="var(--text-3)">
          true
        </text>
      </svg>
      <div className="legend">
        <span>{"{{last}}"} carries the previous answer</span>
        <span>24 nodes max</span>
      </div>
    </figure>
  );
}

const loopSteps = ["Run", "Review", "Repair", "Replay"];

export function LearningLoop() {
  // Nodes 56 wide on an 87 pitch; the wire runs right along the row, then
  // back under it to Run. Every animation is keyed to that 6s lap; the
  // Keep node alternates kept / discarded across two laps (12s).
  const cx = (i: number) => 36 + i * 87;
  return (
    <svg
      className="fg-learning"
      viewBox="0 0 420 120"
      role="img"
      aria-label="Self learning loop: run, review the failure, propose a repair, replay it, then keep or discard the change. Kept changes add to a learned counter."
    >
      <style>{`
        .ll-n { color: var(--border-strong); }
        .ll-n rect { fill: var(--surface-2); stroke: currentColor; stroke-width: 1; }
        .ll-n text, .ll-c { fill: currentColor; }
        .ll-run { color: var(--accent); }
        .ll-n text, .ll-c {
          font-family: var(--font-mono); font-size: 7.5px; letter-spacing: .06em;
          text-transform: uppercase; text-anchor: middle; dominant-baseline: central;
        }
        .ll-c { fill: var(--text-3); }
        .ll-w { stroke: var(--border-strong); stroke-width: 1; fill: none; }
        .ll-p { stroke: var(--accent); stroke-width: 1; fill: none;
                stroke-dasharray: 14 752; stroke-dashoffset: 766; }
        .ll-k, .ll-d, .ll-c2 { opacity: 0; }
        .ll-k { color: var(--accent); }
        .ll-d { color: var(--text-3); }
        .ll-k path { stroke: currentColor; stroke-width: 1.2; fill: none; }
        .ll-d path { stroke: currentColor; stroke-width: 1.2; fill: none; }
        @media (prefers-reduced-motion: no-preference) {
          .ll-n { animation: ll-on 6s infinite; }
          .ll-run { color: var(--border-strong); }
          .ll-n:nth-of-type(2) { animation-delay: 1.2s; }
          .ll-n:nth-of-type(3) { animation-delay: 2.4s; }
          .ll-n:nth-of-type(4) { animation-delay: 3.6s; }
          .ll-n:nth-of-type(5) { animation-delay: 4.8s; }
          .ll-p { animation: ll-dash 6s infinite; }
          .ll-q { animation: ll-q 12s infinite; }
          .ll-k { animation: ll-k 12s infinite; }
          .ll-d { animation: ll-d 12s infinite; }
          .ll-c1 { animation: ll-c1 12s infinite; }
          .ll-c2 { animation: ll-c2 12s infinite; }
          @keyframes ll-on {
            0%, 20%, 100% { color: var(--border-strong); }
            3%, 17% { color: var(--accent); }
          }
          @keyframes ll-dash {
            0% { stroke-dashoffset: 766; }
            20% { stroke-dashoffset: 735; }
            40% { stroke-dashoffset: 648; }
            60% { stroke-dashoffset: 561; }
            80% { stroke-dashoffset: 474; }
            100% { stroke-dashoffset: 14; }
          }
          @keyframes ll-q {
            0%, 43%, 50%, 93%, 100% { opacity: 1; }
            45%, 49%, 95%, 99% { opacity: 0; }
          }
          @keyframes ll-k {
            0%, 43%, 50%, 100% { opacity: 0; }
            45%, 49% { opacity: 1; }
          }
          @keyframes ll-d {
            0%, 93%, 100% { opacity: 0; }
            95%, 99% { opacity: 1; }
          }
          @keyframes ll-c1 {
            0%, 47%, 100% { opacity: 0; }
            1%, 45% { opacity: 1; }
          }
          @keyframes ll-c2 {
            0%, 45%, 100% { opacity: 0; }
            47%, 99% { opacity: 1; }
          }
        }
      `}</style>

      <path className="ll-w" d={`M64 35 H${cx(4)} V92 H${cx(0)} V50`} />
      <path className="ll-p" d={`M64 35 H${cx(4)} V92 H${cx(0)} V50`} />

      {loopSteps.map((label, i) => (
        <g key={label} className={i === 0 ? "ll-n ll-run" : "ll-n"}>
          <rect x={cx(i) - 28} y="20" width="56" height="30" />
          <text x={cx(i)} y="35">
            {label}
          </text>
        </g>
      ))}

      <g className="ll-n">
        <rect x={cx(4) - 28} y="20" width="56" height="30" />
        <text className="ll-q" x={cx(4)} y="35">
          Keep?
        </text>
        <g className="ll-k">
          <path d={`M${cx(4) - 20} 35 l3 3 l6 -6`} />
          <text x={cx(4) + 4} y="35">
            Kept
          </text>
        </g>
        <g className="ll-d">
          <path d={`M${cx(4) - 20} 32 l6 6 m0 -6 l-6 6`} />
          <text x={cx(4) + 2} y="35">
            Discard
          </text>
        </g>
      </g>

      <text className="ll-c ll-c1" x="210" y="106">
        Learned 12
      </text>
      <text className="ll-c ll-c2" x="210" y="106">
        Learned 13
      </text>
    </svg>
  );
}

export function Waterfall() {
  const spans: [string, number, number, string][] = [
    ["model request", 0, 34, "var(--blue)"],
    ["grep_files", 34, 8, "var(--text-3)"],
    ["read_file", 42, 6, "var(--text-3)"],
    ["model request", 48, 22, "var(--blue)"],
    ["subagent · survey", 70, 46, "var(--teal)"],
    ["subagent · rewrite", 74, 60, "var(--teal)"],
    ["cli · codex", 96, 52, "var(--orange)"],
    ["model request", 150, 26, "var(--blue)"],
  ];
  return (
    <figure className="diagram">
      <figcaption>Timeline · every turn as a waterfall</figcaption>
      <svg
        viewBox="0 0 290 212"
        role="img"
        aria-label="A span waterfall: model requests, tool calls, two subagents and one CLI run laid out across a turn"
      >
        {spans.map(([name, start, width, color], i) => (
          <g key={name + i}>
            <rect
              x={start + 8}
              y={16 + i * 24}
              width={width}
              height="9"
              fill={color}
            />
            <text x={start + 8 + width + 6} y={24 + i * 24}>
              {name}
            </text>
          </g>
        ))}
        <line x1="8" y1="206" x2="282" y2="206" stroke="var(--border-strong)" />
      </svg>
      <div className="legend">
        <span>
          <i style={{ background: "var(--blue)" }} /> model
        </span>
        <span>
          <i style={{ background: "var(--teal)" }} /> subagent
        </span>
        <span>
          <i style={{ background: "var(--orange)" }} /> cli
        </span>
      </div>
    </figure>
  );
}

export function Ledger() {
  const parts: [string, number, string][] = [
    ["4 messages", 15, "var(--blue)"],
    ["file list", 3.7, "var(--teal)"],
    ["skills", 2.4, "var(--rose)"],
    ["system tools", 1.7, "var(--orange)"],
    ["system prompt", 1.4, "var(--lime)"],
    ["memory files", 0.7, "var(--violet)"],
  ];
  const total = parts.reduce((sum, [, k]) => sum + k, 0);
  let x = 8;
  return (
    <figure className="diagram">
      <figcaption>Context window · what the turn actually carried</figcaption>
      <svg
        viewBox="0 0 290 212"
        role="img"
        aria-label="A stacked bar of the context ledger with one row per segment and the tokens it carried"
      >
        <text x="8" y="18" fill="var(--text-2)">
          25k of 1049k carried · 2.4%
        </text>
        <rect x="8" y="26" width="274" height="10" fill="var(--surface-4)" />
        {parts.map(([name, k, color]) => {
          const w = (k / total) * 274;
          const rect = (
            <rect key={name} x={x} y="26" width={w} height="10" fill={color} />
          );
          x += w;
          return rect;
        })}
        {parts.map(([name, k, color], i) => (
          <g key={name}>
            <rect x="8" y={54 + i * 22} width="8" height="8" fill={color} />
            <text x="24" y={62 + i * 22}>
              {name}
            </text>
            <text x="240" y={62 + i * 22} fill="var(--text-3)">
              {k}k
            </text>
          </g>
        ))}
      </svg>
      <div className="legend">
        <span>counted here, not billed here</span>
        <span>⤢ opens the full table</span>
      </div>
    </figure>
  );
}

export const faq = [
  {
    q: "What is Shinbo?",
    a: "Shinbo is a free, open-source agent workspace for macOS on Apple silicon. Shinbo runs the agent CLIs you already have — Claude Code, Codex, Pi, OpenCode, Gemini CLI, Antigravity CLI and Cursor CLI — as first-party tools inside one Markdown thread, signed in with your own subscriptions, alongside Shinbo's own agent, shinbo-cli.",
  },
  {
    q: "What does Shinbo cost?",
    a: "Nothing. Shinbo is free and open source under the MIT licence, with no paid tier and no account. Shinbo ships on a chain of ten free models and can point at a local model, so running Shinbo can cost nothing. Point Shinbo at a paid provider or drive a paid CLI and that provider bills as it normally would.",
  },
  {
    q: "What platform does Shinbo run on?",
    a: "macOS on Apple silicon, signed and notarised, updating itself in place. A Windows x64 build compiles and packages on every change, but it is unsigned and not published yet. There is no Linux build. The agent itself, shinbo-cli, also runs headless from a terminal.",
  },
  {
    q: "How is Shinbo different from running Claude Code or Codex on their own?",
    a: "Shinbo does not reimplement those agents. Shinbo spawns them as themselves and calls them like any other tool. What Shinbo adds around them is one Markdown thread that outlives every run, one permission model with four modes a subagent inherits and cannot exceed, one durable trace where every model step, tool call, subagent and CLI run is a span, a plan that is a dependency graph run a wave at a time, scheduled cron workflows, computer control under fixed rails, an interface Shinbo rewrites regions of, and a self-improvement loop that A/B tests its own changes on a replay bench.",
  },
  {
    q: "Does Shinbo use my Claude or Codex subscription?",
    a: "Two different ways, both on sign-ins you already have. Claude Code and the other CLIs launch as subprocesses under the session they own, and Shinbo never reads or copies a token. Your ChatGPT plan can also drive the thread itself: Shinbo reads the sign-in codex login already stored and relays it over a loopback port only Shinbo holds the key to.",
  },
  {
    q: "Can Shinbo run local models?",
    a: "Yes. Shinbo talks to any OpenAI-compatible endpoint, with presets for LM Studio, Ollama and llama.cpp, and local endpoints are allowed over loopback HTTP. Shinbo's five smaller model jobs can each be pointed somewhere local too. Voice transcription is local either way, through Speech.framework or llama.cpp on loopback. Choosing a local model is not an app-wide offline switch, though.",
  },
  {
    q: "Is Shinbo open source?",
    a: "Yes, under the MIT licence. The repository is github.com/tronschell/shinbo. Shinbo's agent, shinbo-cli, is a Zig fork of vercel-labs/fx and stays Apache-2.0. The project is open for the community to hack on, tinker with and contribute to.",
  },
];

const clis = [
  {
    brand: "claude",
    name: "Claude Code",
    binary: "claude",
    resume: "--resume <uuid>",
    unattended: "--dangerously-skip-permissions",
    owns: true,
  },
  {
    brand: "openai",
    name: "Codex",
    binary: "codex",
    resume: "exec resume --last",
    unattended: "--dangerously-bypass-approvals-and-sandbox",
    owns: false,
  },
  {
    brand: "pi",
    name: "Pi",
    binary: "pi",
    resume: "--session-id <uuid>",
    unattended: "none",
    owns: true,
  },
  {
    brand: "opencode",
    name: "OpenCode",
    binary: "opencode",
    resume: "run --continue",
    unattended: "--auto",
    owns: false,
  },
  {
    brand: "cursor",
    name: "Cursor CLI",
    binary: "cursor-agent",
    resume: "--print --resume",
    unattended: "--force",
    owns: false,
  },
];

const imports = [
  ["claude", "Claude"],
  ["openai", "Codex"],
  ["antigravity", "Antigravity"],
  ["pi", "Pi"],
  ["opencode", "OpenCode"],
  ["cursor", "Cursor"],
  ["windsurf", "Windsurf"],
];

const brands: Record<string, [string | null, string]> = {
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
  thinkingmachines: [null, "Thinking Machines"],
  nvidia: ["nvidia.svg", "NVIDIA"],
  cohere: ["cohere.svg", "Cohere"],
  minimax: ["minimax.svg", "MiniMax"],
  bytedance: ["bytedance.svg", "ByteDance Seed"],
  poolside: ["poolside.svg", "Poolside"],
  liquid: ["liquid.svg", "Liquid AI"],
  baidu: [null, "ERNIE"],
  tencent: [null, "Hunyuan"],
  xiaomi: ["xiaomi.svg", "Xiaomi"],
  naver: ["naver.svg", "HyperCLOVA"],
  sakana: [null, "Sakana AI"],
  openrouter: ["openrouter.svg", "OpenRouter"],
};

const chain = [
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

const modes = [
  ["◈", "Ask", "Every write, command and click asks first. The default."],
  [
    "◆",
    "Accept edits",
    "File writes and searches go through. Commands, the browser and the pointer still ask.",
  ],
  [
    "⬗",
    "Auto",
    "A verifier model reads each gated call against rules you wrote. Anything it will not clear comes back to you.",
  ],
  [
    "⬥",
    "Full access",
    "Nothing asks. Escape still stops a run, and the computer-use rails still hold.",
  ],
];

const secondModels = [
  {
    name: "Verifier",
    role: "Clears or refuses each gated call in Auto mode",
    model: "liquid/lfm-2.5-2.6b:free",
    budget: "20 s · 700 tokens",
  },
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
    name: "Note tagger",
    role: "Titles and tags a note a moment after it lands in your vault",
    model: "liquid/lfm-2.5-2.6b:free",
    budget: "20 s · 256 tokens",
  },
];

const tools: [string, "ask" | "auto"][] = [
  ["browser", "ask"],
  ["cli", "ask"],
  ["cli_runs", "auto"],
  ["computer", "ask"],
  ["write_skill", "auto"],
  ["write_tool", "auto"],
  ["write_plugin", "auto"],
  ["run_tool", "ask"],
  ["memory", "auto"],
  ["advisor", "auto"],
  ["vision", "auto"],
  ["web_search", "auto"],
  ["plan", "auto"],
  ["goal", "auto"],
  ["threads", "auto"],
  ["read_trace", "auto"],
  ["context", "auto"],
  ["keep", "auto"],
  ["agents", "auto"],
  ["install_mcp", "ask"],
  ["workflow", "ask"],
  ["autoresearch", "ask"],
  ["artifact", "auto"],
  ["visualize", "auto"],
];

const widgets = [
  ["▦", "Thread stats", "Any of eighteen metrics, as tiles or rows"],
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

const surfaces = [
  {
    label: "Terminal",
    title: "A real login shell under the thread",
    copy: "A real login shell in the thread's folder, through Emma's pty helper and xterm.js. Select output and it becomes a context chip; ⌘-click a URL and Emma asks which browser takes it.",
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
    copy: "Seven kinds — markdown, code, html, app, svg, mermaid, react. Pages get their own CSP, code is never executed, and one can become a region of Emma's interface.",
  },
  {
    label: "Goals",
    title: "One objective a thread keeps working at",
    copy: "Emma re-drives the thread without being asked again, and stops on evidence, on the same blocker three turns running, or at 200,000 tokens and 40 turns. The invariants live in Rust.",
  },
  {
    label: "Knowledge",
    title: "Markdown in a folder you already own",
    copy: "An Obsidian vault or any plain directory. One note per save, YAML front matter under <vault>/knowledge-base, attachments beside it. No mirror, no database.",
  },
];

function Mark({ size = 24 }: { size?: number }) {
  return <img src="/emma.webp" alt="" width={size} aria-hidden="true" />;
}

function Brand({ id }: { id: string }) {
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

function Ticker() {
  return (
    <section className="ticker" aria-label="Model providers Emma routes to">
      <p className="shell label">
        Providers <i>·</i> and any OpenAI-compatible endpoint
      </p>
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

function Shot({
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
  return (
    <figure className="shot">
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      <figcaption>
        <b>{title}</b> — {caption}
      </figcaption>
    </figure>
  );
}

function PlanGraph() {
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

function WorkflowGraph() {
  return (
    <figure className="diagram">
      <figcaption>Workflow · agent, set and if nodes</figcaption>
      <svg
        viewBox="0 0 290 212"
        role="img"
        aria-label="A workflow graph: an agent node feeds an if node, whose true branch runs a second agent and whose false branch ends"
      >
        <g stroke="var(--border-strong)" fill="none">
          <path d="M60 46v20" />
          <path d="M60 96v12" />
          <path d="M60 138v24" />
          <path d="M104 123h84v39" />
        </g>
        <g fill="none" stroke="var(--orange)">
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
        <g fill="none" stroke="var(--orange)">
          <rect x="16" y="162" width="88" height="30" />
        </g>
        <text x="26" y="181" fill="var(--orange)">
          AGENT triage
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

function Waterfall() {
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

function Ledger() {
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

function App() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className="rail">
        <div className="shell rail-in">
          <a className="brand" href="#top">
            <Mark />
            <span>Emma</span>
          </a>
          <nav aria-label="Primary">
            <a href="#harness">Harness</a>
            <a href="#delegation">Delegation</a>
            <a href="#plan">Plan</a>
            <a href="#models">Models</a>
            <a href="#control">Control</a>
            <a href="#surfaces">Surfaces</a>
            <a href="#knowledge">Knowledge</a>
            <a href="#jobs">Jobs</a>
            <a href="#tools">Tools</a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero shell" id="top">
          <p className="eyebrow">
            <span className="dot" /> macOS · one loop, every surface
          </p>
          <h1>
            A harness for
            <br />
            every <em>harness</em>.
          </h1>
          <p className="lede">
            Emma runs her own agent — <b>emma-cli</b>, a Zig harness over the
            Agent Client Protocol — and everyone else's. Claude Code, Codex, Pi,
            OpenCode and Cursor take turns in one Markdown thread.
          </p>
          <div className="actions">
            <a className="btn btn-solid" href="#harness">
              See the meta-harness ↓
            </a>
            <a className="btn" href="#plan">
              Plans, graphs and delegation
            </a>
          </div>
        </section>

        <Ticker />

        <section className="section shell" id="workspace">
          <Shot
            src="/shots/workspace-thread.png"
            alt="Emma's workspace: threads and projects down the left, a running conversation in the middle, and the context bar on the right showing thread stats, the context window ledger, the plan graph and the sub threads this turn started"
            title="The workspace"
            caption="Threads and projects left · the turn in the middle · the inspector you arranged on the right"
          />
        </section>

        <section className="section shell" id="harness">
          <div className="head head-split">
            <div>
              <p className="eyebrow">The meta-harness</p>
              <h2>Emma does not reimplement your agent. She runs it.</h2>
            </div>
            <p className="lede">
              A <b>cli</b> call spawns the binary you already have, in the
              thread's folder, and streams it live. A run is a conversation: the
              child exits at the end of a turn and waits, holding its session
              id.
            </p>
          </div>

          <div className="tbl-wrap">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Agent</th>
                  <th>Binary</th>
                  <th>Resumes with</th>
                  <th>Unattended flag</th>
                  <th>Owns its session</th>
                </tr>
              </thead>
              <tbody>
                {clis.map((c) => (
                  <tr key={c.name}>
                    <td>
                      <span className="brandcell">
                        <img
                          className="mark"
                          src={`/brands/${c.brand}.svg`}
                          alt=""
                        />
                        {c.name}
                      </span>
                    </td>
                    <td>
                      <b>{c.binary}</b>
                    </td>
                    <td>{c.resume}</td>
                    <td className={c.unattended === "none" ? "muted" : ""}>
                      {c.unattended}
                    </td>
                    <td>{c.owns ? "yes" : "no — one at a time per folder"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cols" style={{ marginTop: 32 }}>
            <div>
              <h3>Runs float, they don't scroll away</h3>
              <p className="copy">
                Each run gets a window over the conversation — logo, live state,
                output, its own composer. Drop one anywhere and it swoops to the
                anchor covering the least text.
              </p>
            </div>
            <div>
              <h3>Emma's own loop is a fork</h3>
              <p className="copy">
                <b>emma-cli</b> forks{" "}
                <a href="https://github.com/vercel-labs/fx">vercel-labs/fx</a>{" "}
                (Apache-2.0) in Zig. It owns the loop, tools, hooks, skills,
                subagents and MCP. Emma owns the window, the thread and every
                permission answer. No second loop.
              </p>
            </div>
            <div>
              <h3>Your existing setup, by reference</h3>
              <p className="copy">
                Emma finds skills and MCP configs already set up for another
                agent and records their <b>paths</b>. Nothing is copied, no
                secret is read, stdio only.
              </p>
            </div>
          </div>

          <div className="marks" style={{ marginTop: 24 }}>
            <span>Imports from</span>
            {imports.map(([file, name]) => (
              <img
                key={name}
                src={`/brands/${file}.${file === "antigravity" ? "png" : "svg"}`}
                alt={name}
                title={name}
              />
            ))}
            <span>Devin · and their MCP configs</span>
          </div>

          <div style={{ marginTop: 28 }}>
            <Shot
              src="/shots/agent-import.png"
              alt="Settings, imports: each agent Emma found on this Mac with the skills and MCP config it has, and the paths they live at"
              title="What she found"
              caption="Counted and pathed · nothing copied, nothing read · tick what you want referenced"
            />
          </div>
        </section>

        <section className="section shell" id="delegation">
          <div className="head head-split">
            <div>
              <p className="eyebrow">Threads and delegation</p>
              <h2>A thread outlives every run inside it.</h2>
            </div>
            <p className="lede">
              A thread is a Markdown file. A run is one agent loop
              inside it, and dissolves when the job is done. Everything that
              starts a run — composer, Quick Ask, a due job — enters through one
              interception.
            </p>
          </div>

          <div className="cards">
            <article>
              <span className="label">Subagent</span>
              <h3>A worker that dissolves</h3>
              <p>
                The harness's own tool, so a child runs in the same process and
                never queues behind its parent. Real transcript, a colour in the
                sidebar, a tab you can steer or stop. Inherits the parent's mode
                and cannot exceed it.
              </p>
            </article>
            <article>
              <span className="label">Sub thread</span>
              <h3>A conversation that stays</h3>
              <p>
                <b>threads spawn</b> starts an ordinary thread owned by the
                caller and nested under it. It works beside the calling turn
                rather than inside it, and it is still there tomorrow. Eight at
                once.
              </p>
            </article>
            <article>
              <span className="label">Queue · steer · stop</span>
              <h3>Three doors into a running turn</h3>
              <p>
                Enter queues; the queue drains one turn at a time. ⤳ steers —
                the text lands at the next model step. Escape stops, writes the
                partial answer to history, and <i>holds</i> what was queued.
              </p>
            </article>
          </div>

          <div style={{ marginTop: 24 }}>
            <Shot
              src="/shots/plan-subagents.png"
              alt="A plan open full screen: a twenty-four step dependency graph over seven waves with the running wave lit, beside the step cards — each one a subagent brief, what it waits on, and its task list"
              title="A plan, mid-flight"
              caption="24 steps · seven waves · every node a subagent brief, every edge something it waits on"
            />
          </div>
        </section>

        <section className="section shell" id="plan">
          <div className="head head-split">
            <div>
              <p className="eyebrow">Plan</p>
              <h2>Plan is a tool, not a mode.</h2>
            </div>
            <p className="lede">
              <b>plan</b> writes steps to Markdown, each a subagent brief wired
              to what it waits on. Steps whose dependencies are done form a{" "}
              <b>wave</b> — up to eight live subagents. Markdown is the store,
              so a hand-edited plan still parses.
            </p>
          </div>

          <div className="cols-2">
            <PlanGraph />
            <WorkflowGraph />
            <Waterfall />
            <Ledger />
          </div>

          <div className="note">
            Three of these are inspector components — plan, timeline and the
            context ledger — and all read the same ledger the numbers do. The
            workflow graph belongs to Scheduled.
          </div>

          <div className="cols-2" style={{ marginTop: 40 }}>
            <div>
              <h3>The inspector is components you arrange</h3>
              <p className="copy" style={{ marginTop: 12 }}>
                Ten ship. Drag them in or out, flip the orientable ones, keep
                four named pages. Validated on the way in, so a hand-edited
                settings file cannot break the bar.
              </p>
              <div className="rows" style={{ marginTop: 20 }}>
                {widgets.map(([glyph, name, what]) => (
                  <div key={name}>
                    <span>
                      <i
                        className="glyph"
                        style={{ fontStyle: "normal" }}
                        aria-hidden="true"
                      >
                        {glyph}
                      </i>
                      {name}
                    </span>
                    <p>{what}</p>
                  </div>
                ))}
              </div>
            </div>
            <Shot
              src="/shots/settings-context-bar.png"
              alt="Settings, context bar: page tabs, a list of components to drag in and out of the column, and a live preview of the bar at its default 288 pixel width"
              title="Arranging the inspector"
              caption="Palette left · a live 288px preview right · up to four pages, each named"
            />
          </div>
        </section>

        <section className="section shell" id="models">
          <div className="head head-split">
            <div>
              <p className="eyebrow">Models</p>
              <h2>A free chain first. A fallback behind every link.</h2>
            </div>
            <p className="lede">
              Any OpenAI-compatible endpoint; ships pointed at OpenRouter. The{" "}
              <b>Emma Free Router</b> expands into one fallback array, best
              first, so a rate-limited or retired link is just the one that did
              not answer. Dead ids are filtered against the catalog, not sent.
            </p>
          </div>

          <div className="cols-2">
            <div>
              <div className="region">
                <div className="band band-head">
                  <span className="label">
                    Emma Free Router — default chain
                  </span>
                  <span className="tag tag-accent">editable · up to 24</span>
                </div>
                <ol className="band chain">
                  {chain.map((id) => (
                    <li key={id}>
                      <Brand id={id} />
                      {id}
                    </li>
                  ))}
                </ol>
                <div className="band">
                  <p className="copy">
                    Drag to reorder, ✕ to drop a link, add any model the catalog
                    prices at zero. Validated in the renderer and again in the
                    trusted process.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <dl className="kv region" style={{ padding: 16 }}>
                <dt>Catalog</dt>
                <dd>tool-capable models only</dd>
                <dt>Browsing</dt>
                <dd>needs no key</dd>
                <dt>Offline</dt>
                <dd>cached, plus a 334-row seed</dd>
                <dt>Local endpoints</dt>
                <dd>loopback http only</dd>
                <dt>Keys</dt>
                <dd>keychain · env var · masked back</dd>
                <dt>Private routing</dt>
                <dd>fail closed, never fall back</dd>
              </dl>
              <p className="copy" style={{ marginTop: 16 }}>
                A credential setting <i>names</i> an environment variable, never
                the key. What you paste is keychain-encrypted and reaches the
                agent only in its spawn environment. Private routing fails a
                turn rather than route where the prompt might be kept.
              </p>
              <div className="region" style={{ marginTop: 20 }}>
                <div className="band band-head">
                  <span className="label">When a model goes quiet</span>
                </div>
                <div className="band">
                  <p className="copy">
                    A minute with no delta and no tool call — three if a tool is
                    running — draws a stall notice and <b>Try another model</b>.
                    Picking one swaps <i>this</i> turn: the run stops, the same
                    prompt requeues, nothing typed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 28 }}>
            <Shot
              src="/shots/model-picker.png"
              alt="The model picker open over a new thread: a searchable list of the live OpenRouter catalog with free models marked, provider filters down the side, a thinking slider, and the selected model pinned at the top"
              title="The picker"
              caption="Live catalog · free filter · thinking effort · per-thread, recorded per turn"
            />
          </div>

          <div className="head" style={{ marginTop: 56, marginBottom: 20 }}>
            <h2>The second models are yours to point.</h2>
            <p className="lede">
              Four subsystems, each on its own small model. All four take a
              model, an endpoint, a credential variable and a system prompt you
              write — free hosted, LM Studio on loopback, or off.
            </p>
          </div>

          <div className="tbl-wrap">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Subsystem</th>
                  <th>What it decides</th>
                  <th>Ships with</th>
                  <th>Budget</th>
                </tr>
              </thead>
              <tbody>
                {secondModels.map((m) => (
                  <tr key={m.name}>
                    <td>{m.name}</td>
                    <td>{m.role}</td>
                    <td>
                      {m.model.includes("/") ? (
                        <span className="brandcell">
                          <Brand id={m.model} />
                          <b>{m.model}</b>
                        </span>
                      ) : (
                        <span className="muted">{m.model}</span>
                      )}
                    </td>
                    <td className="muted">{m.budget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="section shell" id="control">
          <div className="head head-split">
            <div>
              <p className="eyebrow">Control</p>
              <h2>You set how much a turn may do alone.</h2>
            </div>
            <p className="lede">
              One table decides what each mode advertises and what it stops to
              ask about, so the picker and the check enforcing it cannot drift.
              A subagent inherits the mode and cannot exceed it. Of Emma's 24
              tools, seven ever ask.
            </p>
          </div>

          <div className="rows">
            {modes.map(([glyph, name, copy]) => (
              <div key={name}>
                <span>
                  <i
                    className="glyph"
                    style={{ fontStyle: "normal" }}
                    aria-hidden="true"
                  >
                    {glyph}
                  </i>
                  {name}
                </span>
                <p>{copy}</p>
              </div>
            ))}
          </div>

          <div className="cols-2" style={{ marginTop: 40 }}>
            <div>
              <h3>Auto mode is a model reading a call</h3>
              <p className="copy" style={{ marginTop: 12 }}>
                Auto reads the same column Ask does, but the question goes to
                your verifier model — arguments clamped, your standing rules on
                top. Three attempts, then it asks you anyway. No verifier model,
                no clearances: the mode fails toward the dialog.
              </p>
              <div className="chips" style={{ marginTop: 16 }}>
                {[
                  "browser",
                  "cli",
                  "computer",
                  "run_tool",
                  "install_mcp",
                  "workflow",
                  "autoresearch",
                ].map((t) => (
                  <span className="tag tag-accent" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="region">
              <div className="band band-head">
                <span className="label">Controlling this Mac</span>
                <span className="tag">no mode switches these off</span>
              </div>
              <div className="band">
                <dl className="kv">
                  <dt>Model steps per run</dt>
                  <dd>20</dd>
                  <dt>Actions per run</dt>
                  <dd>400</dd>
                  <dt>Wall clock</dt>
                  <dd>10 minutes</dd>
                  <dt>Gap between actions</dt>
                  <dd>40 ms</dd>
                  <dt>Characters in one type</dt>
                  <dd>4096</dd>
                  <dt>Banner</dt>
                  <dd>above every app</dd>
                  <dt>Escape</dt>
                  <dd>global, for the life of the run</dd>
                </dl>
              </div>
              <div className="band">
                <p className="copy">
                  <b>computer</b> is an ordinary tool, so the mode picker
                  decides it — no separate "control this Mac" flow. Screenshots
                  stay in Emma's process; every action is a line in the log and
                  a span in the trace.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section shell" id="surfaces">
          <div className="head head-split">
            <div>
              <p className="eyebrow">The notch</p>
              <h2>Emma, anywhere, without leaving the app you are in.</h2>
            </div>
            <p className="lede">
              Double-tap <b>left Option</b> and Quick Ask opens on the real
              camera housing — measured per display, with a calibrated virtual
              notch for monitors without one. Transcript, composer, both pickers
              and live tok/s, over whatever you were doing.
            </p>
          </div>

          <Shot
            src="/shots/notch-island.png"
            alt="Quick Ask open at the notch, wrapping the camera housing: a draft in the composer, the mode and model chips along the foot"
            title="Quick Ask"
            caption="One island, not a stack of panels · Escape leaves · an unsent draft survives"
          />

          <div className="cols-2" style={{ marginTop: 28 }}>
            <Shot
              src="/shots/notch-radial.png"
              alt="The radial command ring orbiting the cursor with six labelled orbs"
              title="The ring"
              caption="Up to eight orbs at the cursor · main validates every command against a fixed catalog"
            />
            <div className="stack">
              <h3>The idle sliver</h3>
              <p className="copy">
                Closed, a transparent hotspot builds itself over the housing as
                the cursor nears — click-through until the cursor is inside, so
                the menu bar keeps working.
              </p>
              <h3>Quick actions and orbs</h3>
              <p className="copy">
                Three saved actions on ⌘1–⌘3, hung under the island as orbs when
                you sweep down through the notch. Capture the screen, draw on
                the wallpaper, keep the page, open the workspace — from a ring
                the renderer cannot add to.
              </p>
              <h3>Tear it off</h3>
              <p className="copy">
                Dragged off the housing, Quick Ask becomes a 44px chip parked
                where you left it — always whole and inside the work area. Click
                it and the same island opens beside it.
              </p>
            </div>
          </div>

          <div style={{ marginTop: 28 }}>
            <Shot
              src="/shots/settings-quick-actions.png"
              alt="Settings, quick actions: three labelled prompts bound to Command-1, 2 and 3, with the cursor orb catalog beneath"
              title="Quick actions"
              caption="A label and a prompt each · run as one turn in a fresh thread"
            />
          </div>

          <div className="cards" style={{ marginTop: 40 }}>
            {surfaces.map((s) => (
              <article key={s.label}>
                <span className="label">{s.label}</span>
                <h3>{s.title}</h3>
                <p>{s.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section shell" id="knowledge">
          <div className="cols-2">
            <div>
              <p className="eyebrow">Knowledge</p>
              <h2 style={{ marginTop: 16 }}>Notes you can walk away with.</h2>
              <p className="lede" style={{ marginTop: 20 }}>
                A turn is not a memory. <b>keep</b> is the one way anything
                reaches your vault: one Markdown note — title, kind, date,
                source, application, tags — in the folder you picked. The folder{" "}
                <i>is</i> the store. No mirror, no database.
              </p>
              <dl className="kv region" style={{ padding: 16, marginTop: 24 }}>
                <dt>Store</dt>
                <dd>
                  <span className="brandcell">
                    <img className="mark" src="/brands/obsidian.svg" alt="" />
                    Obsidian vault or plain folder
                  </span>
                </dd>
                <dt>Kinds</dt>
                <dd>page · note · selection · screenshot</dd>
                <dt>Note ceiling</dt>
                <dd>256 KiB</dd>
                <dt>Attachment ceiling</dt>
                <dd>8 MiB</dd>
                <dt>Path check</dt>
                <dd>inside the folder, before any write</dd>
              </dl>
            </div>
            <Shot
              src="/shots/knowledge-base.png"
              alt="The knowledge base: saved notes as rows, each with its kind, when it was saved, its tags, where it came from and the Markdown file it became"
              title="The knowledge base"
              caption="Every row is one Markdown file in your own vault"
            />
          </div>
        </section>

        <section className="section shell" id="jobs">
          <div className="head head-split">
            <div>
              <p className="eyebrow">Work the clock runs</p>
              <h2>Scheduled graphs, and experiments that judge themselves.</h2>
            </div>
            <p className="lede">
              One validated trigger — five-field UTC cron, manual, after another
              job, or an app event — and a graph of three node kinds passing{" "}
              <b>{"{{name}}"}</b> variables. It opens a normal thread under the
              mode it was saved with.
            </p>
          </div>

          <div className="cols-2">
            <Shot
              src="/shots/scheduled-jobs.png"
              alt="The scheduled view: five live tasks down the left, one open as a graph — an agent step, a branch, two alternative agents, and a step that files the result — with its daily trigger in the corner"
              title="Scheduled tasks"
              caption="Trigger · graph · variables passed between steps · every run opens its own thread"
            />
            <div>
              <div className="region">
                <div className="band band-head">
                  <span className="label">Autoresearch</span>
                  <span className="tag tag-accent">metric locked for life</span>
                </div>
                <div className="band">
                  <p className="copy">
                    A long loop against a git project: the agent proposes a
                    change, Emma runs your eval, reads the metric, keeps or
                    reverts the commit — until a budget stops it.
                  </p>
                </div>
                <div className="band">
                  <dl className="kv">
                    <dt>Metric name · kind · direction</dt>
                    <dd>immutable</dd>
                    <dt>Eval ceiling</dt>
                    <dd>15 minutes</dd>
                    <dt>Budgets</dt>
                    <dd>time · tokens · spend</dd>
                    <dt>Every iteration</dt>
                    <dd>appended to results.tsv</dd>
                  </dl>
                </div>
              </div>
              <p className="copy" style={{ marginTop: 20 }}>
                The record is a TSV in the project itself. Emma's Rust core
                stores the job and never runs one — the loop is in the app
                process, where the budget is checked against real token counts.
              </p>
            </div>
          </div>
        </section>

        <section className="section shell" id="agent">
          <div className="cols-2">
            <div>
              <p className="eyebrow">Self-improvement</p>
              <h2 style={{ marginTop: 16 }}>Emma's page about Emma.</h2>
              <p className="lede" style={{ marginTop: 20 }}>
                She reads the traces her finished turns left, names the friction
                that repeats, and drafts one change. Then she tries to prove it
                helped — a replay bench of your saved cases, both arms back to
                back, at a case count declared before the run.
              </p>
              <div className="rows" style={{ marginTop: 24 }}>
                <div>
                  <span>Levers</span>
                  <p>
                    Two, and only two: the standing instructions every turn
                    carries, and the rules the auto verifier reviews a call
                    against.
                  </p>
                </div>
                <div>
                  <span>Evidence</span>
                  <p>
                    Four numbers off each stored trace, the same ones the
                    timeline draws. A change that cannot show a difference is
                    not kept.
                  </p>
                </div>
              </div>
            </div>
            <Shot
              src="/shots/agent-dashboard.png"
              alt="The agent page: repeating patterns read out of real runs — a tool that keeps failing, a command the verifier keeps blocking — each with dated evidence, above the changes Emma kept or reverted"
              title="Where runs get stuck"
              caption="Friction named from your own runs, not from a benchmark"
            />
          </div>
        </section>

        <section className="section shell" id="tools">
          <div className="head head-split">
            <div>
              <p className="eyebrow">The catalog</p>
              <h2>Twenty-four of Emma's own. The shell is the harness's.</h2>
            </div>
            <p className="lede">
              Emma ships no <b>bash</b> of her own. Files, search, shell,
              language-server queries, skills, MCP and subagents belong to the
              harness, gated over one permission channel. Emma's tools are
              appended to that registry natively.
            </p>
          </div>

          <div className="tools">
            {tools.map(([name, gate]) => (
              <div key={name} data-gate={gate}>
                <span>{name}</span>
                <i>{gate}</i>
              </div>
            ))}
          </div>

          <div className="cols" style={{ marginTop: 32 }}>
            <div>
              <h3>Emma writes her own</h3>
              <p className="copy">
                <b>write_skill</b> records a lesson, <b>write_tool</b> writes a
                script callable by name, <b>install_mcp</b> adds a server, and{" "}
                <b>write_plugin</b> packages skills in the Codex format.
                Anything installed mid-turn is live on the next turn.
              </p>
            </div>
            <div>
              <h3>Artifacts can become the app</h3>
              <p className="copy">
                A code artifact exporting <b>(api) ={">"} Component</b> and
                claiming <b>navbar</b>, <b>chat</b>, <b>notch</b> or{" "}
                <b>context</b> replaces that region live, on the built-in's own
                props. The built-in returns the moment it throws.
              </p>
            </div>
            <div>
              <h3>Everything leaves a record</h3>
              <p className="copy">
                Every call is a span in the thread's durable trace — readable in
                the inspector, or by the agent with <b>read_trace</b>. The whole
                thread exports as a folder of CSVs.
              </p>
            </div>
          </div>

          <div className="region" style={{ marginTop: 32 }}>
            <div className="band band-head">
              <span className="label">The same agent, headless</span>
              <span className="tag">gated on the tty</span>
            </div>
            <div className="band code">
              {`$ `}
              <b>emma-cli ask "explain this repository"</b>
              {`
$ `}
              <b>emma-cli</b>
              {`                      a REPL in the current directory
$ `}
              <b>emma-cli session resume last</b>
            </div>
          </div>
        </section>

        <section className="section shell cta">
          <p className="eyebrow">
            <span className="dot" /> a quieter kind of power
          </p>
          <h2>Do the work. Keep what mattered.</h2>
          <p className="lede">
            One loop, every surface. Four modes you can see. Markdown you own,
            in a folder you picked, readable long after Emma is closed.
          </p>
          <div className="actions">
            <a className="btn btn-solid" href="#harness">
              Start at the harness ↑
            </a>
            <a className="btn" href="#tools">
              Read the catalog
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div className="shell foot">
          <a className="brand" href="#top">
            <Mark size={20} />
            <span>Emma</span>
          </a>
          <nav aria-label="Footer">
            <a href="#harness">Harness</a>
            <a href="#delegation">Delegation</a>
            <a href="#plan">Plan</a>
            <a href="#models">Models</a>
            <a href="#control">Control</a>
            <a href="#surfaces">Surfaces</a>
            <a href="#knowledge">Knowledge</a>
            <a href="#jobs">Jobs</a>
            <a href="#tools">Tools</a>
          </nav>
          <p>© {new Date().getFullYear()} Emma · macOS · Apple silicon</p>
        </div>
      </footer>
    </>
  );
}

export default App;

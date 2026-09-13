import { useEffect, useRef, useState } from "react";
import "./explain.css";

// Mirrors the app's plan rail: waves top to bottom, numbered square nodes,
// a band on the current wave, then the active step's task list. One plan per
// loop of the animation; `fail` is the step the toggle breaks.
type Step = {
  name: string;
  deps: number[];
  wave: number;
  x: number;
  tasks: string[];
};
type Plan = { name: string; fail: number; caption: string; steps: Step[] };
const plans: Plan[] = [
  {
    name: "Ship a parser",
    fail: 2,
    caption:
      "Implement, test and document together; review, then return the result.",
    steps: [
      {
        name: "Read the project",
        deps: [],
        wave: 0,
        x: 50,
        tasks: [
          "Read the README and package manifest",
          "List the entry points",
        ],
      },
      {
        name: "Implement",
        deps: [0],
        wave: 1,
        x: 22,
        tasks: [
          "Add the parser",
          "Wire it into the CLI",
          "Handle the empty-input case",
        ],
      },
      {
        name: "Write tests",
        deps: [0],
        wave: 1,
        x: 50,
        tasks: ["Cover the happy path", "Cover malformed input"],
      },
      {
        name: "Update docs",
        deps: [0],
        wave: 1,
        x: 78,
        tasks: ["Note the new flag", "Add an example"],
      },
      {
        name: "Review together",
        deps: [1, 2],
        wave: 2,
        x: 32,
        tasks: ["Diff both branches", "Run the full suite"],
      },
      {
        name: "Preview the docs",
        deps: [3],
        wave: 2,
        x: 78,
        tasks: ["Build the site", "Check the links"],
      },
      {
        name: "Return the result",
        deps: [4, 5],
        wave: 3,
        x: 50,
        tasks: ["Summarize what changed"],
      },
    ],
  },
  {
    name: "Fix a bug",
    fail: 2,
    caption: "Bisect and read the test in parallel; fix once both are in.",
    steps: [
      {
        name: "Reproduce the crash",
        deps: [],
        wave: 0,
        x: 50,
        tasks: ["Run the failing command", "Save the stack trace"],
      },
      {
        name: "Bisect the history",
        deps: [0],
        wave: 1,
        x: 28,
        tasks: ["Find the last good commit", "Name the culprit"],
      },
      {
        name: "Read the failing test",
        deps: [0],
        wave: 1,
        x: 72,
        tasks: ["Trace the assertion", "Check the fixture"],
      },
      {
        name: "Write the fix",
        deps: [1, 2],
        wave: 2,
        x: 50,
        tasks: ["Patch the culprit", "Add a regression test"],
      },
      {
        name: "Verify and report",
        deps: [3],
        wave: 3,
        x: 50,
        tasks: ["Run the suite", "Summarize the cause"],
      },
    ],
  },
  {
    name: "Refactor a module",
    fail: 3,
    caption:
      "Callers, tests and docs migrate side by side; the old module goes last.",
    steps: [
      {
        name: "Map the call sites",
        deps: [],
        wave: 0,
        x: 50,
        tasks: ["Grep every import", "Note the odd ones"],
      },
      {
        name: "Extract the interface",
        deps: [0],
        wave: 1,
        x: 50,
        tasks: ["Define the new API", "Keep the old one working"],
      },
      {
        name: "Migrate callers",
        deps: [1],
        wave: 2,
        x: 22,
        tasks: ["Switch each import", "Delete the shims"],
      },
      {
        name: "Update tests",
        deps: [1],
        wave: 2,
        x: 50,
        tasks: ["Point tests at the new API", "Drop the dead ones"],
      },
      {
        name: "Update docs",
        deps: [1],
        wave: 2,
        x: 78,
        tasks: ["Rewrite the examples"],
      },
      {
        name: "Remove the old module",
        deps: [2, 3, 4],
        wave: 3,
        x: 50,
        tasks: ["Delete it", "Run the suite"],
      },
    ],
  },
  {
    name: "Cut a release",
    fail: 3,
    caption:
      "Two roots: the build and the notes run apart until the tag needs both.",
    steps: [
      {
        name: "Bump the version",
        deps: [],
        wave: 0,
        x: 25,
        tasks: ["Edit the manifest", "Update the lockfile"],
      },
      {
        name: "Draft the changelog",
        deps: [],
        wave: 0,
        x: 75,
        tasks: ["Collect merged PRs", "Group by area"],
      },
      {
        name: "Build installers",
        deps: [0],
        wave: 1,
        x: 25,
        tasks: ["Build for Mac", "Build for Windows"],
      },
      {
        name: "Run the smoke tests",
        deps: [0],
        wave: 1,
        x: 55,
        tasks: ["Install and launch", "Open a workspace"],
      },
      {
        name: "Sign and notarize",
        deps: [2],
        wave: 2,
        x: 25,
        tasks: ["Sign both builds", "Wait for notarization"],
      },
      {
        name: "Publish the notes",
        deps: [1, 3],
        wave: 2,
        x: 75,
        tasks: ["Add the test results", "Proofread"],
      },
      {
        name: "Tag and announce",
        deps: [4, 5],
        wave: 3,
        x: 50,
        tasks: ["Push the tag", "Post the announcement"],
      },
    ],
  },
  {
    name: "Answer a question",
    fail: 5,
    caption:
      "Three searches fan in; drafting and fact-checking split before the reply.",
    steps: [
      {
        name: "Search the docs",
        deps: [],
        wave: 0,
        x: 22,
        tasks: ["Find the guide"],
      },
      {
        name: "Search the code",
        deps: [],
        wave: 0,
        x: 50,
        tasks: ["Find the handler"],
      },
      {
        name: "Ask the advisor",
        deps: [],
        wave: 0,
        x: 78,
        tasks: ["Send the question"],
      },
      {
        name: "Compare the findings",
        deps: [0, 1, 2],
        wave: 1,
        x: 50,
        tasks: ["Line up the three answers", "Flag disagreements"],
      },
      {
        name: "Draft the answer",
        deps: [3],
        wave: 2,
        x: 30,
        tasks: ["Write the short version", "Add the code path"],
      },
      {
        name: "Check the claims",
        deps: [3],
        wave: 2,
        x: 70,
        tasks: ["Run the snippet", "Re-read the guide"],
      },
      { name: "Reply", deps: [4, 5], wave: 3, x: 50, tasks: ["Send it"] },
    ],
  },
];
const PLAN_ROW = 44;
const PLAN_PAD = 18;
type StepState = "waiting" | "ready" | "running" | "done" | "failed";

function planStates(plan: Plan, tick: number, failed: boolean): StepState[] {
  const states: StepState[] = [];
  for (const [index, step] of plan.steps.entries()) {
    if (failed && index === plan.fail && tick >= 4) {
      states.push("failed");
    } else if (step.deps.some((id) => states[id] !== "done")) {
      states.push("waiting");
    } else {
      const elapsed = tick - step.wave * 2;
      states.push(elapsed >= 2 ? "done" : elapsed === 1 ? "running" : "ready");
    }
  }
  return states;
}

// "steps 5 and 7"
const stepList = (ids: number[]) =>
  `step${ids.length === 1 ? "" : "s"} ${ids
    .map((id) => id + 1)
    .join(", ")
    .replace(/, (\d+)$/, " and $1")}`;

// How many of a step's tasks are ticked for a given state.
const ticked = (state: StepState, count: number) =>
  state === "done"
    ? count
    : state === "running" || state === "failed"
      ? Math.ceil(count / 2)
      : 0;

// Mirrors the app's council table: seats draft alone, take turns on the floor
// (mentions draw chords), then the chair writes up the answer. Seat 0 chairs.
type Seat = { name: string; brand: string; take: string };
type Turn = { seat: number; heard: number[]; text: string };
type Council = {
  question: string;
  seats: Seat[];
  turns: Turn[];
  verdict: string;
};
const councils: Council[] = [
  {
    question: "Stream or buffer the parser input?",
    seats: [
      {
        name: "Opus",
        brand: "claude.svg",
        take: "Stream; buffer only the header.",
      },
      { name: "GPT-5", brand: "openai.svg", take: "Buffer; inputs are small." },
      { name: "Gemini", brand: "gemini.png", take: "Stream, with a size cap." },
      { name: "Kimi", brand: "kimi.svg", take: "Buffer until measured." },
    ],
    turns: [
      {
        seat: 1,
        heard: [0, 2],
        text: "Opus, Gemini: streaming adds a state machine for inputs under 1 MB.",
      },
      {
        seat: 2,
        heard: [1],
        text: "GPT-5: a size cap keeps that machine small, and logs already pass 1 MB.",
      },
      {
        seat: 3,
        heard: [0],
        text: "Opus: agreed, if the header stays bounded.",
      },
      {
        seat: 0,
        heard: [1, 2, 3],
        text: "Stream the body, buffer a 64 KB header, cap the input. Objections?",
      },
    ],
    verdict:
      "Stream the body, buffer a bounded 64 KB header and cap input size. Buffering everything fell once logs over 1 MB came up.",
  },
  {
    question: "Which database for the new service?",
    seats: [
      { name: "GPT-5", brand: "openai.svg", take: "Postgres; boring wins." },
      { name: "Opus", brand: "claude.svg", take: "Postgres, pgvector later." },
      {
        name: "DeepSeek",
        brand: "deepseek.svg",
        take: "SQLite until it hurts.",
      },
    ],
    turns: [
      {
        seat: 2,
        heard: [0, 1],
        text: "GPT-5, Opus: one service, one box; SQLite has no ops.",
      },
      {
        seat: 1,
        heard: [2],
        text: "DeepSeek: the second replica is when it hurts, and that is month one.",
      },
      {
        seat: 0,
        heard: [1, 2],
        text: "Opus, DeepSeek: Postgres from day one, SQLite for the tests. Objections?",
      },
    ],
    verdict:
      "Postgres from the start, SQLite only in the test suite. Zero ops lost to the replica already planned for month one.",
  },
  {
    question: "Monorepo, or split the packages?",
    seats: [
      {
        name: "Gemini",
        brand: "gemini.png",
        take: "Monorepo; one CI, one version.",
      },
      { name: "Qwen", brand: "qwen.svg", take: "Split; the app ships weekly." },
      {
        name: "Opus",
        brand: "claude.svg",
        take: "Monorepo, per-package releases.",
      },
      {
        name: "GPT-5",
        brand: "openai.svg",
        take: "Split the SDK, keep the rest.",
      },
      { name: "Grok", brand: "xai.svg", take: "Monorepo, until 50 packages." },
    ],
    turns: [
      {
        seat: 1,
        heard: [0],
        text: "Gemini: one CI means the SDK waits on the app's flaky tests.",
      },
      {
        seat: 2,
        heard: [1, 3],
        text: "Qwen, GPT-5: affected-only CI fixes that without a second repo.",
      },
      {
        seat: 3,
        heard: [2],
        text: "Opus: fine, if the SDK gets its own release tag.",
      },
      {
        seat: 0,
        heard: [1, 2, 3, 4],
        text: "One repo, affected-only CI, per-package tags. Objections?",
      },
    ],
    verdict:
      "One repo with affected-only CI and per-package release tags. Splitting the SDK was dropped once tags covered the weekly cadence.",
  },
  {
    question: "Rewrite the CLI in Rust?",
    seats: [
      {
        name: "Opus",
        brand: "claude.svg",
        take: "No; profile the hot path first.",
      },
      {
        name: "Mistral",
        brand: "mistralai.svg",
        take: "Yes; startup time is the product.",
      },
      { name: "Kimi", brand: "kimi.svg", take: "Port the parser only." },
      {
        name: "Gemini",
        brand: "gemini.png",
        take: "No; the team writes TypeScript.",
      },
    ],
    turns: [
      {
        seat: 1,
        heard: [0],
        text: "Opus: 400 ms of startup is not one hot path, it is the runtime.",
      },
      {
        seat: 2,
        heard: [1, 3],
        text: "Mistral, Gemini: a Rust parser behind a native binding keeps the TypeScript team.",
      },
      {
        seat: 3,
        heard: [2],
        text: "Kimi: agreed, if it still ships as one binary.",
      },
      {
        seat: 0,
        heard: [1, 2, 3],
        text: "Port the parser, measure, decide the rest later. Objections?",
      },
    ],
    verdict:
      "Port the parser to Rust behind a native binding, measure startup, then decide on the rest. A full rewrite lost to the team's TypeScript depth.",
  },
  {
    question: "Retry failed jobs, or dead-letter them?",
    seats: [
      {
        name: "Kimi",
        brand: "kimi.svg",
        take: "Retry three times, then dead-letter.",
      },
      {
        name: "Opus",
        brand: "claude.svg",
        take: "Dead-letter at once; retries hide bugs.",
      },
      {
        name: "GPT-5",
        brand: "openai.svg",
        take: "Retry with backoff and a cap.",
      },
    ],
    turns: [
      {
        seat: 1,
        heard: [0, 2],
        text: "Kimi, GPT-5: a retry on a bad payload is three failures instead of one.",
      },
      {
        seat: 2,
        heard: [1],
        text: "Opus: only retry errors marked transient; the rest go straight to the queue.",
      },
      {
        seat: 0,
        heard: [1, 2],
        text: "Transient errors retry with backoff, the rest dead-letter now. Objections?",
      },
    ],
    verdict:
      "Retry only errors marked transient, with backoff and a cap of three; everything else dead-letters immediately.",
  },
];
type CouncilPhase = "drafting" | "discussing" | "deciding" | "done";
const COUNCIL_LINES: Record<CouncilPhase, string> = {
  drafting: "Drafting alone",
  discussing: "Talking it through",
  deciding: "Chair writing it up",
  done: "Landed",
};
const RING = 300;
const seatPoint = (index: number, count: number, radius: number) => {
  const angle = ((index * 360) / count - 90) * (Math.PI / 180);
  return {
    x: RING / 2 + Math.cos(angle) * radius,
    y: RING / 2 + Math.sin(angle) * radius,
  };
};

function council({ turns }: Council, frame: number) {
  const phase: CouncilPhase =
    frame < 2
      ? "drafting"
      : frame < 6
        ? "discussing"
        : frame === 6
          ? "deciding"
          : "done";
  const spoken =
    phase === "drafting"
      ? []
      : turns.slice(0, Math.min(turns.length, frame - 1));
  const latest = spoken[spoken.length - 1];
  const floor =
    phase === "discussing" ? latest.seat : phase === "deciding" ? 0 : -1;
  const heard = phase === "discussing" ? latest.heard : [];
  return { phase, drafted: frame >= 1, spoken, latest, floor, heard };
}

const spans = [
  {
    name: "Model · understand",
    kind: "model",
    start: 0,
    end: 4,
    detail: "Interprets the task and chooses what to inspect.",
  },
  {
    name: "Tool · read files",
    kind: "tool",
    start: 4,
    end: 6,
    detail: "Reads project files.",
  },
  {
    name: "Model · delegate",
    kind: "model",
    start: 6,
    end: 8,
    detail: "Assigns independent work to subagents.",
  },
  {
    name: "Subagent · implement",
    kind: "agent",
    start: 8,
    end: 20,
    detail: "Implements while another subagent reviews.",
  },
  {
    name: "Subagent · review",
    kind: "agent",
    start: 8,
    end: 17,
    detail: "Reviews in parallel with implementation.",
  },
  {
    name: "CLI · run checks",
    kind: "cli",
    start: 11,
    end: 18,
    detail: "Runs checks within the implementation task.",
  },
  {
    name: "Model · respond",
    kind: "model",
    start: 20,
    end: 24,
    detail: "Combines the results into an answer.",
  },
];
const segments = [
  { name: "Instructions + tools", before: 12, after: 12, key: "instructions" },
  { name: "Recent messages", before: 16, after: 16, key: "messages" },
  { name: "Older history + results", before: 48, after: 0, key: "history" },
  { name: "Handoff summary", before: 0, after: 8, key: "summary" },
];

const LOOP = 11;
const loopFrame = (tick: number) => Math.min(tick % LOOP, 8);
const loopIndex = (tick: number) => Math.floor(tick / LOOP) % plans.length;

// Run: node scripts/check-explain.mjs
// eslint-disable-next-line react-refresh/only-export-components -- colocated check keeps this illustrative model in one file.
export function verifyExplainModel() {
  if (plans.length !== councils.length)
    throw new Error("Plans and councils must pair up per loop");
  for (const plan of plans) {
    if (!plan.steps[plan.fail])
      throw new Error(`${plan.name} fails a step it lacks`);
    for (const failed of [false, true]) {
      for (let tick = 0; tick <= 8; tick++) {
        const states = planStates(plan, tick, failed);
        for (const [index, step] of plan.steps.entries()) {
          if (step.deps.some((id) => id >= index))
            throw new Error(`${plan.name} step ${index + 1} depends forward`);
          if (
            ["ready", "running", "done"].includes(states[index]) &&
            step.deps.some((id) => states[id] !== "done")
          ) {
            throw new Error(
              `${plan.name} step ${index + 1} advanced before its dependencies`,
            );
          }
        }
      }
    }
    if (!planStates(plan, 8, true).includes("waiting"))
      throw new Error(`${plan.name} failure holds nothing`);
    if (!planStates(plan, 8, false).every((state) => state === "done"))
      throw new Error(`${plan.name} did not finish`);
  }
  if (
    planStates(plans[0], 4, true).join() !==
    "done,done,failed,done,waiting,ready,waiting"
  )
    throw new Error("Failed branch did not hold downstream work");
  if (stepList([4, 6]) !== "steps 5 and 7" || stepList([2]) !== "step 3")
    throw new Error("Step list reads wrong");
  if (loopIndex(LOOP * plans.length) !== 0 || loopFrame(LOOP - 1) !== 8)
    throw new Error("Loop does not wrap");
  if (
    segments.reduce((total, segment) => total + segment.before, 0) !== 76 ||
    segments.reduce((total, segment) => total + segment.after, 0) !== 36
  )
    throw new Error("Context totals are inconsistent");
  for (const table of councils) {
    const { seats, turns } = table;
    if (seats.length < 2 || seats.length > 8)
      throw new Error("A council seats 2 to 8 models");
    for (const turn of turns) {
      if (
        !seats[turn.seat] ||
        turn.heard.includes(turn.seat) ||
        turn.heard.some((id) => !seats[id])
      )
        throw new Error("A council turn addresses an empty seat");
    }
    const phases = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(
      (frame) => council(table, frame).phase,
    );
    if (
      phases.join() !==
      "drafting,drafting,discussing,discussing,discussing,discussing,deciding,done,done"
    )
      throw new Error("Council phases are out of order");
    if (council(table, 8).spoken.length !== turns.length)
      throw new Error("Council skipped a turn");
  }
  if (
    spans.some(
      (span) => span.start < 0 || span.end <= span.start || span.end > 24,
    )
  )
    throw new Error("Invalid timeline span");
}

export default function Explain({
  onPlayingChange,
}: { onPlayingChange?: (playing: boolean) => void } = {}) {
  const root = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tick, setTick] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const [compact, setCompact] = useState<boolean | null>(null);
  const [selected, setSelected] = useState(3);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine)",
    );
    const followPreference = () =>
      setPlaying(desktop.matches && !motion.matches);
    followPreference();
    motion.addEventListener("change", followPreference);
    desktop.addEventListener("change", followPreference);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    if (root.current) observer.observe(root.current);
    return () => {
      motion.removeEventListener("change", followPreference);
      desktop.removeEventListener("change", followPreference);
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!playing || !visible) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") setTick((value) => value + 1);
    }, 1300);
    return () => window.clearInterval(timer);
  }, [playing, visible]);

  useEffect(() => {
    onPlayingChange?.(playing);
  }, [playing, onPlayingChange]);

  const frame = loopFrame(tick);
  const plan = plans[loopIndex(tick)];
  const { steps } = plan;
  const table = councils[loopIndex(tick)];
  const { seats } = table;
  const states = planStates(plan, frame, blocked);
  const live = states.findIndex(
    (state) => state === "running" || state === "failed",
  );
  const pending = states.findIndex((state) => state !== "done");
  const activeIndex =
    live >= 0 ? live : pending >= 0 ? pending : steps.length - 1;
  const active = steps[activeIndex];
  const done = states.filter((state) => state === "done").length;
  const allTasks = steps.reduce((total, step) => total + step.tasks.length, 0);
  const doneTasks = steps.reduce(
    (total, step, index) => total + ticked(states[index], step.tasks.length),
    0,
  );
  const compacted = compact ?? frame >= 5;
  const total = compacted ? 36 : 76;
  const elapsed = Math.min(24, frame * 3);
  const activeSpan = spans[selected];
  const said = council(table, frame);
  const pauseAndStep = () => {
    setPlaying(false);
    // Ticks 9 and 10 hold the finished frame; skip them to the next example.
    setTick((value) =>
      value % LOOP >= 8 ? value - (value % LOOP) + LOOP : value + 1,
    );
  };
  const nextExample = () => setTick((value) => value - (value % LOOP) + LOOP);

  return (
    <section
      id="explain"
      ref={root}
      className="explain fg-section"
      data-playing={playing && visible}
      aria-labelledby="explain-title"
    >
      <div className="explain-heading">
        <div>
          <h2 id="explain-title">How it works</h2>
        </div>
        <div
          className="explain-controls"
          role="group"
          aria-label="Animation controls"
        >
          <button
            type="button"
            aria-label={
              playing ? "Pause all animations" : "Play all animations"
            }
            onClick={() => {
              setPlaying((value) => !value);
              setCompact(null);
            }}
          >
            {playing ? "Pause all" : "Play all"}
          </button>
          <button type="button" onClick={pauseAndStep}>
            Step
          </button>
          <button type="button" onClick={nextExample}>
            Next
          </button>
          <button
            type="button"
            onClick={() => {
              setTick(0);
              setCompact(null);
            }}
          >
            Replay
          </button>
        </div>
      </div>
      <p className="explain-disclaimer">
        Interactive examples, not live runs or benchmarks.
      </p>

      <div className="explain-grid">
        <article
          className="explain-card explain-card-council"
          aria-labelledby="explain-council-title"
        >
          <div className="explain-card-heading">
            <h3 id="explain-council-title">Council</h3>
            <p>
              Seats draft alone, then talk in turn until the chair writes up the
              answer.
            </p>
          </div>
          <div className="explain-toolbar">
            <span
              className={`explain-readout ${said.phase === "done" ? "" : "live"}`}
              aria-live={playing ? "off" : "polite"}
            >
              {COUNCIL_LINES[said.phase]}
            </span>
            <span className="explain-time">
              {seats.length} seats · {said.spoken.length} turns
            </span>
          </div>
          <div className="explain-rail explain-council">
            <div
              className="council-ring"
              role="img"
              aria-label={`Example council, ${COUNCIL_LINES[said.phase].toLowerCase()}: ${seats.map((seat, index) => `${seat.name}${index === 0 ? " (chair)" : ""}${said.drafted ? `: ${seat.take}` : ""}`).join("; ")}`}
            >
              <svg
                className="council-chords"
                viewBox={`0 0 ${RING} ${RING}`}
                aria-hidden="true"
              >
                {said.heard.map((id) => {
                  const from = seatPoint(
                    said.floor,
                    seats.length,
                    RING / 2 - 60,
                  );
                  const to = seatPoint(id, seats.length, RING / 2 - 60);
                  return (
                    <line
                      key={id}
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                    />
                  );
                })}
              </svg>
              {seats.map((seat, index) => {
                const point = seatPoint(index, seats.length, RING / 2 - 40);
                const role =
                  said.floor === index
                    ? "floor"
                    : said.heard.includes(index)
                      ? "heard"
                      : "";
                return (
                  <span
                    key={seat.name}
                    className={`council-seat ${role}`}
                    style={{
                      left: `${(point.x / RING) * 100}%`,
                      top: `${(point.y / RING) * 100}%`,
                    }}
                  >
                    <b>
                      <img
                        className="mark"
                        src={`/brands/${seat.brand}`}
                        alt=""
                      />
                      {seat.name}
                      {index === 0 && <em>chair</em>}
                    </b>
                    <small>{said.drafted ? seat.take : "drafting…"}</small>
                  </span>
                );
              })}
              <span className="council-core">
                {said.floor >= 0
                  ? `${seats[said.floor].name} has the floor`
                  : COUNCIL_LINES[said.phase]}
              </span>
            </div>
            <div className="plan-tasks council-floor">
              <p className="plan-step-title">
                <span>{table.question}</span>
              </p>
              {said.spoken.map((turn, index) => (
                <p
                  key={turn.text}
                  className={`council-line ${index === said.spoken.length - 1 && said.phase === "discussing" ? "latest" : ""}`}
                >
                  <b>
                    <img
                      className="mark"
                      src={`/brands/${seats[turn.seat].brand}`}
                      alt=""
                    />
                    {seats[turn.seat].name}
                  </b>
                  <span>{turn.text}</span>
                </p>
              ))}
              {said.phase === "drafting" && (
                <p className="plan-result">
                  Each seat answers alone, no tools, before anyone hears the
                  others.
                </p>
              )}
              {said.phase === "deciding" && (
                <p className="plan-live">
                  <i aria-hidden="true" />
                  chair writing the answer
                </p>
              )}
              {said.phase === "done" && (
                <p className="council-verdict">
                  <b>The council’s answer</b>
                  <span>{table.verdict}</span>
                </p>
              )}
            </div>
          </div>
          <p className="explain-caption">
            Every seat bills itself; {seats.length} seats make{" "}
            {seats.length * 3 + 1} model calls. Only the answer lands in the
            thread.
          </p>
        </article>

        <article
          className="explain-card explain-card-plan"
          aria-labelledby="explain-plan-title"
        >
          <div className="explain-card-heading">
            <h3 id="explain-plan-title">Plans</h3>
            <p>
              Steps run in parallel or in sequence; each waits only on what it
              depends on.
            </p>
          </div>
          <div className="explain-toolbar">
            <span
              className="explain-readout"
              aria-live={playing ? "off" : "polite"}
            >
              {states.every((state) => state === "done")
                ? "Plan complete"
                : states.includes("failed")
                  ? "Step failed · downstream held"
                  : `Wave ${Math.min(4, Math.floor(frame / 2) + 1)} of 4`}
            </span>
            <label className="explain-toggle">
              <input
                type="checkbox"
                checked={blocked}
                onChange={(event) => {
                  setBlocked(event.target.checked);
                  setTick((value) => value - (value % LOOP) + 4);
                  setPlaying(false);
                }}
              />
              Fail step {plan.fail + 1}
            </label>
          </div>
          <div className="explain-rail">
            <div className="explain-plan-map">
              <div className="plan-head">
                <strong>
                  {plan.name} · {done} of {steps.length}
                </strong>
                <em>
                  {doneTasks}/{allTasks}
                </em>
              </div>
              <div
                className="plan-graph"
                style={{ height: PLAN_PAD * 2 + PLAN_ROW * 3 }}
                role="img"
                aria-label={`Example plan: ${steps.map((step, index) => `${index + 1} ${step.name}: ${states[index]}`).join("; ")}`}
              >
                <div
                  className="plan-band"
                  style={{
                    top: PLAN_PAD + active.wave * PLAN_ROW - PLAN_ROW / 2,
                    height: PLAN_ROW,
                  }}
                />
                <svg className="plan-edges" aria-hidden="true">
                  {steps.flatMap((step, index) =>
                    step.deps.map((id) => (
                      <line
                        key={`${id}>${index}`}
                        className={
                          id === activeIndex || index === activeIndex
                            ? "lit"
                            : ""
                        }
                        x1={`${steps[id].x}%`}
                        y1={PLAN_PAD + steps[id].wave * PLAN_ROW}
                        x2={`${step.x}%`}
                        y2={PLAN_PAD + step.wave * PLAN_ROW}
                      />
                    )),
                  )}
                </svg>
                {steps.map((step, index) => (
                  <span
                    key={step.name}
                    className={`plan-node ${index === activeIndex ? "active" : ""}`}
                    data-status={states[index]}
                    title={`${step.name} — ${states[index]}`}
                    style={{
                      left: `${step.x}%`,
                      top: PLAN_PAD + step.wave * PLAN_ROW,
                    }}
                  >
                    {index + 1}
                  </span>
                ))}
              </div>
              <div className="plan-key">
                {(
                  [
                    "running",
                    "ready",
                    "waiting",
                    "done",
                    "failed",
                  ] as StepState[]
                )
                  .filter((name) => states.includes(name))
                  .map((name) => (
                    <span key={name} data-status={name}>
                      <i aria-hidden="true" />
                      {name}
                    </span>
                  ))}
              </div>
            </div>
            <div className="plan-tasks">
              <p className="plan-step-title">
                <b>{activeIndex + 1}</b>
                <span>{active.name}</span>
              </p>
              {states[activeIndex] === "running" && (
                <p className="plan-live">
                  <i aria-hidden="true" />
                  working on{" "}
                  {active.tasks[
                    ticked("running", active.tasks.length)
                  ]?.toLowerCase() ?? "the last task"}
                </p>
              )}
              {states[activeIndex] === "failed" && (
                <p className="plan-result">
                  Failed: {active.name.toLowerCase()} could not finish — later
                  steps wait on it.
                </p>
              )}
              <ol className="plan-list">
                {active.tasks.map((task, index) => {
                  const isDone =
                    index < ticked(states[activeIndex], active.tasks.length);
                  return (
                    <li key={task} className={isDone ? "done" : ""}>
                      <i aria-hidden="true">{isDone ? "▣" : "▢"}</i>
                      <span>{task}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
          <p className="explain-caption">
            {blocked
              ? `Step ${plan.fail + 1} failed, holding ${stepList(states.flatMap((state, index) => (state === "waiting" ? [index] : [])))}; the rest carry on.`
              : plan.caption}
          </p>
        </article>

        <article
          className="explain-card explain-card-context"
          aria-labelledby="explain-context-title"
        >
          <div className="explain-card-heading">
            <h3 id="explain-context-title">Context</h3>
            <p>
              Full end-to-end context observability, including where your tokens
              are being used.
            </p>
          </div>
          <div className="explain-toolbar">
            <span className="explain-readout">
              {compacted ? "After compaction" : "Before compaction"}
            </span>
            <button
              type="button"
              aria-pressed={compacted}
              onClick={() => {
                setCompact(!compacted);
                setPlaying(false);
              }}
            >
              {compacted ? "Show original" : "Compact"}
            </button>
          </div>
          <div className="explain-context-demo">
            <div className="explain-context-count">
              <strong>
                {total}
                <span>k</span>
              </strong>
              <span>
                of 100k tokens (example)
                <br />
                <b>{100 - total}k available</b>
              </span>
            </div>
            <div
              className="explain-context-bar"
              role="img"
              aria-label={`${total} thousand tokens used out of 100 thousand: ${segments.map((segment) => `${segment.name} ${compacted ? segment.after : segment.before} thousand`).join(", ")}`}
            >
              {segments.map((segment) => (
                <span
                  key={segment.key}
                  className={`explain-segment explain-segment-${segment.key}`}
                  style={{
                    width: `${compacted ? segment.after : segment.before}%`,
                  }}
                />
              ))}
            </div>
            <div className="explain-context-scale">
              <span>0</span>
              <span>100k</span>
            </div>
            <dl className="explain-segments">
              {segments.map((segment) => (
                <div key={segment.key}>
                  <dt>
                    <i className={`explain-segment-${segment.key}`} />
                    {segment.name}
                  </dt>
                  <dd>{compacted ? segment.after : segment.before}k</dd>
                </div>
              ))}
            </dl>
            <div className="explain-summary">
              <span>{compacted ? "Handoff summary" : "Older context"}</span>
              <p>
                {compacted
                  ? "Keeps objectives, decisions and next steps. Details may need rereading."
                  : "Summarize 48k of earlier messages and results into an 8k handoff."}
              </p>
            </div>
          </div>
          <p className="explain-caption">
            Summaries lose detail. Saved notes remain separate.
          </p>
        </article>

        <article
          className="explain-card explain-card-timeline"
          aria-labelledby="explain-trace-title"
        >
          <div className="explain-card-heading">
            <h3 id="explain-trace-title">Timeline</h3>
            <p>Select a span to inspect it.</p>
          </div>
          <div className="explain-toolbar">
            <span className="explain-readout">7 spans</span>
            <span className="explain-time">
              {elapsed.toFixed(0).padStart(2, "0")} / 24 s
            </span>
          </div>
          <div className="explain-waterfall">
            <div className="explain-axis">
              <span>0 s</span>
              <span>8 s</span>
              <span>16 s</span>
              <span>24 s</span>
            </div>
            <div className="explain-span-list">
              {spans.map((span, index) => (
                <button
                  key={span.name}
                  type="button"
                  className={`explain-span-row explain-span-${span.kind}`}
                  aria-pressed={selected === index}
                  onClick={() => setSelected(index)}
                  aria-description={`Starts at ${span.start}s`}
                >
                  <span className="explain-span-label">{span.name}</span>
                  <span className="explain-span-track">
                    <span
                      className="explain-span-bar"
                      style={{
                        left: `${(span.start / 24) * 100}%`,
                        width: `${((span.end - span.start) / 24) * 100}%`,
                      }}
                    >
                      <span
                        className="explain-span-progress"
                        style={{
                          width: `${Math.min(1, Math.max(0, (elapsed - span.start) / (span.end - span.start))) * 100}%`,
                        }}
                      />
                    </span>
                  </span>
                  <span className="explain-span-duration">
                    {span.end - span.start}s
                  </span>
                </button>
              ))}
            </div>
            <div className="explain-span-detail" aria-live="polite">
              <div>
                <strong>{activeSpan.name}</strong>
                <span>
                  {activeSpan.start}–{activeSpan.end}s ·{" "}
                  {activeSpan.end - activeSpan.start}s duration
                </span>
              </div>
              <p>{activeSpan.detail}</p>
            </div>
          </div>
          <p className="explain-caption">
            Spans overlap; durations don’t add up. Long traces may be shortened.
          </p>
        </article>
      </div>
    </section>
  );
}

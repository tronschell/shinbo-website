import { useEffect, useRef, useState } from "react";
import "./explain.css";

const steps = [
  { name: "Read the project", deps: [], wave: 0, x: 4, y: 56 },
  { name: "Implement", deps: [0], wave: 1, x: 160, y: 8 },
  { name: "Write tests", deps: [0], wave: 1, x: 160, y: 104 },
  { name: "Review together", deps: [1, 2], wave: 2, x: 316, y: 56 },
  { name: "Return the result", deps: [3], wave: 3, x: 472, y: 56 },
];
const NODE_W = 130;
const NODE_H = 38;
type StepState = "waiting" | "ready" | "running" | "done" | "blocked";

function planStates(tick: number, blocked: boolean): StepState[] {
  const states: StepState[] = [];
  for (const [index, step] of steps.entries()) {
    if (
      (blocked && index === 2 && tick >= 4) ||
      step.deps.some((id) => states[id] === "blocked")
    ) {
      states.push("blocked");
    } else if (step.deps.some((id) => states[id] !== "done")) {
      states.push("waiting");
    } else {
      const elapsed = tick - step.wave * 2;
      states.push(elapsed >= 2 ? "done" : elapsed === 1 ? "running" : "ready");
    }
  }
  return states;
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

// Run: node scripts/check-explain.mjs
// eslint-disable-next-line react-refresh/only-export-components -- colocated check keeps this illustrative model in one file.
export function verifyExplainModel() {
  for (const blocked of [false, true]) {
    for (let tick = 0; tick <= 8; tick++) {
      const states = planStates(tick, blocked);
      for (const [index, step] of steps.entries()) {
        if (
          ["ready", "running", "done"].includes(states[index]) &&
          step.deps.some((id) => states[id] !== "done")
        ) {
          throw new Error(`Step ${index + 1} advanced before its dependencies`);
        }
      }
    }
  }
  if (planStates(4, true).join() !== "done,done,blocked,blocked,blocked")
    throw new Error("Blocked branch did not hold downstream work");
  if (!planStates(8, false).every((state) => state === "done"))
    throw new Error("Valid plan did not finish");
  if (
    segments.reduce((total, segment) => total + segment.before, 0) !== 76 ||
    segments.reduce((total, segment) => total + segment.after, 0) !== 36
  )
    throw new Error("Context totals are inconsistent");
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
      if (document.visibilityState === "visible")
        setTick((value) => (value + 1) % 11);
    }, 1300);
    return () => window.clearInterval(timer);
  }, [playing, visible]);

  useEffect(() => {
    onPlayingChange?.(playing);
  }, [playing, onPlayingChange]);

  const frame = Math.min(tick, 8);
  const states = planStates(frame, blocked);
  const compacted = compact ?? tick >= 5;
  const total = compacted ? 36 : 76;
  const elapsed = Math.min(24, frame * 3);
  const activeSpan = spans[selected];
  const pauseAndStep = () => {
    setPlaying(false);
    setTick((value) => (value + 1) % 9);
  };

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
          className="explain-card explain-card-plan"
          aria-labelledby="explain-plan-title"
        >
          <div className="explain-card-heading">
            <h3 id="explain-plan-title">Plans</h3>
            <p>Ready steps run together; dependencies wait.</p>
          </div>
          <div className="explain-toolbar">
            <span
              className="explain-readout"
              aria-live={playing ? "off" : "polite"}
            >
              {states.every((state) => state === "done")
                ? "Plan complete"
                : states.includes("blocked")
                  ? "Branch blocked · downstream held"
                  : `Wave ${Math.min(4, Math.floor(frame / 2) + 1)} of 4`}
            </span>
            <label className="explain-toggle">
              <input
                type="checkbox"
                checked={blocked}
                onChange={(event) => {
                  setBlocked(event.target.checked);
                  setTick(4);
                  setPlaying(false);
                }}
              />
              Block the test step
            </label>
          </div>
          <div
            className="explain-graph-scroll"
            tabIndex={0}
            role="region"
            aria-label="Plan diagram; scroll horizontally on small screens"
          >
            <svg
              className="explain-plan"
              viewBox="0 0 606 150"
              role="img"
              aria-label={`Example plan: ${steps.map((step, index) => `${index + 1} ${step.name}: ${states[index]}`).join("; ")}`}
            >
              {steps.flatMap((step, index) =>
                step.deps.map((id) => {
                  const from = steps[id];
                  return (
                    <path
                      key={`${id}-${index}`}
                      className={`explain-edge explain-edge-${states[index]}`}
                      d={`M ${from.x + NODE_W} ${from.y + NODE_H / 2} C ${from.x + NODE_W + 14} ${from.y + NODE_H / 2}, ${step.x - 14} ${step.y + NODE_H / 2}, ${step.x} ${step.y + NODE_H / 2}`}
                    />
                  );
                }),
              )}
              {steps.map((step, index) => (
                <g
                  key={step.name}
                  className={`explain-node explain-node-${states[index]}`}
                  transform={`translate(${step.x} ${step.y})`}
                >
                  <rect width={NODE_W} height={NODE_H} />
                  <text className="explain-node-title" x="10" y="16">
                    {index + 1}. {step.name}
                  </text>
                  <text className="explain-node-state" x="10" y="30">
                    {states[index]}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          <p className="explain-caption">
            {blocked
              ? "Step 3 is blocked. Review needs steps 2 and 3, holding steps 4 and 5."
              : "Implement and test together; review both before returning the result."}
          </p>
        </article>

        <article
          className="explain-card explain-card-context"
          aria-labelledby="explain-context-title"
        >
          <div className="explain-card-heading">
            <h3 id="explain-context-title">Context</h3>
            <p>Summarize older context to make room.</p>
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

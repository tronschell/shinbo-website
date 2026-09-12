import { Ledger, PlanGraph, Shot, widgets, Link } from "../shared";
import type { Doc } from "./types";

const doc: Doc = {
  slug: "plan",
  title: "Plan",
  blurb:
    "A plan is a dependency graph in Markdown; every step whose inputs are ready runs at the same time.",
  seo: {
    title: "Plans as dependency graphs, goals and the inspector",
    description:
      "A Shinbo plan is a Markdown dependency graph run in waves of up to eight subagents. Goals keep a thread working across turns; the inspector shows context.",
  },
  shot: "/shots/settings-context-bar.png",
  body: (
    <>
      <div className="head head-split">
        <div>
          <h2>Plan is a tool, not a mode.</h2>
        </div>
        <p className="lede">
          The <b>plan</b> tool writes steps to Markdown, each a subagent brief
          wired to the steps it waits on. Steps whose inputs are done form a{" "}
          <b>wave</b> and run together, up to eight live subagents. Markdown is
          the store, so a plan you edit by hand still parses.
        </p>
      </div>

      <div className="region">
        <div className="band band-head">
          <span className="label">Try it</span>
        </div>
        <div className="band">
          <ol className="copy">
            <li>
              In a thread, ask for a plan for a task with several parts. Shinbo
              writes the steps and their dependencies into the thread's
              Markdown.
            </li>
            <li>
              Open the <b>Plan</b> component in the inspector. Press a node to
              light the wave it belongs to; watch steps go from waiting to
              running to done.
            </li>
            <li>
              Edit the Markdown if you want to add, drop or rewire a step. A
              hand-edited plan still parses.
            </li>
            <li>
              For work that needs many turns, ask for a <b>goal</b> instead. The
              thread keeps going until the goal has evidence, hits a blocker or
              reaches its allowance.
            </li>
            <li>
              Settings → Context bar arranges which inspector components you
              see. Add with +, remove with ×, reorder in the preview.
            </li>
          </ol>
        </div>
      </div>

      <h3>Keep a nested task list</h3>
      <p className="copy">
        The <code>task_list</code> tool keeps a durable checklist for work the
        agent handles itself. Expand Tasks above the composer to see the nested
        tree, or add the Tasks component to Context and open its full view.
        Parent and child rows keep their own status; select a task to follow it
        in the tree.
      </p>
      <Shot
        src="/shots/task-plan.png"
        alt="Shinbo task-list view with five example tasks nested across three levels"
        title="Nested task list"
        caption="Real app · example checklist, no model run"
      />

      <div className="cols-2">
        <PlanGraph />
        <div>
          <h3>Waves, not a checklist</h3>
          <p className="copy">
            A checklist runs one step after another. A graph runs everything
            whose inputs exist. When a wave finishes, the steps it unblocked
            form the next one. Each step is a{" "}
            <Link href="/docs/delegation">subagent</Link> with its own tab and
            transcript, and it inherits the thread's permission mode.
          </p>
          <p className="copy">
            Plans, task lists and memory notes are saved locally. A saved record
            is not the same as the model's active context: what is on disk
            survives a turn, what is in the window may not. Write down decisions
            you need later.
          </p>
        </div>
      </div>

      <h3>Goals</h3>
      <p className="copy">
        A plan organizes dependent steps inside a turn. A <b>goal</b> keeps one
        thread working across turns toward an objective. It stops when the
        thread has evidence the goal is met, when the same blocker appears three
        turns running, or at the ceiling. Every reported model step on the
        thread counts against the allowance. The invariants live in Rust.
      </p>
      <dl className="kv region">
        <dt>Token allowance</dt>
        <dd>200,000 per goal</dd>
        <dt>Turn ceiling</dt>
        <dd>40</dd>
        <dt>Resume</dt>
        <dd>needs allowance left</dd>
        <dt>Continue</dt>
        <dd>grants more when tokens or turns run out</dd>
        <dt>Replacing a goal</dt>
        <dd>
          update or clear the unfinished one first; spent allowance stays spent
        </dd>
        <dt>Subagent spend</dt>
        <dd>not counted in the parent goal's ledger</dd>
      </dl>

      <div className="cols-2">
        <Ledger />
        <div>
          <h3>Context</h3>
          <p className="copy">
            The <b>context</b> tool reports what a turn carries: tokens, window
            size, share spent, and it can compact from the next turn.
            Auto-compact triggers at a percentage you set. The Context window
            component breaks the last turn down by kind, and the inspector
            accounts per step.
          </p>
          <p className="copy">
            Prompt reinjection and tool-result pruning are experiments, off by
            default. On a route that publishes no context window the accounting
            falls back to four characters per token and both experiments are
            inert.
          </p>
        </div>
      </div>

      <h3>The inspector</h3>
      <p className="copy">
        Eleven components ship on three pages, and a layout can hold up to four.
        Settings → Context bar shows the preview with grouped components beside
        it; <b>Page options</b> renames or deletes a page. The layout is
        validated before it is saved.
      </p>
      <div className="rows">
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
      <div>
        <Shot
          src="/shots/settings-context-bar.png"
          alt="Shinbo Context bar settings with page tabs, a sample-data inspector preview and collapsed component groups"
          title="Arranging the inspector"
          caption="Inspector layout preview · sample thread statistics · component groups"
        />
      </div>

      <div className="region">
        <div className="band band-head">
          <span className="label">Limits</span>
        </div>
        <div className="band">
          <ul className="copy">
            <li>
              A goal's allowance is checked when usage arrives, so an in-flight
              request can push past 200,000 tokens before it stops.
            </li>
            <li>
              A new goal cannot reset spent allowance; use Continue to grant
              more.
            </li>
            <li>
              Neither reinjection nor pruning guarantees recall; write down what
              you need later.
            </li>
            <li>
              Up to four inspector pages; a layout that fails validation is not
              saved.
            </li>
          </ul>
        </div>
      </div>

      <p className="copy">
        Related: <Link href="/docs/delegation">Delegation</Link> for how
        subagents run and are steered,{" "}
        <Link href="/docs/jobs">Scheduled workflows</Link> for graphs that run
        on a schedule, <Link href="/docs/agent">Self improvement</Link> for the
        run evidence behind each turn.
      </p>
    </>
  ),
};

export default doc;

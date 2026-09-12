import { Shot, Link, LearningLoop } from "../shared";
import type { Doc } from "./types";

const doc: Doc = {
  slug: "agent",
  title: "Self-improvement",
  blurb:
    "See which model keeps failing, ask Shinbo what to change, and prove the change on a replay bench before keeping it.",
  seo: {
    title: "Self-improvement from saved runs",
    description:
      "Filter Shinbo's saved runs by model or family, read the evidence, ask for an analysis, and A/B a scoped change on a paired replay bench with eight metrics.",
  },
  shot: "/shots/self-improvement-models.png",
  body: (
    <>
      <div className="head head-split">
        <div>
          <h2>Find what keeps going wrong, and prove the fix.</h2>
        </div>
        <p className="lede">
          Shinbo keeps a trace of its own runs. <b>Self improvement</b> reads
          those traces back, grouped by the model that ran them, so you can see
          where turns end badly. From there you ask Shinbo for a scoped change
          and measure it against the unchanged version before it sticks.
        </p>
      </div>

      <div className="region">
        <div className="band band-head">
          <span className="label">Try it</span>
        </div>
        <div className="band">
          <ol className="copy">
            <li>
              Open <b>Agent</b> in the sidebar and choose the{" "}
              <b>Self improvement</b> tab.
            </li>
            <li>
              Pick a date window, then click <b>Every model</b>, a family, or
              one exact model id. Failure rates sit beside sample counts, with a
              brand mark on each row.
            </li>
            <li>
              Expand <b>Run evidence</b> to read the prompts, settings and tool
              calls behind the numbers.
            </li>
            <li>
              Click <b>Ask Shinbo to analyze these runs</b>. A thread opens
              scoped to that window and model and proposes concrete changes.
            </li>
            <li>
              Take a proposal to the <b>Bench</b> tab, run the paired replay,
              and keep or discard the change from its results.
            </li>
          </ol>
        </div>
      </div>

      <Shot
        src="/shots/self-improvement-models.png"
        alt="Shinbo Agent view on the Self improvement tab with a 30-day window, Every model selected, zero turns read and an empty Run evidence panel"
        title="Before the first finished run"
        caption="Fresh isolated profile · no finished turns or recorded run evidence"
      />

      <LearningLoop />

      <div className="cols-2">
        <div className="region">
          <div className="band band-head">
            <span className="label">Read the run</span>
          </div>
          <div className="band">
            <p className="copy">
              <b>Run evidence</b> holds what each run actually saw: the saved
              system prompt, attached skills and instructions, run settings,
              effective changes, and every tool input and result. Nested agents
              have their own evidence. If a trace did not record which model
              ran, it stays unknown rather than assumed.
            </p>
          </div>
        </div>
        <div className="region">
          <div className="band band-head">
            <span className="label">Ask for an analysis</span>
          </div>
          <div className="band">
            <p className="copy">
              The analysis thread reads the evidence for that window and model
              and proposes scoped changes, each with a metric and a replay
              check. It proposes; you decide. Reviewing evidence in the app is
              local, but asking a hosted model sends what it reads to that
              provider.
            </p>
          </div>
        </div>
      </div>

      <h3>Scope and the six levers</h3>
      <p className="copy">
        Every proposal targets <b>every model</b>, <b>one family</b>, or{" "}
        <b>one exact model id</b> including its namespace. Trials and kept
        changes apply only to matching models, because evidence from one model
        says nothing about another. A change can pull one of six levers:
      </p>
      <dl className="kv region">
        <dt>Standing instructions</dt>
        <dd>rules the model reads on every turn</dd>
        <dt>Auto-verifier rules</dt>
        <dd>what the Auto-mode verifier clears or blocks</dd>
        <dt>System prompt</dt>
        <dd>the prompt itself</dd>
        <dt>Tool descriptions</dt>
        <dd>how each tool explains itself</dd>
        <dt>Tools offered up front</dt>
        <dd>which tools are in the first request</dd>
        <dt>Harness knobs</dt>
        <dd>settings on shinbo-cli</dd>
      </dl>
      <p className="copy">
        Skills can appear in an analysis as a recommendation, but a skill is not
        a lever the bench can trial.
      </p>

      <h3>The replay bench</h3>
      <p className="copy">
        The <b>Bench</b> replays saved cases twice on a matching model, once
        with the change and once without. The case count is fixed before the run
        starts, and eight metrics are compared:
      </p>
      <div className="chips">
        <span className="tag">failed tool calls</span>
        <span className="tag">verifier blocks</span>
        <span className="tag">tool calls</span>
        <span className="tag">model requests</span>
        <span className="tag">tokens</span>
        <span className="tag">cost</span>
        <span className="tag">time</span>
        <span className="tag">bad-ending turns</span>
      </div>
      <p className="copy">
        Only a finished bench run can keep a change. A replay that comes out
        ahead is evidence for those cases, not a guarantee about future work.
      </p>

      <div className="region">
        <div className="band band-head">
          <span className="label">Limits</span>
        </div>
        <div className="band">
          <ul className="copy">
            <li>
              Current source retains <b>64 traces per thread</b> and limits each
              trace to <b>1,048,576 JavaScript string units</b> (UTF-16 code
              units, not bytes). Older traces can lack model or prompt context,
              and long traces can be shortened. Review while the evidence is
              fresh.
            </li>
            <li>Token and cost figures are estimates, not invoices.</li>
            <li>
              Asking Shinbo sends the evidence it reads to the selected model
              provider. Keep the review in-app if that matters.
            </li>
            <li>
              Nothing here is autonomous self-healing. A change is only kept
              after a finished bench run, and a win on the bench is not a
              measured gain for every user or model.
            </li>
          </ul>
        </div>
      </div>

      <p className="copy">
        Related: <Link href="/docs/control">Control</Link> for the Auto verifier
        the rules lever tunes, <Link href="/docs/plan">Plan</Link> for the
        inspector's per-step accounting, <Link href="/docs/tools">Tools</Link>{" "}
        for write_skill and read_trace.
      </p>
    </>
  ),
};

export default doc;

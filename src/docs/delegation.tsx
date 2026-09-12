import { Shot, Waterfall, Link } from "../shared";
import type { Doc } from "./types";

const doc: Doc = {
  slug: "delegation",
  title: "Delegation",
  blurb:
    "Hand work to a subagent that finishes and folds back, or a sub thread that stays, and steer or stop either while it runs.",
  seo: {
    title: "Subagents, sub threads and steering a running turn",
    description:
      "Shinbo delegates to subagents that dissolve into one answer or sub threads that persist. Queue, steer or stop any turn, and read the sidebar and archive.",
  },
  shot: "/shots/plan-subagents.png",
  body: (
    <>
      <div className="head head-split">
        <div>
          <h2>A thread outlives every run inside it.</h2>
        </div>
        <p className="lede">
          A <b>thread</b> is a Markdown file. A <b>run</b> is one agent loop
          inside it and dissolves when the job is done. The composer, Quick Ask
          and a due job all start a run the same way, so the same queue, steer
          and stop controls apply to each.
        </p>
      </div>

      <div className="region">
        <div className="band band-head">
          <span className="label">Try it</span>
        </div>
        <div className="band">
          <ol className="copy">
            <li>
              Start a turn in any thread. While it runs, type a follow-up and
              press <b>Enter</b> to queue it, or <b>⤳</b> to steer the turn in
              flight.
            </li>
            <li>
              Press <b>Escape</b> to stop. The partial answer goes to history
              and anything queued is held, not lost.
            </li>
            <li>
              Ask for a task to be split up. Each subagent gets its own tab,
              transcript and sidebar colour; open a tab to read, steer or stop
              it.
            </li>
            <li>
              Ask for a <b>sub thread</b> when the work should survive the turn.
              It appears nested under the calling thread in the sidebar.
            </li>
            <li>
              When a thread is done, archive it. Find it later under Archive and
              press <b>Restore</b> if you need it back.
            </li>
          </ol>
        </div>
      </div>

      <p className="copy">
        By default, Shinbo handles bounded searches and cleanup directly. It
        delegates substantial independent work when the parent can make useful
        progress on separate work, or when you or the repository instructions
        require delegation. Related discoveries stay outside the requested scope
        unless they are necessary to complete it.
      </p>

      <h3>Two ways to delegate</h3>
      <div className="cols-2">
        <div className="region">
          <p className="copy">
            <b>Subagent.</b> The harness's own tool. A child runs in the same
            process and never queues behind its parent. It has a real
            transcript, a colour in the sidebar and a tab you can steer or stop.
            It inherits the parent's{" "}
            <Link href="/docs/control">permission mode</Link> and cannot exceed
            it. A <Link href="/docs/plan">plan</Link> runs up to eight at once.
          </p>
        </div>
        <div className="region">
          <p className="copy">
            <b>Sub thread.</b> <code>threads spawn</code> starts an ordinary
            thread owned by the caller and nested under it. It works beside the
            calling turn rather than inside it, keeps its own Markdown file and
            is still there tomorrow. Eight at once.
          </p>
        </div>
      </div>

      <div className="cols-2">
        <Waterfall />
        <div>
          <h3>Queue, steer, stop</h3>
          <dl className="kv region">
            <dt>Enter</dt>
            <dd>queues; the queue drains one turn at a time</dd>
            <dt>⤳</dt>
            <dd>steers; the text lands at the next model step</dd>
            <dt>Escape</dt>
            <dd>
              stops, writes the partial answer to history, holds the queue
            </dd>
          </dl>
          <p className="copy">
            The Timeline inspector component shows every turn as a waterfall of
            model requests, tool calls, subagents and CLI runs. It is the
            quickest way to see what a delegated turn spent its time on.
          </p>
        </div>
      </div>

      <div>
        <Shot
          src="/shots/plan-subagents.png"
          alt="Illustrative website launch conversation with a four-node dependency plan in the Run sidebar: one done, two running and one waiting"
          title="Subagents in a plan"
          caption="Four example steps · one done · two running · one waiting"
        />
      </div>

      <h3>Reading the sidebar</h3>
      <p className="copy">
        Priority and pinned threads use square two-line rows: the thread title,
        then the project underneath. Working, needs input, failed and unread
        indicators sit on the right, beside a phone marker.
      </p>
      <p className="copy">
        A <b>PR badge</b> shows open, draft, closed, merged or conflicts for the
        current folder branch, read through <code>gh pr view</code> and cached
        for a minute. It needs the GitHub CLI installed and signed in. The badge
        follows whatever branch the folder is on now; a thread does not remember
        the branch it started on.
      </p>

      <h3>Archive</h3>
      <p className="copy">
        Archive groups threads by the local day they were archived, newest
        first, and highlights those in their last two days. <b>Restore</b>{" "}
        brings a thread back; a thread is permanently deleted 30 days after
        archiving.
      </p>
      <div>
        <Shot
          src="/shots/archive.png"
          alt="Shinbo Archive in a fresh workspace with no archived threads"
          title="Archive"
          caption="Fresh workspace · no archived threads"
        />
      </div>

      <div className="region">
        <div className="band band-head">
          <span className="label">Limits</span>
        </div>
        <div className="band">
          <ul className="copy">
            <li>
              A subagent cannot call <code>computer</code>; the parent performs
              app actions.
            </li>
            <li>
              A subagent inherits the parent's mode and cannot exceed it, so set
              the mode on the parent thread.
            </li>
            <li>
              Subagent spend does not count toward the parent's{" "}
              <Link href="/docs/plan">goal allowance</Link>.
            </li>
            <li>
              The PR badge needs <code>gh</code> installed and signed in;
              without it no badge appears.
            </li>
          </ul>
        </div>
      </div>

      <p className="copy">
        Related: <Link href="/docs/plan">Plan</Link> for waves of subagents,{" "}
        <Link href="/docs/harness">Harness</Link> for delegating to another CLI,{" "}
        <Link href="/docs/control">Control</Link> for the modes a subagent
        inherits.
      </p>
    </>
  ),
};

export default doc;

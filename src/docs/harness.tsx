import { Shot, clis, imports, Link } from "../shared";
import type { Doc } from "./types";

const doc: Doc = {
  slug: "harness",
  title: "Harness",
  blurb:
    "Run the coding-agent CLIs you already have installed inside a Shinbo thread, and hand their results to each other.",
  seo: {
    title: "Run Claude Code, Codex and other CLIs in one thread",
    description:
      "Shinbo spawns your installed, signed-in agent CLIs as tools in a thread, streams them live, and hands one run's result to another harness or run.",
  },
  shot: "/shots/agent-import.png",
  body: (
    <>
      <div className="head head-split">
        <div>
          <h2>Shinbo does not reimplement your agent. It runs it.</h2>
        </div>
        <p className="lede">
          The <b>cli</b> tool spawns an installed, authenticated coding CLI in
          the thread's folder and streams it live. A run is a conversation. The
          child exits at the end of a turn and waits with its session id, so the
          next instruction continues where it left off.
        </p>
      </div>

      <div className="region">
        <div className="band band-head">
          <span className="label">Try it</span>
        </div>
        <div className="band">
          <ol className="copy">
            <li>
              Install and sign in to a CLI yourself (for example{" "}
              <code>claude</code> or <code>codex</code>). Shinbo never reads or
              copies its token.
            </li>
            <li>
              In a thread, ask Shinbo to give the task to that CLI. A run tab
              opens with the harness logo, task, model and approvals.
            </li>
            <li>
              Switch between the readable <b>Result</b> and the{" "}
              <b>Terminal log</b>, or open the run in a floating window.
            </li>
            <li>
              Choose <b>Hand off output</b> to send the result to another
              installed harness or an existing run, then add the next
              instruction.
            </li>
            <li>
              Settings → Imports &amp; plugins lists the skills and MCP configs
              found for your other agents. Tick the ones Shinbo should reference
              and click <b>Import selected</b>.
            </li>
          </ol>
        </div>
      </div>

      <h3>Adapters</h3>
      <div
        tabIndex={0}
        role="region"
        aria-label="Agent CLI comparison; scroll horizontally"
        className="tbl-wrap"
      >
        <table className="tbl">
          <thead>
            <tr>
              <th scope="col">Agent</th>
              <th scope="col">Binary</th>
              <th scope="col">Resumes with</th>
              <th scope="col">Unattended flag</th>
              <th scope="col">Owns its session</th>
            </tr>
          </thead>
          <tbody>
            {clis.map((c) => (
              <tr key={c.name}>
                <td>
                  <span className="brandcell">
                    <img className="mark" src={`/brands/${c.brand}`} alt="" />
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
      <p className="copy">
        An adapter means Shinbo knows how to spawn and resume that CLI. It is
        not a check against every vendor version, and the CLI still has to be
        installed and signed in on its own. Harnesses that resume their latest
        session share one active run per harness and folder. Shinbo refuses to
        resume a run once a newer session exists there.
      </p>

      <h3>Model and thinking</h3>
      <div className="cols-2">
        <div className="region">
          <p className="copy">
            Every adapter accepts <code>--model</code>. The <b>cli</b> tool
            takes <code>model</code> and <code>effort</code> on run or send,
            including with <code>fromRuns</code>. Omitted values keep a resumed
            run's choices; empty strings restore the CLI's native defaults.
          </p>
        </div>
        <div className="region">
          <p className="copy">
            <code>{'cli_runs {"cli":"codex","refresh":true}'}</code> discovers
            native model ids and thinking options without spending a model turn.
            An unsupported model or level is rejected, not silently swapped for
            another.
          </p>
        </div>
      </div>

      <div
        tabIndex={0}
        role="region"
        aria-label="Harness thinking controls; scroll horizontally"
        className="tbl-wrap"
      >
        <table className="tbl">
          <thead>
            <tr>
              <th scope="col">Harness</th>
              <th scope="col">Native thinking control</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Claude Code", "--effort: low, medium, high, xhigh, max"],
              [
                "Codex",
                "--config model_reasoning_effort: per the selected model's catalog",
              ],
              ["Pi", "--thinking: off, minimal, low, medium, high, xhigh, max"],
              ["OpenCode", "--variant: native or configured variant name"],
              ["Antigravity CLI", "agy --effort: low, medium, high"],
              [
                "Gemini CLI / Cursor CLI",
                "Model only; a separate effort is rejected",
              ],
            ].map(([name, thinking]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{thinking}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>Handoffs</h3>
      <p className="copy">
        Try Claude Code for a draft and Codex for a review. Install and sign in
        to both CLIs first, and use a sample folder.
      </p>
      <ol className="copy">
        <li>
          Ask Shinbo: “Use Claude Code to draft a short README outline for this
          folder. Return the outline as text; do not edit files.”
        </li>
        <li>
          When the run succeeds, inspect its Result. Choose{" "}
          <b>Hand off output</b>, select Codex, and add: “Review this outline
          for missing setup steps. Do not edit files.”
        </li>
        <li>
          Read the review in its run tab, then hand that output back to the
          original Claude Code run and ask for a revised outline.
        </li>
        <li>
          Compare the final outline with the source folder before using it. The
          source chips let you inspect which result supplied the next
          instruction.
        </li>
      </ol>
      <p className="copy">
        If a CLI is missing or cannot sign in, confirm it works in your terminal
        first. For a rejected model, choose one that CLI account can access.
        Under the hood, <code>fromRuns</code> carries source run ids with either{" "}
        <code>run</code> or <code>send</code>; a source chip in the transcript
        returns to the run that supplied the output.
      </p>
      <dl className="kv region">
        <dt>Sources per handoff</dt>
        <dd>up to eight, latest successful result of each, same thread only</dd>
        <dt>What travels</dt>
        <dd>stdout only — not files, not the terminal log</dd>
        <dt>Rejected sources</dt>
        <dd>running, failed, stopped, empty or truncated runs</dd>
        <dt>Prompt ceiling</dt>
        <dd>32 Ki characters and 96 KiB combined; pass file paths for more</dd>
        <dt>Approvals</dt>
        <dd>new runs use defaults; continuing runs keep theirs</dd>
      </dl>

      <h3>Your existing setup, by reference</h3>
      <p className="copy">
        Settings → Imports &amp; plugins finds{" "}
        <Link href="/docs/tools">skills and MCP configs</Link> already set up
        for another agent and records their <b>paths</b>. Nothing is copied,
        including credentials. Expand <b>Source locations</b> for where each one
        lives and <b>Not found on this computer</b> for the rest. An imported
        MCP server can still reach whatever it was configured for.
      </p>
      <div className="marks">
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

      <div>
        <Shot
          src="/shots/agent-import.png"
          alt="Shinbo Imports settings listing installed Codex, Claude, Pi and OpenCode configurations with source paths collapsed"
          title="What Shinbo found"
          caption="Installed configuration sources · choose which ones to reference"
        />
      </div>

      <div className="region">
        <div className="band band-head">
          <span className="label">Limits</span>
        </div>
        <div className="band">
          <ul className="copy">
            <li>
              Run and session memory lasts only while Shinbo is open. Sessions
              started in another terminal are not tracked.
            </li>
            <li>
              Handoffs carry stdout only; write large deliverables to a file and
              pass the path.
            </li>
            <li>
              Each CLI bills through its own account. Shinbo does not measure
              vendor-side reasoning use.
            </li>
            <li>
              <b>cli</b> is ask-gated: in{" "}
              <Link href="/docs/control">Ask and Accept edits</Link> it asks
              before spawning.
            </li>
          </ul>
        </div>
      </div>

      <p className="copy">
        Related: <Link href="/docs/delegation">Delegation</Link> for Shinbo's
        own subagents, <Link href="/docs/tools">Tools</Link> for skills and MCP,{" "}
        <Link href="/docs/control">Control</Link> for what a run may do on its
        own.
      </p>
    </>
  ),
};

export default doc;

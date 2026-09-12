import { Shot, Link, WorkflowGraph } from "../shared";
import type { Doc } from "./types";

const doc: Doc = {
  slug: "jobs",
  title: "Scheduled work",
  blurb:
    "Save a prompt with a cron trigger and Shinbo runs it as a thread while the app is open.",
  seo: {
    title: "Scheduled workflows in Shinbo",
    description:
      "Give Shinbo a UTC cron trigger and a graph of agent, script, set and if nodes. Runs open a normal thread while the desktop app is open and the computer is awake.",
  },
  shot: "/shots/scheduled-jobs.png",
  body: (
    <>
      <div className="head head-split">
        <div>
          <h2>Scheduled graphs that run while you are away.</h2>
        </div>
        <p className="lede">
          A <b>workflow</b> is a saved prompt with one trigger and, if you want,
          a small graph of steps. When the trigger fires, Shinbo opens a normal
          thread on your machine and runs it under the model and permission mode
          you saved.
        </p>
      </div>

      <div className="region">
        <div className="band band-head">
          <span className="label">Try it</span>
        </div>
        <div className="band">
          <ol className="copy">
            <li>
              Open <b>Workflows</b> in the sidebar and click{" "}
              <b>+ New workflow</b>.
            </li>
            <li>
              Give it a name and write what Shinbo should do in the prompt box.
            </li>
            <li>
              Click <b>Edit schedule</b> and set the trigger. Cron times are
              UTC; the editor shows the same time in your zone underneath.
            </li>
            <li>
              Pick the model and the permission mode the run will use. Expand{" "}
              <b>Advanced · multi-step workflow</b> if you need script, set or
              if steps, and check the <b>Graph</b> tab to see the result.
            </li>
            <li>
              <b>Save</b>, then <b>Test</b> or <b>Run now</b>. Each run appears
              in the <b>Runs</b> list below the editor as its own thread.
            </li>
          </ol>
        </div>
      </div>

      <Shot
        src="/shots/scheduled-jobs.png"
        alt="Shinbo Workflows editor with a paused weekly example: name, prompt, schedule, model and permission pickers, and an empty Runs list"
        title="Scheduled tasks"
        caption="Paused weekly example · one agent step · no runs yet"
      />

      <h3>Four trigger shapes</h3>
      <p className="copy">
        Every workflow has exactly one trigger. It is validated when you save
        and can be at most 128 characters.
      </p>
      <div
        className="tbl-wrap"
        tabIndex={0}
        role="region"
        aria-label="Workflow trigger shapes; scroll horizontally"
      >
        <table className="tbl">
          <thead>
            <tr>
              <th scope="col">Shape</th>
              <th scope="col">Example</th>
              <th scope="col">Fires when</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cron</td>
              <td>
                <b>0 9 * * 1</b>
              </td>
              <td>five-field cron, always UTC — this one is Monday 09:00</td>
            </tr>
            <tr>
              <td>Manual</td>
              <td>
                <b>manual</b>
              </td>
              <td>only when you click Run now, or the agent calls it</td>
            </tr>
            <tr>
              <td>After a job</td>
              <td>
                <b>after &lt;job-id&gt;</b>
              </td>
              <td>the named workflow finishes successfully</td>
            </tr>
            <tr>
              <td>On an event</td>
              <td>
                <b>on &lt;event&gt;</b>
              </td>
              <td>the app raises that event</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Four node kinds</h3>
      <p className="copy">
        A plain workflow is one <b>agent</b> node. The advanced editor lets you
        chain up to 24 nodes. Each node names the one that follows it;{" "}
        <b>{'"next": "end"'}</b> finishes the run.
      </p>
      <div
        className="tbl-wrap"
        tabIndex={0}
        role="region"
        aria-label="Workflow node kinds; scroll horizontally"
      >
        <table className="tbl">
          <thead>
            <tr>
              <th scope="col">Node</th>
              <th scope="col">Does</th>
              <th scope="col">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>agent</b>
              </td>
              <td>runs a model turn with a prompt</td>
              <td>
                the only node that thinks; its answer becomes{" "}
                <b>{"{{last}}"}</b>
              </td>
            </tr>
            <tr>
              <td>
                <b>script</b>
              </td>
              <td>runs a file</td>
              <td>no model involved</td>
            </tr>
            <tr>
              <td>
                <b>set</b>
              </td>
              <td>fills a variable</td>
              <td>read it later as {"{{name}}"}</td>
            </tr>
            <tr>
              <td>
                <b>if</b>
              </td>
              <td>branches on one variable</td>
              <td>
                is · is not · contains · does not contain · is empty · is not
                empty · &gt; &lt; &gt;= &lt;=
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="copy">
        Variables are written as <b>{"{{name}}"}</b> and read by any later node.
        A typical graph collects with a script, reasons with an agent, checks
        the answer with an if, and only then runs the step that acts.
      </p>

      <WorkflowGraph />

      <Shot
        src="/shots/scheduled-graph.png"
        alt="Shinbo Graph view of the paused weekly project brief: one agent node leading to the end of the run"
        title="The graph"
        caption="One example agent node · paused schedule · no runs yet"
      />

      <div className="cols-2">
        <div className="region">
          <div className="band band-head">
            <span className="label">What a run is</span>
          </div>
          <div className="band">
            <p className="copy">
              A run is an ordinary thread: it appears in the sidebar and keeps
              its transcript. It uses the model and permission mode the workflow
              was saved with, not whatever you picked elsewhere. Saved under{" "}
              <b>Ask</b>, every gated call waits for you; save it under{" "}
              <b>Auto</b> or <b>Full access</b> if it has to finish unattended.
              See <Link href="/docs/control">Control</Link> for what each mode
              allows.
            </p>
          </div>
        </div>
        <div className="region">
          <div className="band band-head">
            <span className="label">Stopping and failing</span>
          </div>
          <div className="band">
            <p className="copy">
              <b>Stop</b> cancels the current turn or script and prevents any
              later node from starting. A node that fails ends the run: nodes
              that depended on it do not run, and workflows triggered with{" "}
              <b>after</b> this job do not fire. The agent can also start a job
              itself through the ask-gated <b>workflow</b> tool.
            </p>
          </div>
        </div>
      </div>

      <div className="region">
        <div className="band band-head">
          <span className="label">Limits</span>
        </div>
        <div className="band">
          <ul className="copy">
            <li>
              Shinbo must be open and the computer awake. A closed app or a
              sleeping laptop skips the trigger; there is no hosted scheduler
              that runs it for you.
            </li>
            <li>
              Cron is UTC. Check the local time the editor shows under the
              schedule before you save.
            </li>
            <li>
              Only an agent node calls a model. Script, set and if nodes cannot
              reason, so put any judgement in an agent node before an if.
            </li>
            <li>
              Runs are real threads and cost whatever the model route costs.
              Free routes are subject to provider availability.
            </li>
          </ul>
        </div>
      </div>

      <p className="copy">
        Related: <Link href="/docs/control">Control</Link> for the mode a job
        runs under, <Link href="/docs/plan">Plan</Link> for graphs inside a
        single turn, <Link href="/docs/tools">Tools</Link> for the workflow
        tool.
      </p>
    </>
  ),
};

export default doc;

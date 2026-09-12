import { Shot, tools, Link } from "../shared";
import type { Doc } from "./types";

const doc: Doc = {
  slug: "tools",
  title: "Tools",
  blurb:
    "Shinbo adds 27 tools of its own to the harness, seven of which ask before they act, and can write new ones mid-conversation.",
  seo: {
    title: "Shinbo's 27 tools and the seven that ask",
    description:
      "Files, shell and search belong to the harness. Shinbo adds 27 tools — browser, computer, CLI runs, memory, plans, workflows — with seven ask gates, and can write skills, tools and MCP servers itself.",
  },
  shot: "/shots/settings-tools.png",
  body: (
    <>
      <div className="head head-split">
        <div>
          <h2>Twenty-seven of Shinbo's own. The shell is the harness's.</h2>
        </div>
        <p className="lede">
          Shinbo ships no <b>bash</b> of its own. Files, search, shell,
          language-server queries, skills, MCP and subagents belong to the
          harness, <b>shinbo-cli</b>, and are gated over one permission channel.
          Shinbo's 27 tools are appended to that same registry, so the model
          sees one list and one set of rules.
        </p>
      </div>

      <div className="region">
        <div className="band band-head">
          <span className="label">Try it</span>
        </div>
        <div className="band">
          <ol className="copy">
            <li>
              Open <b>Settings → Tools</b>. Built-in tools are grouped by what
              they do, each group with an enabled count.
            </li>
            <li>
              Expand a group and switch off any tool you do not want offered.
              The hide applies in every permission mode, and a model that
              guesses the name is refused.
            </li>
            <li>
              Scroll down to <b>Added to Shinbo</b>: Shinbo's own written tools,
              imported skills and MCP servers, each with its own count.
            </li>
            <li>
              Start a thread and ask Shinbo to write a tool or skill for
              something you do often. It is live on the next turn.
            </li>
          </ol>
        </div>
      </div>

      <Shot
        src="/shots/settings-tools.png"
        alt="Settings, Tools: new-thread mode above grouped built-in tools with enabled counts, followed by installed tools, skills and MCP server groups"
        title="Tool settings"
        caption="Expand a group to choose tools · installed additions have their own counts"
      />

      <h3>The 27, and which ones ask</h3>
      <p className="copy">
        Seven tools carry an <b>ask</b> gate. In Ask and Accept edits mode they
        stop for you every time. In Auto the verifier model clears ordinary
        calls and hands you anything it will not clear. In Full access they run
        on their own, except <b>computer</b>, which always asks per app.
        Everything marked <b>auto</b> runs without a prompt in every mode. Modes
        are described under <Link href="/docs/control">Control</Link>.
      </p>
      <div className="tools">
        {tools.map(([name, gate]) => (
          <div key={name} data-gate={gate}>
            <span>{name}</span>
            <i>{gate}</i>
          </div>
        ))}
      </div>

      <h3>Shinbo writes its own</h3>
      <p className="copy">
        A handful of those tools extend the registry itself. Anything they
        install mid-turn is available on the next turn, with no restart.
      </p>
      <dl className="kv region">
        <dt>write_skill</dt>
        <dd>records a lesson as a skill the model can load later</dd>
        <dt>write_tool</dt>
        <dd>writes a script and registers it as a tool callable by name</dd>
        <dt>run_tool</dt>
        <dd>runs one of those scripts — ask-gated</dd>
        <dt>install_mcp</dt>
        <dd>adds an MCP server — ask-gated</dd>
        <dt>write_plugin</dt>
        <dd>packages skills in the Codex plugin format</dd>
        <dt>shortcut</dt>
        <dd>binds a prompt to a key combination; three slots</dd>
      </dl>

      <div className="cols-2">
        <div className="region">
          <div className="band band-head">
            <span className="label">Web search</span>
          </div>
          <div className="band">
            <p className="copy">
              <b>web_search</b> can go through TinyFish, 4get, SearXNG, Brave
              Search, Tavily or Exa. The provider that answered shows its logo
              in the transcript. Search goes to that provider even when the
              thread's model is local.
            </p>
          </div>
        </div>
        <div className="region">
          <div className="band band-head">
            <span className="label">Inspecting tool calls</span>
          </div>
          <div className="band">
            <p className="copy">
              Every tool call is a span in the thread's trace. Read it in the
              inspector, or let the agent read it with <b>read_trace</b>, which
              takes a numeric <code>offset</code> and returns up to eight traces
              per call. Recorded thread data exports as CSVs. Retention is
              covered under <Link href="/docs/agent">Self-improvement</Link>.
            </p>
          </div>
        </div>
      </div>

      <div className="region">
        <div className="band band-head">
          <span className="label">The same agent, headless</span>
          <span className="tag">gated on the tty</span>
        </div>
        <div className="band code">
          {`$ `}
          <b>shinbo-cli ask "explain this repository"</b>
          {`      one-shot answer
$ `}
          <b>shinbo-cli</b>
          {`                                    a REPL in the current directory
$ `}
          <b>shinbo-cli session resume last</b>
        </div>
        <div className="band">
          <p className="copy">
            Outside the app the harness asks on the terminal instead of over
            Shinbo's permission channel. The app bundle includes the
            <b>shinbo-cli</b> binary.
          </p>
        </div>
      </div>

      <div className="region">
        <div className="band band-head">
          <span className="label">Limits</span>
        </div>
        <div className="band">
          <ul className="copy">
            <li>
              A hidden tool stays hidden in every mode, including Full access;
              hiding is not a per-mode setting.
            </li>
            <li>
              <b>computer</b> asks per app in every mode and runs under fixed
              rails; see <Link href="/docs/control">Control</Link>.
            </li>
            <li>
              An installed MCP server or written tool is only as trustworthy as
              its source; <b>install_mcp</b> and <b>run_tool</b> ask for that
              reason.
            </li>
          </ul>
        </div>
      </div>

      <p className="copy">
        Related: <Link href="/docs/control">Control</Link> for the modes behind
        each gate, <Link href="/docs/harness">Harness</Link> for CLI adapters
        and imports, <Link href="/docs/surfaces">Notch &amp; surfaces</Link> for
        artifacts that replace interface regions.
      </p>
    </>
  ),
};

export default doc;

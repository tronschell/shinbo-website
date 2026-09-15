import { Link, Shot, modes, tools } from "../shared";
import type { Doc } from "./types";

const prohibited = [
  "Deleting, overwriting, moving or emptying anything you did not name — your home folder, /, /System, /Library, /usr, /etc, /Volumes, whole disks, or paths built from unset variables",
  "rm -rf, find -delete, truncating or redirecting over a file, or wildcards wider than the task",
  "Destroying version control you did not ask for — force push, git reset --hard, git clean -fdx, deleting branches, tags or stashes, rewriting published history",
  "Anything irreversible and published — npm publish, releases, deploys, dropping or truncating a database, sending mail or messages, posting to an API others read",
  "Sending your data off the computer — uploads, curl or scp of local content, pasting into remote services, webhooks",
  "Downloading and running code — curl piped to a shell, install-from-URL, running a just-fetched binary, npx of an unpinned package",
  "Touching credentials — keys, tokens, .env, ~/.ssh, keychains, browser profiles, cloud credentials",
  "Changing the machine — sudo, system settings, firewall, SIP, Gatekeeper or SmartScreen, launch agents, cron, launchd, scheduled tasks, registry run keys, system package managers, shell profiles",
  "Killing or disabling processes, services or containers the agent did not start",
  "Anything not plainly readable — obfuscated, encoded or eval'd commands",
];

const doc: Doc = {
  slug: "control",
  title: "Control",
  blurb:
    "Pick one of four permission modes to decide what a turn may do without asking you.",
  seo: {
    title: "Permission modes: Ask, Accept edits, Auto, Full access",
    description:
      "Four permission modes decide what a Shinbo turn may do alone. Auto screens ten prohibited actions; computer use always asks per app. Plus system permissions and phone pairing.",
  },
  shot: "/shots/settings-permissions.png",
  body: (
    <>
      <div className="head head-split">
        <div>
          <h2>You set how much a turn may do alone.</h2>
        </div>
        <p className="lede">
          A <b>permission mode</b> decides which tool calls run on their own and
          which stop to ask you. There are four, from asking every time to full
          access. A few rails stay on in every mode, and a subagent can never
          hold more than its parent.
        </p>
      </div>

      <div className="region">
        <div className="band band-head">
          <span className="label">Try it</span>
        </div>
        <div className="band">
          <ol className="copy">
            <li>
              Open a thread and find the mode picker in the composer. It starts
              on <b>Ask</b>.
            </li>
            <li>
              Switch to <b>Accept edits</b> and ask for a file change. The edit
              lands; a shell command still prompts you.
            </li>
            <li>
              Switch to <b>Auto</b> and run a longer task. Ordinary calls go
              through; a call that matches a prohibited action, or that the
              verifier will not clear, stops and asks.
            </li>
            <li>
              Change the picker while a run is in flight. The new mode applies
              to that run immediately.
            </li>
            <li>
              Open Settings → Permissions to see which system grants Shinbo has.
              Its <b>Open Tools</b> button leads to where individual tools can
              be hidden.
            </li>
          </ol>
        </div>
      </div>

      <h3>The four modes</h3>
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
      <p className="copy">
        Ask and Accept edits behave the same for all 27 of Shinbo's own tools;
        the difference is file edits made by the harness. Auto uses a small{" "}
        <b>verifier</b> model to clear ordinary gated calls. If the verifier
        breaks, Auto degrades to Ask, never to Full access. During computer use,
        global Escape stops computer access while the agent keeps running.
      </p>

      <div className="cols-2">
        <div className="region">
          <div className="band band-head">
            <span className="label">Ten prohibited actions</span>
            <span className="tag">screened in Auto</span>
          </div>
          <div className="band">
            <ol className="copy">
              {prohibited.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
          </div>
        </div>
        <div className="stack">
          <div className="region">
            <div className="band band-head">
              <span className="label">Tools that ask</span>
              <span className="tag">7 of 27</span>
            </div>
            <div className="band">
              <div className="chips">
                {tools
                  .filter(([, gate]) => gate === "ask")
                  .map(([name]) => (
                    <span className="tag tag-accent" key={name}>
                      {name}
                    </span>
                  ))}
              </div>
              <p className="copy">
                Every other tool runs on its own in every mode. The full list is
                on <Link href="/docs/tools">Tools</Link>.
              </p>
            </div>
          </div>
          <div className="region">
            <div className="band band-head">
              <span className="label">Computer use</span>
              <span className="tag">no mode switches these off</span>
            </div>
            <div className="band">
              <dl className="kv">
                <dt>Computer access expires</dt>
                <dd>10 minutes</dd>
                <dt>Gap between actions</dt>
                <dd>at least 40 ms</dd>
                <dt>Characters per type</dt>
                <dd>4096</dd>
                <dt>Reaching an app</dt>
                <dd>granted by you, once, by name</dd>
                <dt>Computer control</dt>
                <dd>
                  top-right monitor icon and Stop; hover for action and app
                </dd>
                <dt>Escape</dt>
                <dd>global; revokes computer access for this turn</dd>
              </dl>
            </div>
            <div className="band">
              <p className="copy">
                <b>computer</b> asks per app even in Full access. A grant covers
                only the turn that asked; an unanswered prompt lapses after ten
                minutes. Shinbo reads what the app reports about itself through
                accessibility, not the screen. Every action is a log line and a
                trace span. There is no computer tool-call cap. Stop, global
                Escape, screen lock or sleep revoke computer access for the rest
                of the turn; the agent keeps running and cannot restart computer
                access until a new turn. Subagents cannot call computer; the
                parent does.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="cols-2">
        <div className="stack">
          <h3>System permissions</h3>
          <p className="copy">
            Settings → Permissions lists Accessibility, screen recording,
            microphone, speech recognition, automation, notifications and file
            access. Each row reads Granted, Not granted, Check in settings or
            Not required; expand it for what uses it, or click <b>Settings</b>{" "}
            to open the system pane. All are optional, and the set differs
            between macOS and Windows. If macOS shows Accessibility enabled but
            every action is refused, the grant belongs to an earlier build;
            Shinbo clears such stale Accessibility, Microphone and Screen
            Recording rows at startup so macOS asks again, and the computer tool
            raises the Accessibility prompt itself the first time it is refused.
            Turn Shinbo on and retry; no relaunch is needed, and Quick Ask
            restarts on its own. If an old build copy opens instead of the
            installed Shinbo, it says so and offers to open the installed copy.
          </p>
          <Shot
            src="/shots/settings-permissions.png"
            alt="Settings, Permissions: permission rows with status labels, individual Settings buttons and Open Tools at the foot"
            title="Permission settings"
            caption="Check access at a glance · expand a permission for its uses"
          />
        </div>
        <div className="stack">
          <h3>Pair a phone</h3>
          <p className="copy">
            Settings → Mobile pairs a phone: choose a PIN, click{" "}
            <b>Show pairing code</b>, and scan the QR code before it expires. Up
            to <b>three</b> phones at once. The iPhone client is built but not
            released, so this pairs nothing yet.
          </p>
          <Shot
            src="/shots/settings-mobile.png"
            alt="Settings, Mobile: Get Shinbo Mobile link and first-phone pairing form"
            title="Mobile settings"
            caption="First-phone pairing form · no PIN or pairing code generated · mobile app unreleased"
          />
        </div>
      </div>

      <div className="region">
        <div className="band band-head">
          <span className="label">Limits</span>
        </div>
        <div className="band">
          <ul className="copy">
            <li>
              No mode guarantees every action is safe or that no data leaves the
              device. Auto screens a list; it does not read intent.
            </li>
            <li>
              A subagent inherits the mode and cannot exceed it. Scheduled jobs
              run under the mode they were saved with.
            </li>
            <li>
              Computer access expires after ten minutes. App grants and input
              safeguards still apply throughout the turn.
            </li>
            <li>
              The headless <code>shinbo-cli</code> gates on the terminal, not on
              this permission channel.
            </li>
          </ul>
        </div>
      </div>

      <p className="copy">
        Related: <Link href="/docs/tools">Tools</Link> for hiding tools and the
        full gate list, <Link href="/docs/delegation">Delegation</Link> for what
        a subagent inherits, <Link href="/docs/jobs">Scheduled work</Link> for
        the mode a job runs under.
      </p>
    </>
  ),
};

export default doc;

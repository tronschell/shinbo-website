import { Link, Shot, surfaces } from "../shared";
import type { Doc } from "./types";

const doc: Doc = {
  slug: "surfaces",
  title: "Notch & surfaces",
  blurb:
    "Ask Shinbo from the notch, and work in a terminal, a browser, your voice or an artifact.",
  seo: {
    title: "Quick Ask on the notch, plus terminal, browser and voice",
    description:
      "Double-tap left Option or Alt to open Quick Ask on the notch or a Windows pill. Six surfaces: terminal, browser, voice, artifacts, goals and knowledge.",
  },
  shot: "/shots/notch-island.png",
  body: (
    <>
      <div className="head head-split">
        <div>
          <h2>Shinbo, anywhere, without leaving the app you are in.</h2>
        </div>
        <p className="lede">
          <b>Quick Ask</b> is a small island that opens over whatever you are
          doing, with a transcript, composer, model and mode pickers and live
          tok/s. Inside the workspace, six <b>surfaces</b> sit beside the
          thread: terminal, browser, voice, artifacts, goals and knowledge.
        </p>
      </div>

      <div className="region">
        <div className="band band-head">
          <span className="label">Try it</span>
        </div>
        <div className="band">
          <ol className="copy">
            <li>
              Double-tap <b>left Option</b> (macOS) or <b>left Alt</b>{" "}
              (Windows). On a Mac, Quick Ask opens on the camera housing; on
              Windows, a pill parks top-right in the work area until you drag
              it.
            </li>
            <li>Type a question. The answer streams in the island.</li>
            <li>
              Press <b>⌘1–⌘3</b> (Ctrl+1–3 on Windows) to run one of three saved
              quick actions. Sweep the cursor down through the notch and the
              same three hang under the island as orbs.
            </li>
            <li>
              Drag the island off the housing. It becomes a 44px chip; click the
              chip to reopen the island beside it.
            </li>
            <li>
              Settings → Quick Ask edits the three prompts, cursor orbs, swipe
              commands and placement. Settings → Keybinds changes the shortcuts.
            </li>
          </ol>
        </div>
      </div>

      <Shot
        src="/shots/notch-island.png"
        alt="Shinbo Quick Ask with an empty composer, Ask mode and no model selected"
        title="Quick Ask"
        caption="Fresh Quick Ask composer · no model selected"
      />

      <div className="cols-2">
        <div className="stack">
          <h3>How the notch works</h3>
          <p className="copy">
            On macOS the island is measured per display and sits on the real
            camera housing; a monitor without one gets a calibrated virtual
            notch. Closed, a transparent hotspot sits over the housing and is
            click-through until the cursor is inside, so the menu bar keeps
            working.
          </p>
          <p className="copy">
            Quick actions are a fixed ring of three, each a label and a prompt
            you edit in Settings → Quick Ask.
          </p>
          <p className="copy">
            A Quick Ask turn is an ordinary turn: it runs under the{" "}
            <Link href="/docs/control">permission mode</Link> you picked and can
            be queued, steered and stopped like any other.
          </p>
        </div>
        <Shot
          src="/shots/settings-quick-actions.png"
          alt="Shinbo Quick Ask settings with model, task and quick action controls"
          title="Quick Ask settings"
          caption="Configure Quick Ask and its actions"
        />
      </div>

      <h3>The six surfaces</h3>
      <div className="cards">
        {surfaces.map((s) => (
          <article key={s.label}>
            <span className="label">{s.label}</span>
            <h3>{s.title}</h3>
            <p>{s.copy}</p>
          </article>
        ))}
      </div>

      <div className="cols-2">
        <div className="stack">
          <h3>Artifacts</h3>
          <p className="copy">
            The <b>artifact</b> tool writes a file the conversation can keep:
            markdown, code, html, app, svg, mermaid or react. HTML pages render
            under their own CSP. A code artifact that names a surface is mounted
            as a real module inside Shinbo's interface.
          </p>
          <p className="copy">
            Long Markdown and source-code previews have a minimap on the left
            showing a scaled copy of the rendered content and your visible
            position. The miniature pans as you scroll through long documents.
            Click to jump or drag to scroll. With the minimap focused, use the
            arrow, Page Up, Page Down, Home and End keys to navigate. It appears
            in file previews and artifact viewers only when the content
            overflows.
          </p>
          <p className="copy">
            A code artifact can also replace one of four interface regions —{" "}
            <code>navbar</code>, <code>chat</code>, <code>notch</code> or{" "}
            <code>context</code> — by exporting{" "}
            <code>(api) =&gt; Component</code>. If the replacement throws, the
            built-in returns at once. This is a controlled swap of named
            regions, not free modification of the app.
          </p>
        </div>
        <div className="stack">
          <h3>Review changes</h3>
          <p className="copy">
            Changes and Git open in a resizable pane beside the conversation.
            Opening either collapses Context; closing it restores the previous
            Context state. In Changes, unchanged lines collapse into expandable
            rows so edits are visible first. Click a row, or focus it and press
            Enter or Space, to show or hide its context.
          </p>
          <h3>Terminal, browser, voice</h3>
          <p className="copy">
            The terminal opens up to <b>eight</b> login shells in the thread's
            folder; select output to turn it into a context chip. The browser is
            one Chromium session per thread with its own cookies, docked or
            floating as a picture-in-picture. Voice is off until you enable it.
            Recording stays local and transcription runs through
            Speech.framework on macOS, SAPI on Windows, or llama.cpp on
            loopback.
          </p>
        </div>
      </div>

      <Shot
        src="/shots/document-minimap.png"
        alt="Shinbo Markdown preview with the development guide and a left-side document minimap"
        title="Document minimap"
        caption="Real app · local development guide preview"
      />

      <div className="region">
        <div className="band band-head">
          <span className="label">Limits</span>
        </div>
        <div className="band">
          <ul className="copy">
            <li>
              Quick Ask on the notch, the Mac permission flows and local voice
              are Mac-first. Windows has the pill and Alt shortcut; do not
              assume full parity.
            </li>
            <li>
              Quick Ask needs the Accessibility grant on macOS before it can
              open.
            </li>
            <li>Three quick actions, no more. The ring is not extensible.</li>
            <li>
              Voice refuses any non-local transcription endpoint, when saved and
              again before use.
            </li>
          </ul>
        </div>
      </div>

      <p className="copy">
        Related: <Link href="/docs/knowledge">Knowledge</Link> for the sixth
        surface, <Link href="/docs/plan">Plan</Link> for goals,{" "}
        <Link href="/docs/control">Control</Link> for the Accessibility grant
        and the modes a Quick Ask turn runs under.
      </p>
    </>
  ),
};

export default doc;

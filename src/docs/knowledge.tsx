import { Link, Shot } from "../shared";
import type { Doc } from "./types";

const doc: Doc = {
  slug: "knowledge",
  title: "Knowledge",
  blurb:
    "Shinbo saves what it learns as Markdown notes in an Obsidian vault or plain folder you own.",
  seo: {
    title: "Markdown notes, straight into your Obsidian vault",
    description:
      "The keep tool writes one Markdown note per save into an Obsidian vault or any folder: YAML front matter, four kinds, 256 KiB notes, 8 MiB attachments. No database.",
  },
  shot: "/shots/knowledge-base.png",
  body: (
    <>
      <div className="head head-split">
        <div>
          <h2>Notes you can walk away with.</h2>
        </div>
        <p className="lede">
          The <b>keep</b> tool saves one Markdown note per save into a folder
          you choose — an Obsidian vault or any plain directory. The folder is
          the store. There is no mirror and no database, so the notes stay yours
          if you stop using Shinbo.
        </p>
      </div>

      <div className="region">
        <div className="band band-head">
          <span className="label">Try it</span>
        </div>
        <div className="band">
          <ol className="copy">
            <li>
              Open the Knowledge surface beside a thread. On a fresh workspace
              it asks you to choose a vault.
            </li>
            <li>
              Pick your Obsidian vault, or any folder. Notes land under{" "}
              <code>&lt;vault&gt;/knowledge-base</code> by default.
            </li>
            <li>
              Ask Shinbo to keep something — a page, a note, a selection or a
              screenshot. It writes one <code>.md</code> file with front matter,
              attachments beside it.
            </li>
            <li>
              Open the file in Obsidian or any editor. The note tagger fills in
              a title and tags shortly after the file lands.
            </li>
          </ol>
        </div>
      </div>

      <div className="cols-2">
        <div className="stack">
          <h3>What a note contains</h3>
          <p className="copy">
            Every note starts with YAML <b>front matter</b>: title, kind, date,
            source, application and tags. The body is the kept text. Images go
            next to the note as ordinary files.
          </p>
          <p className="copy">
            The target path is checked to be inside the folder before anything
            is written. Each note goes to a temporary file first and is then
            renamed into place, so a failed save leaves no half-written note.
          </p>
        </div>
        <dl className="kv region">
          <dt>Store</dt>
          <dd>
            <span className="brandcell">
              <img className="mark" src="/brands/obsidian.svg" alt="" />
              Obsidian vault or plain folder
            </span>
          </dd>
          <dt>Default folder</dt>
          <dd>
            <code>&lt;vault&gt;/knowledge-base</code>
          </dd>
          <dt>Kinds</dt>
          <dd>page · note · selection · screenshot</dd>
          <dt>Note ceiling</dt>
          <dd>256 KiB body</dd>
          <dt>Attachment ceiling</dt>
          <dd>8 MiB per image</dd>
        </dl>
      </div>

      <Shot
        src="/shots/knowledge-base.png"
        alt="Empty Shinbo knowledge base with no vault configured"
        title="The knowledge base"
        caption="Fresh workspace · choose a vault to begin saving notes"
      />

      <div className="cols-2">
        <div className="stack">
          <h3>Note tagger</h3>
          <p className="copy">
            After a note lands, the <b>note tagger</b> gives it a title and tags
            using its configured model. That call goes to the model's provider,
            so saving to a local folder does not by itself make processing
            offline.
          </p>
        </div>
        <div className="stack">
          <h3>Memory is separate</h3>
          <p className="copy">
            The <b>memory</b> tool is a different store: Shinbo's own{" "}
            <code>/memories</code> notes, carried between conversations. The
            agent can view, create, edit, insert into, delete and rename them.
            Knowledge is for you; memory is for the agent. Neither promises
            complete recall.
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
              A note body is capped at 256 KiB and an image at 8 MiB; larger
              material needs splitting.
            </li>
            <li>
              The tagger sends note text to its configured model after the save.
              Point it at a local model if the text must stay on the machine.
            </li>
            <li>
              A saved note is a file, not active context. Give the agent its
              path when you want it read.
            </li>
          </ul>
        </div>
      </div>

      <h3>Reuse a decision in another task</h3>
      <p className="copy">
        Ask Shinbo to keep a short decision, its reason and any source paths.
        Open the resulting Markdown file and check what was saved. In a later
        thread, give its path and ask the agent to read it before starting the
        next task, and check that the answer uses it. The handoff is the file
        path; nothing is recalled on its own.
      </p>
      <p className="copy">
        A <Link href="/docs/delegation">thread</Link> records the conversation;
        a note is a separate file in your folder. Archived threads are deleted
        after 30 days, so a decision worth keeping belongs in a note, backed up
        like the rest of your files.
      </p>

      <p className="copy">
        Related: <Link href="/docs/surfaces">Notch &amp; surfaces</Link> for the
        other five surfaces, <Link href="/docs/models">Models</Link> for the
        note tagger's model, <Link href="/docs/tools">Tools</Link> for the keep
        and memory tools.
      </p>
    </>
  ),
};

export default doc;

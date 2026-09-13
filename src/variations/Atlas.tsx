import {
  BrandRow,
  DownloadGuide,
  FeatureDirectory,
  Questions,
  useReveal,
} from "./common";
import "./atlas.css";

export default function Atlas() {
  useReveal();
  return (
    <div className="v-atlas">
      <a className="at-skip" href="#at-main">
        Skip to content
      </a>
      <header className="at-nav at-wrap">
        <a className="at-logo" href="/variations/6" aria-label="Shinbo home">
          <img src="/shinbo.svg" alt="" width="28" height="28" /> shinbo
        </a>
        <nav aria-label="Primary navigation">
          <a href="#at-explore">Explore</a>
          <a href="#features">Features</a>
          <a href="/docs">Docs ↗</a>
        </nav>
        <a className="at-button at-button-small" href="#download">
          Get Shinbo <span aria-hidden="true">↗</span>
        </a>
      </header>
      <main id="at-main">
        <section className="at-hero at-wrap" aria-labelledby="at-title">
          <div className="at-hero-top">
            <p className="at-label">A desktop workspace for your AI agents</p>
            <span className="at-label">Free &amp; open source / v0.8.2</span>
          </div>
          <div className="at-hero-copy">
            <h1 id="at-title">
              Many agents.
              <br />
              <span>One place to make.</span>
            </h1>
            <div>
              <p>
                Meet Shinbo. Bring your agent CLIs, models and tools into a
                shared workspace. Plan the work, hand it off, and see how it
                happened.
              </p>
              <a className="at-text-link" href="#download">
                Find your download <span aria-hidden="true">↗</span>
              </a>
              <small>Apple silicon Mac + Windows x64</small>
            </div>
          </div>
          <div className="at-mosaic">
            <figure className="at-main-shot">
              <div className="at-photo at-photo-hero">
                <span className="at-sticker">Your workspace, opened up.</span>
                <img
                  src="/shots/workspace-thread.png"
                  alt="Shinbo workspace showing an illustrative website launch conversation and context inspector"
                  fetchPriority="high"
                />
              </div>
              <figcaption>
                <span>01 / The workspace</span>
                <a href="/docs/surfaces">Take a closer look ↗</a>
              </figcaption>
            </figure>
            <div className="at-side-stack">
              <div className="at-note">
                <span className="at-label">A harness for your harnesses</span>
                <p>
                  Use the agents
                  <br />
                  you already
                  <br />
                  <em>work with.</em>
                </p>
                <span className="at-note-star" aria-hidden="true">
                  ✳
                </span>
              </div>
              <figure>
                <div className="at-photo at-photo-mini">
                  <img
                    src="/shots/agent-import.png"
                    alt="Shinbo Imports settings listing installed Codex, Claude, Pi and OpenCode configurations"
                    loading="lazy"
                  />
                </div>
                <figcaption>02 / Connect installed configurations</figcaption>
              </figure>
            </div>
          </div>
          <p className="at-source-note">
            Screens from the current source. Some features may be newer than the
            public release; Mac-specific surfaces are not a promise of Windows
            parity.
          </p>
          <div className="at-integrations" data-reveal>
            <p className="at-label">
              Your installed agents.
              <br />
              Their own sign-ins.
            </p>
            <BrandRow />
          </div>
        </section>

        <section
          className="at-explore at-wrap"
          id="at-explore"
          aria-labelledby="at-explore-title"
        >
          <div className="at-section-heading" data-reveal>
            <p className="at-label">A little map of what’s possible</p>
            <h2 id="at-explore-title">Follow your curiosity.</h2>
            <p>
              Start with what you want to do. The details are one click away.
            </p>
          </div>
          <nav
            className="at-chapters"
            aria-label="Explore by category"
            data-reveal
          >
            <a href="#at-orchestrate">
              <span>01</span> Orchestrate <b aria-hidden="true">↙</b>
            </a>
            <a href="#at-create">
              <span>02</span> Create <b aria-hidden="true">↙</b>
            </a>
            <a href="#at-understand">
              <span>03</span> Understand <b aria-hidden="true">↙</b>
            </a>
          </nav>
          <article
            className="at-chapter at-orchestrate"
            id="at-orchestrate"
            data-reveal
          >
            <div className="at-chapter-copy">
              <p className="at-label">01 / Orchestrate</p>
              <h3>
                Give the work
                <br />a way forward.
              </h3>
              <p>
                A plan shows what depends on what. Delegate independent work to
                subagents, follow their progress, and bring results back into
                the conversation.
              </p>
              <a className="at-text-link" href="/docs/plan">
                Explore plans &amp; dependencies ↗
              </a>
              <a className="at-minor-link" href="/docs/delegation">
                How delegation works ↗
              </a>
            </div>
            <figure>
              <div className="at-photo at-photo-plan">
                <img
                  src="/shots/plan-subagents.png"
                  alt="Illustrative four-node plan in the Run sidebar: one done, two running and one waiting"
                  loading="lazy"
                />
              </div>
              <figcaption>03 / Four illustrative plan steps</figcaption>
            </figure>
          </article>
          <article className="at-chapter at-create" id="at-create" data-reveal>
            <figure>
              <div className="at-photo at-photo-create">
                <img
                  src="/shots/knowledge-base.png"
                  alt="Empty Shinbo knowledge base with no vault configured"
                  loading="lazy"
                />
              </div>
              <figcaption>04 / Choose a vault to start saving notes</figcaption>
            </figure>
            <div className="at-chapter-copy">
              <p className="at-label">02 / Create</p>
              <h3>
                Make something
                <br />
                you can keep.
              </h3>
              <p>
                Work with artifacts beside your conversation. Save notes as
                Markdown in an Obsidian vault or a plain folder, with
                attachments alongside them. Extend the workspace with tools,
                MCP, skills and generated interfaces.
              </p>
              <a className="at-text-link" href="/docs/knowledge">
                Explore knowledge &amp; notes ↗
              </a>
              <a className="at-minor-link" href="/docs/tools">
                Tools, skills &amp; interfaces ↗
              </a>
            </div>
          </article>
          <article
            className="at-chapter at-understand"
            id="at-understand"
            data-reveal
          >
            <div className="at-chapter-copy">
              <p className="at-label">03 / Understand</p>
              <h3>
                Keep the
                <br />
                work in view.
              </h3>
              <p>
                Inspect tool calls, model steps, context and retained traces.
                Choose a permission mode that fits the task. Examine evidence
                before proposing a repair, then compare it with paired replay.
              </p>
              <a className="at-text-link" href="/docs/agent">
                Explore traces &amp; improvement ↗
              </a>
              <a className="at-minor-link" href="/docs/control">
                Permissions &amp; computer control ↗
              </a>
            </div>
            <figure>
              <div className="at-photo at-photo-understand">
                <img
                  src="/shots/self-improvement-models.png"
                  alt="Shinbo Self improvement panel with no finished turns or run evidence"
                  loading="lazy"
                />
              </div>
              <figcaption>
                05 / No finished runs in this fresh profile
              </figcaption>
            </figure>
          </article>
        </section>

        <section className="at-schedule" aria-labelledby="at-schedule-title">
          <div className="at-wrap at-schedule-inner" data-reveal>
            <div>
              <p className="at-label">And when the work comes around again</p>
              <h2 id="at-schedule-title">Make it a workflow.</h2>
              <p>
                Combine agent, script, set and if nodes. Put a workflow on a
                schedule, then inspect the runs when you return.
              </p>
              <a className="at-text-link" href="/docs/jobs">
                Explore scheduled workflows ↗
              </a>
            </div>
            <figure>
              <div className="at-photo at-photo-schedule">
                <img
                  src="/shots/scheduled-graph.png"
                  alt="Paused example weekly project brief with one agent node and no runs yet"
                  loading="lazy"
                />
              </div>
              <figcaption>06 / A paused weekly example</figcaption>
            </figure>
          </div>
        </section>

        <div className="at-directory at-wrap" data-reveal>
          <FeatureDirectory />
        </div>
        <section
          className="at-get at-wrap"
          aria-label="Download and setup"
          data-reveal
        >
          <div className="at-get-intro">
            <p className="at-label">Your next step</p>
            <h2>
              Find your fit.
              <br />
              <em>Then get going.</em>
            </h2>
            <p>
              Shinbo is free and open source. Your model usage and paid agent
              subscriptions are billed separately by their providers.
            </p>
            <ol>
              <li>
                <b>01</b>
                <span>Choose the installer for your computer.</span>
              </li>
              <li>
                <b>02</b>
                <span>Have an OpenRouter API key ready for first launch.</span>
              </li>
              <li>
                <b>03</b>
                <span>
                  Connect your models and sign into the agent CLIs you use.
                </span>
              </li>
            </ol>
            <a
              className="at-text-link"
              href="https://github.com/tronschell/shinbo"
            >
              Or explore the source ↗
            </a>
          </div>
          <DownloadGuide />
        </section>
        <div className="at-faq at-wrap" data-reveal>
          <Questions />
        </div>
      </main>
      <footer className="at-footer">
        <div className="at-wrap">
          <div className="at-footer-top">
            <a className="at-logo" href="#at-title">
              <img src="/shinbo.svg" alt="" width="28" height="28" /> shinbo
            </a>
            <p>
              An open workspace.
              <br />
              For whatever comes next.
            </p>
            <nav aria-label="Footer navigation">
              <a href="/docs">Documentation ↗</a>
              <a href="https://github.com/tronschell/shinbo">GitHub ↗</a>
              <a href="/#roadmap">Roadmap ↗</a>
              <a href="#download">Downloads ↗</a>
              <a href="#questions">Questions ↗</a>
            </nav>
          </div>
          <div className="at-footer-bottom">
            <span>Free &amp; open source.</span>
            <span>Mac ARM · Windows x64</span>
            <a href="/llms.txt">Machine-readable guide ↗</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

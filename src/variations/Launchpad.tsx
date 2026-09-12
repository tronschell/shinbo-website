import { Mark } from "../shared";
import { docs } from "../docs";
import {
  BrandRow,
  DownloadGuide,
  FeatureDirectory,
  Questions,
  useReveal,
} from "./common";
import "./launchpad.css";

const REPO = "https://github.com/tronschell/shinbo";

export default function Launchpad() {
  useReveal();
  return (
    <div className="v-launchpad">
      <a className="skip" href="#lp-main">
        Skip to content
      </a>
      <header className="lp-nav lp-wrap">
        <a href="/" className="lp-brand">
          <Mark size={28} />
          <span>
            shinbo<span className="lp-brand-dot">.</span>
          </span>
        </a>
        <nav aria-label="Primary">
          <a href="#lp-features">What it does</a>
          <a href="#lp-start">Get started</a>
          <a href="/docs">Documentation</a>
        </nav>
        <a className="lp-nav-download" href="#download">
          Get Shinbo <span aria-hidden="true">↗</span>
        </a>
      </header>
      <main id="lp-main">
        <section className="lp-hero lp-wrap">
          <div className="lp-hero-copy">
            <p className="lp-kicker">
              <span className="lp-live" /> Free & open source · Your desktop AI
              workspace
            </p>
            <h1>
              Your agents.
              <br />
              One workspace.
              <br />
              <span>Let’s get to work.</span>
            </h1>
            <p className="lp-lead">
              Shinbo brings AI models, coding agents and tools together on your
              desktop. Delegate a task, automate a workflow, and see exactly
              what happened.
            </p>
            <a className="lp-text-link" href="#lp-workspace">
              Take a look inside <span aria-hidden="true">↓</span>
            </a>
          </div>
          <aside
            className="lp-download"
            aria-label="Get the right Shinbo download"
          >
            <div className="lp-download-top">
              <span className="lp-kicker">Start here</span>
              <span aria-hidden="true">↘</span>
            </div>
            <DownloadGuide />
          </aside>
        </section>
        <section
          className="lp-workspace lp-wrap"
          id="lp-workspace"
          aria-labelledby="lp-workspace-title"
        >
          <div className="lp-preview-bar">
            <p id="lp-workspace-title">Meet your new home for AI work</p>
            <span>Actual Shinbo interface</span>
          </div>
          <figure className="lp-stage" data-reveal>
            <div className="lp-stage-label">
              <span aria-hidden="true">✳</span> Everything has a place.
            </div>
            <img
              src="/shots/workspace-thread.png"
              alt="Shinbo workspace showing an illustrative website launch conversation and context inspector"
              width="2760"
              height="1720"
              fetchPriority="high"
            />
            <figcaption>
              <span>01 / Example workspace</span>
              <span>02 / Illustrative conversation</span>
              <span>03 / Context inspector</span>
            </figcaption>
          </figure>
          <div className="lp-compatible" data-reveal>
            <p>Your tools, brought together.</p>
            <BrandRow />
          </div>
        </section>
        <section className="lp-start lp-wrap" id="lp-start" data-reveal>
          <div className="lp-section-heading">
            <p className="lp-kicker">From download to first task</p>
            <h2>
              Make yourself
              <br />
              at home.
            </h2>
            <p>
              Three steps in the app. Then you can add more models, connect a
              vault and make Shinbo your own.
            </p>
          </div>
          <ol className="lp-steps">
            <li>
              <span className="lp-step-number">01</span>
              <div>
                <h3>Connect your key.</h3>
                <p>
                  Shinbo verifies an OpenRouter API key before you continue.
                  Optional subscriptions connect your existing accounts; they do
                  not replace this required key.
                </p>
                <a href="/docs/models">Understand models & costs ↗</a>
              </div>
            </li>
            <li>
              <span className="lp-step-number">02</span>
              <div>
                <h3>Choose your permissions.</h3>
                <p>
                  Review what each Mac permission enables. You can skip optional
                  grants now and enable them when a task needs them.
                </p>
                <a href="/docs/control">See how permissions work ↗</a>
              </div>
            </li>
            <li>
              <span className="lp-step-number">03</span>
              <div>
                <h3>Meet Quick Ask.</h3>
                <p>
                  Try the quick interface or head straight to your workspace.
                  With Accessibility enabled, double-tap left Option to bring it
                  up.
                </p>
                <a href="/docs/surfaces">Explore Quick Ask & surfaces ↗</a>
              </div>
            </li>
          </ol>
        </section>
        <section
          className="lp-possibilities"
          aria-labelledby="lp-possibilities-title"
        >
          <div className="lp-wrap">
            <div className="lp-section-heading">
              <p className="lp-kicker">Start with what you want to do</p>
              <h2 id="lp-possibilities-title">
                One app.
                <br />
                More ways forward.
              </h2>
            </div>
            <div className="lp-usecases">
              <article className="lp-usecase lp-usecase-wide" data-reveal>
                <div className="lp-usecase-copy">
                  <span className="lp-kicker">Bring your coding agents</span>
                  <h3>
                    Let the right agent
                    <br />
                    take the next step.
                  </h3>
                  <p>
                    Run Claude Code, Codex, Pi, OpenCode, Gemini CLI,
                    Antigravity CLI and Cursor CLI through Shinbo. Carry
                    successful results into the next handoff.
                  </p>
                  <a href="/docs/harness">Explore the harness ↗</a>
                </div>
                <figure className="lp-card-stage lp-card-stage-orange">
                  <img
                    src="/shots/agent-import.png"
                    alt="Shinbo Imports settings listing installed Codex, Claude, Pi and OpenCode configurations"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              </article>
              <article className="lp-usecase" data-reveal>
                <div className="lp-usecase-copy">
                  <span className="lp-kicker">Give repeat work a schedule</span>
                  <h3>
                    Put the routine
                    <br />
                    on repeat.
                  </h3>
                  <p>
                    Build a workflow with agent, script, variable and condition
                    steps. Run it on a schedule and inspect its thread.
                  </p>
                  <a href="/docs/jobs">Explore scheduled work ↗</a>
                </div>
                <figure className="lp-card-stage lp-card-stage-blue">
                  <img
                    src="/shots/scheduled-graph.png"
                    alt="Paused example weekly project brief with one agent node and no runs yet"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              </article>
              <article className="lp-usecase" data-reveal>
                <div className="lp-usecase-copy">
                  <span className="lp-kicker">Keep what you learn</span>
                  <h3>
                    Useful knowledge.
                    <br />
                    In your own files.
                  </h3>
                  <p>
                    Save notes as Markdown in a folder or Obsidian vault. Your
                    knowledge stays in a format you can keep using.
                  </p>
                  <a href="/docs/knowledge">Explore knowledge & memory ↗</a>
                </div>
                <figure className="lp-card-stage lp-card-stage-green">
                  <img
                    src="/shots/knowledge-base.png"
                    alt="Empty Shinbo knowledge base with no vault configured"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              </article>
            </div>
          </div>
        </section>
        <section className="lp-directory lp-wrap" id="lp-features" data-reveal>
          <div className="lp-section-heading">
            <p className="lp-kicker">The complete picture</p>
            <h2>
              Find your next
              <br />
              “it can do that?”
            </h2>
            <p>
              From plans and subagents to model choices and self-improvement.
              Every feature has a guide.
            </p>
          </div>
          <FeatureDirectory />
        </section>
        <section className="lp-reality lp-wrap" data-reveal>
          <div>
            <p className="lp-kicker">Built in the open</p>
            <h2>
              Know what
              <br />
              you’re getting.
            </h2>
            <a className="lp-text-link" href="/#roadmap">
              Read the current roadmap ↗
            </a>
          </div>
          <div className="lp-reality-list">
            <div>
              <span>Available today</span>
              <p>
                Mac downloads for Apple silicon and an unsigned Windows x64
                installer. The app is free; providers bill model usage and
                subscriptions separately.
              </p>
            </div>
            <div>
              <span>Still in progress</span>
              <p>
                The native GPUI rewrite is underway. Context reinjection and
                pruning are experimental and ship off.
              </p>
            </div>
            <div>
              <span>Other devices</span>
              <p>
                The iPhone client is built but unreleased. Intel Mac and Linux
                desktop downloads are unavailable.
              </p>
            </div>
          </div>
        </section>
        <section className="lp-questions lp-wrap" data-reveal>
          <div className="lp-section-heading">
            <p className="lp-kicker">Before you dive in</p>
            <h2>
              Good questions.
              <br />
              Straight answers.
            </h2>
          </div>
          <Questions />
        </section>
        <section className="lp-final">
          <div className="lp-wrap" data-reveal>
            <span className="lp-kicker">Your next project starts here</span>
            <h2>
              Bring your curiosity.
              <br />
              <span>We’ll bring the workspace.</span>
            </h2>
            <a className="lp-final-button" href="#download">
              Find your download <span aria-hidden="true">↗</span>
            </a>
            <p>Free & open source. Yours to explore.</p>
          </div>
        </section>
      </main>
      <footer className="lp-footer lp-wrap">
        <div className="lp-footer-top">
          <a href="/" className="lp-brand">
            <Mark size={28} />
            <span>shinbo.</span>
          </a>
          <p>An open-source desktop workspace for AI agents.</p>
          <a href={REPO}>Built in the open ↗</a>
        </div>
        <nav aria-label="Feature documentation">
          {docs.map((doc) => (
            <a key={doc.slug} href={`/docs/${doc.slug}`}>
              {doc.title}
            </a>
          ))}
        </nav>
        <div className="lp-footer-bottom">
          <span>Shinbo · Free & open source</span>
          <a href="/llms.txt">For AI readers</a>
          <a href="/variations">Compare all six concepts ↗</a>
        </div>
      </footer>
    </div>
  );
}

import {
  BrandRow,
  DownloadGuide,
  FeatureDirectory,
  Questions,
  useReveal,
} from "./common";
import "./workflows.css";

const workflows = [
  {
    id: "build",
    n: "01",
    label: "Build with your agents",
    title: "Give the work a plan. Give each agent a part.",
    copy: "Bring the coding agents you already use into one thread. Delegate focused tasks, follow the dependency graph, and inspect what each run produced before moving on.",
    start:
      "Connect an installed agent CLI, open a project, and describe the change you want.",
    link: "harness",
    image: "plan-subagents.png",
    alt: "Illustrative four-node plan in the Run sidebar: one done, two running and one waiting",
    caption:
      "Four example steps in the Run sidebar: one done, two running, one waiting.",
    plate: 4,
  },
  {
    id: "learn",
    n: "02",
    label: "Keep what you learn",
    title: "Turn a useful answer into knowledge you can keep.",
    copy: "Research with the tools available in your workspace, then save useful findings into an Obsidian vault or a plain folder. Your notes are Markdown files, with their attachments beside them.",
    start:
      "Choose a knowledge folder, then ask Shinbo to save the result of a conversation.",
    link: "knowledge",
    image: "knowledge-base.png",
    alt: "Empty Shinbo knowledge base with no vault configured",
    caption: "Fresh knowledge base, before a vault has been configured.",
    plate: 7,
  },
  {
    id: "repeat",
    n: "03",
    label: "Set up recurring work",
    title: "Make the repeatable part a workflow.",
    copy: "Combine agent steps, scripts, values and conditions in a scheduled workflow. Open the run history to see what happened and follow the output back to the work.",
    start:
      "Define a small workflow, run it once, review its output, then give it a schedule.",
    link: "jobs",
    image: "scheduled-graph.png",
    alt: "Paused example weekly project brief with one agent node and no runs yet",
    caption:
      "One paused example workflow, with a single agent node and no runs yet.",
    plate: 2,
  },
  {
    id: "inspect",
    n: "04",
    label: "Stay in control",
    title: "Know what your agents are allowed to do.",
    copy: "Choose an approval mode, inspect tool calls and follow model steps. On Mac, computer control adds app grants and its own guardrails. Start with the permissions your task needs.",
    start:
      "Review the Ask, Accept edits, Auto and Full access modes before running a task.",
    link: "control",
    image: "settings-permissions.png",
    alt: "Shinbo Permissions settings showing macOS access statuses and links to system settings",
    caption:
      "Permissions are part of the workspace, with platform-specific controls.",
    plate: 6,
  },
];

export default function Workflows() {
  useReveal();
  return (
    <div className="v-workflows">
      <a className="wf-skip" href="#wf-main">
        Skip to content
      </a>
      <header className="wf-header wf-wrap">
        <a className="wf-brand" href="#wf-main" aria-label="Shinbo home">
          <img src="/shinbo.svg" alt="" width="27" height="27" /> shinbo
          <span className="wf-brand-note">A workspace for your agents</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#wf-paths">Find your workflow</a>
          <a href="/docs">Documentation ↗</a>
          <a className="wf-nav-download" href="#download">
            Get Shinbo ↓
          </a>
        </nav>
      </header>
      <main id="wf-main">
        <section className="wf-hero wf-wrap">
          <div className="wf-hero-copy">
            <p className="wf-kicker">Open-source desktop agent workspace</p>
            <h1>
              What would you
              <br />
              like to get <em>done?</em>
            </h1>
            <p className="wf-lead">
              Shinbo brings your coding agents, models and tools into one
              workspace. Plan the work, keep the context, and see what happens
              along the way.
            </p>
            <div className="wf-actions">
              <a className="wf-button" href="#download">
                Find my download <span>↗</span>
              </a>
              <a className="wf-text-link" href="#wf-paths">
                Explore the workflows ↓
              </a>
            </div>
            <p className="wf-small">
              Free app · Bring your provider accounts · Mac &amp; Windows builds
            </p>
          </div>
          <nav
            className="wf-paths"
            id="wf-paths"
            aria-label="Choose a workflow"
          >
            <p className="wf-kicker">Start with your goal</p>
            {workflows.map((flow) => (
              <a href={`#wf-${flow.id}`} key={flow.id}>
                <span className="wf-number">{flow.n}</span>
                <span>{flow.label}</span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
            <p className="wf-paths-note">
              One workspace. A few good places to begin.
            </p>
          </nav>
        </section>
        <section
          className="wf-showcase wf-wrap"
          aria-label="See the Shinbo workspace"
        >
          <div className="wf-showcase-top">
            <span>Your work, with the context still attached.</span>
            <span>THE WORKSPACE / 01</span>
          </div>
          <figure data-reveal>
            <div className="wf-hero-stage">
              <img
                src="/shots/workspace-thread.png"
                alt="Shinbo workspace showing an illustrative website launch conversation and context inspector"
                width="2760"
                height="1720"
                fetchPriority="high"
              />
            </div>
            <figcaption>
              Fresh app capture with an illustrative conversation. Documentation
              can show changes newer than the public release.
            </figcaption>
          </figure>
          <div className="wf-agents" data-reveal>
            <p className="wf-kicker">Works with your installed agent CLIs</p>
            <BrandRow />
          </div>
        </section>
        <div className="wf-stories wf-wrap">
          <div className="wf-section-head" data-reveal>
            <p className="wf-kicker">From intention to a useful result</p>
            <h2>Find your way into the work.</h2>
            <p>
              You don’t need to learn every feature first. Start with one task,
              then add the tools that help.
            </p>
          </div>
          {workflows.map((flow) => (
            <section
              className="wf-story"
              data-reveal
              id={`wf-${flow.id}`}
              key={flow.id}
              aria-labelledby={`wf-title-${flow.id}`}
            >
              <div className="wf-story-copy">
                <p className="wf-kicker">
                  <span className="wf-number">{flow.n}</span>
                  {flow.label}
                </p>
                <h2 id={`wf-title-${flow.id}`}>{flow.title}</h2>
                <p>{flow.copy}</p>
                <div className="wf-first-step">
                  <strong>Start here</strong>
                  <p>{flow.start}</p>
                </div>
                <a className="wf-text-link" href={`/docs/${flow.link}`}>
                  Read the {flow.link === "jobs" ? "workflow" : flow.link} guide
                  ↗
                </a>
              </div>
              <figure className={`wf-story-figure wf-plate-${flow.plate}`}>
                <div className="wf-story-stage">
                  <a
                    href={`/shots/${flow.image}`}
                    aria-label={`View full screenshot: ${flow.alt}`}
                  >
                    <img
                      src={`/shots/${flow.image}`}
                      alt={flow.alt}
                      loading="lazy"
                    />
                  </a>
                </div>
                <figcaption>
                  <span>{flow.n} / IN THE APP</span>
                  {flow.caption}
                </figcaption>
              </figure>
            </section>
          ))}
        </div>
        <section className="wf-get-started">
          <div className="wf-wrap wf-setup-grid" data-reveal>
            <div className="wf-setup-copy">
              <p className="wf-kicker">A clear first step</p>
              <h2>
                Get your workspace
                <br />
                ready for the work.
              </h2>
              <p>
                Choose the installer that matches your computer. Then connect
                the services you want Shinbo to work with.
              </p>
              <ol>
                <li>
                  <span>01</span>
                  <div>
                    <h3>Install the app</h3>
                    <p>
                      Apple silicon Mac or Windows x64. Check the platform notes
                      alongside your download.
                    </p>
                  </div>
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <h3>Connect your accounts</h3>
                    <p>
                      The current setup requires an OpenRouter key. Agent CLIs
                      use their own sign-ins; provider usage is billed
                      separately.
                    </p>
                  </div>
                </li>
                <li>
                  <span>03</span>
                  <div>
                    <h3>Try one focused task</h3>
                    <p>
                      Pick a workflow above. Choose permissions, describe the
                      result, then inspect the run.
                    </p>
                  </div>
                </li>
              </ol>
              <a className="wf-text-link" href="/docs/models">
                Understand model connections ↗
              </a>
            </div>
            <DownloadGuide />
          </div>
        </section>
        <div className="wf-directory wf-wrap" data-reveal>
          <FeatureDirectory />
        </div>
        <div className="wf-faq wf-wrap" data-reveal>
          <div className="wf-faq-intro">
            <p className="wf-kicker">Good questions deserve useful answers</p>
            <h2>
              Know what
              <br />
              you’re getting.
            </h2>
            <p>
              Shinbo is a desktop workspace that can call other agent harnesses.
              The code is open, and the documentation explains how the pieces
              fit.
            </p>
            <a
              className="wf-text-link"
              href="https://github.com/tronschell/shinbo"
            >
              Explore the source ↗
            </a>
          </div>
          <Questions />
        </div>
      </main>
      <footer className="wf-footer wf-wrap">
        <a className="wf-brand" href="#wf-main">
          <span aria-hidden="true">✳</span> shinbo
        </a>
        <p>Your agents. Your context. Your next step.</p>
        <nav aria-label="Footer navigation">
          <a href="/docs">Docs</a>
          <a href="https://github.com/tronschell/shinbo">GitHub ↗</a>
          <a href="#download">Download ↓</a>
        </nav>
      </footer>
    </div>
  );
}

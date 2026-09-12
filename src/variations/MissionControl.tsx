import { useState } from "react";
import { Apple, Mark } from "../shared";
import {
  BrandRow,
  DownloadGuide,
  FeatureDirectory,
  Questions,
  useReveal,
} from "./common";
import "./mission-control.css";

const screens = [
  {
    name: "Workspace",
    glyph: "▦",
    src: "/shots/workspace-thread.png",
    title: "The whole job. In one place.",
    copy: "Projects and threads on the left. Your conversation in the middle. Context and run details in an inspector you can arrange.",
    alt: "Shinbo workspace showing an illustrative website launch conversation and context inspector",
    link: "/docs/delegation",
    plate: 3,
  },
  {
    name: "Imports",
    glyph: "⇄",
    src: "/shots/agent-import.png",
    title: "Bring your existing setup.",
    copy: "Choose which installed agent configurations to reference. Shinbo can use their skills and MCP settings by path.",
    alt: "Shinbo Imports settings listing installed Codex, Claude, Pi and OpenCode configurations",
    link: "/docs/harness",
    plate: 2,
  },
  {
    name: "Plans",
    glyph: "◇",
    src: "/shots/plan-subagents.png",
    title: "See how the work connects.",
    copy: "Plan steps carry their own subagent briefs and dependencies. Ready steps can run together; a failed step blocks the work that depends on it.",
    alt: "Illustrative four-node plan in the Run sidebar: one done, two running and one waiting",
    link: "/docs/plan",
    plate: 7,
  },
  {
    name: "Observability",
    glyph: "⌁",
    src: "/shots/settings-context-bar.png",
    title: "Build your view of the run.",
    copy: "Arrange inspector components for the plan, timeline and context ledger. Inspect model steps, tool calls and subagents, or export thread data as CSV.",
    alt: "Shinbo Context bar settings showing an inspector preview with sample thread statistics and component groups",
    link: "/docs/plan",
    plate: 9,
  },
] as const;

export default function MissionControl() {
  const [active, setActive] = useState(0);
  const screen = screens[active];
  useReveal();

  return (
    <div className="v-mission">
      <a className="skip" href="#mc-main">
        Skip to content
      </a>
      <header className="mc-header mc-wrap">
        <a className="mc-brand" href="#mc-main">
          <Mark size={29} /> Shinbo
          <span className="mc-brand-tag">/ workspace</span>
        </a>
        <nav aria-label="Primary">
          <a href="#mc-explore">Explore</a>
          <a href="#features">Capabilities</a>
          <a href="/docs">Docs</a>
          <a href="https://github.com/tronschell/shinbo">GitHub ↗</a>
        </nav>
        <a className="mc-button mc-button-small" href="#download">
          Get Shinbo <span>↓</span>
        </a>
      </header>

      <main id="mc-main">
        <section className="mc-hero mc-wrap">
          <div className="mc-kicker">
            <span className="mc-light" /> AN OPEN SOURCE AI WORKSPACE
          </div>
          <h1>
            Your agents.
            <br />
            <span>One mission control.</span>
          </h1>
          <p className="mc-intro">
            Run Claude Code, Codex and your other agent CLIs in one workspace.
            Hand off results, follow the plan, and see what happened along the
            way.
          </p>
          <div className="mc-actions">
            <a
              className="mc-button"
              href="https://github.com/tronschell/shinbo/releases/latest"
            >
              <Apple size={17} /> Download for Mac <span>↗</span>
            </a>
            <a className="mc-text-link" href="#mc-explore">
              Explore the workspace <span>↓</span>
            </a>
          </div>
          <p className="mc-requirements">
            Mac Apple silicon · Windows x64 also available · Free app
            <br />
            OpenRouter key required at first launch. Model usage and
            subscriptions are separate.
          </p>
        </section>

        <section
          className="mc-theater mc-wrap"
          id="mc-explore"
          aria-label="Explore the Shinbo workspace"
        >
          <div className="mc-theater-bar">
            <span className="mc-mono">INSIDE SHINBO</span>
            <div
              className="mc-screen-controls"
              role="group"
              aria-label="Choose an app screenshot"
            >
              {screens.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  aria-pressed={active === index}
                  aria-controls="mc-screen"
                  onClick={() => setActive(index)}
                >
                  <span aria-hidden="true">{item.glyph}</span>
                  {item.name}
                </button>
              ))}
            </div>
            <span className="mc-mono mc-screen-number">0{active + 1} / 04</span>
          </div>
          <div
            className="mc-screen-stage"
            style={{ backgroundImage: `url(/bg/plate-${screen.plate}.png)` }}
          >
            <figure id="mc-screen" key={screen.src}>
              <img
                src={screen.src}
                alt={screen.alt}
                width={active === 1 || active === 3 ? 2880 : 2760}
                height={active === 1 || active === 3 ? 1800 : 1720}
                fetchPriority="high"
              />
              <figcaption>
                Fresh app capture
                {active === 0 || active === 2
                  ? " · illustrative workspace data"
                  : active === 3
                    ? " · sample preview statistics"
                    : ""}
              </figcaption>
            </figure>
          </div>
          <div className="mc-screen-description" aria-live="polite">
            <div>
              <span className="mc-mono">{screen.name}</span>
              <h2>{screen.title}</h2>
            </div>
            <p>
              {screen.copy} <a href={screen.link}>Read the guide ↗</a>
            </p>
          </div>
        </section>

        <div className="mc-supported mc-wrap" data-reveal>
          <p className="mc-mono">THE HARNESSES YOU ALREADY USE</p>
          <BrandRow />
          <p>
            Runs your installed CLIs, signed in with your own accounts.
            Available models depend on each CLI and account.
          </p>
        </div>

        <section className="mc-flow mc-wrap">
          <div className="mc-section-heading" data-reveal>
            <div>
              <p className="mc-kicker">01 / ORCHESTRATE</p>
              <h2>
                Keep the work moving.
                <br />
                <span>Keep the thread.</span>
              </h2>
            </div>
            <p>
              Shinbo is a meta-harness: it calls other agent harnesses as tools.
              You get their native capabilities, connected by one conversation.
            </p>
          </div>
          <div className="mc-flow-grid" data-reveal>
            <article>
              <div className="mc-flow-illustration">
                <span className="mc-terminal-label">01 — START A RUN</span>
                <div className="mc-agent-chip">
                  <img src="/brands/claude.svg" alt="" />
                  Claude Code<span>↗</span>
                </div>
                <div className="mc-mini-line" />
                <div className="mc-mini-line mc-short-line" />
              </div>
              <h3>Use the agent for the job.</h3>
              <p>
                Launch an installed CLI in the thread’s folder. Read its result
                or switch to the terminal log while it works.
              </p>
              <a href="/docs/harness">Native harness runs ↗</a>
            </article>
            <article>
              <div className="mc-flow-illustration">
                <span className="mc-terminal-label">02 — PASS THE RESULT</span>
                <div className="mc-transfer">
                  <span>
                    <img src="/brands/claude.svg" alt="Claude Code" />
                  </span>
                  <i aria-hidden="true">→</i>
                  <span>
                    <img src="/brands/openai.svg" alt="Codex" />
                  </span>
                </div>
                <span className="mc-transfer-caption">
                  Result + your next instruction
                </span>
              </div>
              <h3>Give the next agent context.</h3>
              <p>
                Hand successful outputs to a new harness or an existing run.
                Source chips take you back to the earlier result.
              </p>
              <a href="/docs/harness">How handoffs work ↗</a>
            </article>
            <article>
              <div className="mc-flow-illustration">
                <span className="mc-terminal-label">03 — FOLLOW THE WORK</span>
                <div className="mc-ledger">
                  <span>
                    Model step
                    <i />
                  </span>
                  <span>
                    Tool call
                    <i />
                  </span>
                  <span>
                    Subagent
                    <i />
                  </span>
                </div>
              </div>
              <h3>See the route to the answer.</h3>
              <p>
                Follow plans, tool activity and context in the inspector. Review
                saved run evidence before proposing improvements.
              </p>
              <a href="/docs/agent">Evidence and self-improvement ↗</a>
            </article>
          </div>
        </section>

        <section className="mc-control mc-wrap" data-reveal>
          <div className="mc-control-copy">
            <p className="mc-kicker">02 / STAY IN CONTROL</p>
            <h2>
              More capable.
              <br />
              <span>Still your call.</span>
            </h2>
            <p>
              Start with Ask mode. Shinbo requests approval for writes, commands
              and clicks. Choose the permission mode that fits the work, and
              stop a run with Escape.
            </p>
            <a className="mc-text-link" href="/docs/control">
              Understand the four permission modes ↗
            </a>
            <div className="mc-control-note">
              <span aria-hidden="true">⌘</span>
              <p>
                Quick Ask, terminal, browser and computer-use surfaces connect
                the workspace to your Mac. Optional permissions are explained
                during setup.
              </p>
            </div>
          </div>
          <figure className="mc-control-art">
            <img
              src="/shots/settings-permissions.png"
              alt="Shinbo Permissions settings showing individual macOS permission statuses and settings actions"
              loading="lazy"
              width={2880}
              height={1800}
            />
            <figcaption>
              Permission status, with a clear next action.
            </figcaption>
          </figure>
        </section>

        <div className="mc-common mc-wrap">
          <DownloadGuide />
          <FeatureDirectory />
          <Questions />
        </div>

        <section className="mc-closing mc-wrap" data-reveal>
          <p className="mc-kicker">YOUR NEXT PROJECT STARTS HERE</p>
          <h2>
            Put your agents
            <br />
            <span>on the same page.</span>
          </h2>
          <div className="mc-actions">
            <a className="mc-button" href="#download">
              Find your download <span>↓</span>
            </a>
            <a className="mc-text-link" href="/docs">
              Get to know Shinbo ↗
            </a>
          </div>
        </section>
      </main>

      <footer className="mc-footer mc-wrap">
        <a className="mc-brand" href="#mc-main">
          <Mark size={25} /> Shinbo
        </a>
        <p>
          Free and open source.
          <br />
          Made for work you want to understand.
        </p>
        <nav aria-label="Footer">
          <a href="/docs">Documentation</a>
          <a href="https://github.com/tronschell/shinbo">Source code ↗</a>
          <a href="/#roadmap">Roadmap ↗</a>
        </nav>
        <a href="#mc-main" className="mc-back">
          Back to top ↑
        </a>
      </footer>
    </div>
  );
}

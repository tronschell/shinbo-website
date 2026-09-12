import { Mark } from "../shared";
import {
  BrandRow,
  DownloadGuide,
  FeatureDirectory,
  Questions,
  useReveal,
} from "./common";
import "./editorial.css";

const repo = "https://github.com/tronschell/shinbo";

export default function Editorial() {
  useReveal();
  return (
    <div className="v-editorial">
      <a className="ed-skip" href="#ed-main">
        Skip to content
      </a>
      <header className="ed-nav ed-wrap">
        <a className="ed-brand" href="/" aria-label="Shinbo home">
          <Mark size={29} />
          shinbo
        </a>
        <nav aria-label="Primary">
          <a href="#ed-features">The workspace</a>
          <a href="/docs">Documentation</a>
          <a href={repo}>Source ↗</a>
        </nav>
        <a className="ed-button ed-small" href="#download">
          Get Shinbo <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main id="ed-main">
        <section className="ed-hero ed-wrap" aria-labelledby="ed-title">
          <p className="ed-kicker">
            <span className="ed-status" /> An open-source workspace for your
            agents
          </p>
          <div className="ed-hero-grid">
            <h1 id="ed-title">
              Your agents.
              <br />
              Working <em>together.</em>
            </h1>
            <div className="ed-intro">
              <p>
                Claude Code, Codex and the tools you already use. Shinbo brings
                them into one workspace to plan, delegate and get things
                done—with a record you can actually read.
              </p>
              <a className="ed-button" href="#download">
                Find your download <span aria-hidden="true">↓</span>
              </a>
              <span className="ed-fine">
                Mac & Windows downloads · Free & open source
              </span>
            </div>
          </div>
          <figure className="ed-hero-figure">
            <div className="ed-plate">
              <div className="ed-plate-label">
                <span>01 / THE WORKSPACE</span>
                <span>ONE PLACE TO PUT IT ALL TO WORK</span>
              </div>
              <img
                src="/shots/workspace-thread.png"
                width="2760"
                height="1720"
                alt="Shinbo workspace showing an illustrative website launch conversation and context inspector"
                fetchPriority="high"
              />
            </div>
            <figcaption>
              <span>Illustrative website launch conversation and context.</span>
              <span>Actual Shinbo interface ↗</span>
            </figcaption>
          </figure>
          <div className="ed-integrations" data-reveal>
            <p>
              Runs your installed agents,
              <br />
              signed in as you.
            </p>
            <BrandRow />
          </div>
        </section>

        <section
          className="ed-chapter ed-wrap"
          id="ed-features"
          aria-labelledby="ed-work-title"
        >
          <div className="ed-section-head">
            <p className="ed-kicker">01 / A clearer way to work</p>
            <h2 id="ed-work-title">
              A little less switching.
              <br />A lot more <em>doing.</em>
            </h2>
          </div>
          <div className="ed-three" data-reveal>
            <article>
              <span className="ed-number">01</span>
              <h3>Bring the right agent.</h3>
              <p>
                Launch the CLIs already installed on your Mac. Hand successful
                results to another agent, or keep working in an existing run,
                inside the same thread.
              </p>
              <a href="/docs/harness">
                Meet the meta-harness <span aria-hidden="true">↗</span>
              </a>
            </article>
            <article>
              <span className="ed-number">02</span>
              <h3>Give the work a plan.</h3>
              <p>
                Turn an objective into a dependency graph. Independent steps run
                together; subagents return their results to the work that needs
                them.
              </p>
              <a href="/docs/plan">
                Explore plans & delegation <span aria-hidden="true">↗</span>
              </a>
            </article>
            <article>
              <span className="ed-number">03</span>
              <h3>Keep the whole record.</h3>
              <p>
                Inspect model steps, tool calls and agent runs in a durable
                trace. See your context, arrange your inspector, and export the
                thread as CSVs.
              </p>
              <a href="/docs/tools">
                See what happened <span aria-hidden="true">↗</span>
              </a>
            </article>
          </div>
        </section>

        <section className="ed-spotlight" aria-labelledby="ed-flow-title">
          <div className="ed-wrap ed-spotlight-grid" data-reveal>
            <div className="ed-spotlight-copy">
              <p className="ed-kicker">02 / Make room for your own flow</p>
              <h2 id="ed-flow-title">
                At your fingertips.
                <br />
                <em>On your terms.</em>
              </h2>
              <p>
                Ask from the notch. Work in a terminal or browser. Keep useful
                knowledge in plain Markdown. Build a widget when the panel you
                need does not exist.
              </p>
              <p>
                Four permission modes let you choose when Shinbo asks. Optional
                Mac permissions unlock the tasks that need them.
              </p>
              <a className="ed-text-link" href="/docs/surfaces">
                Explore the surfaces <span aria-hidden="true">↗</span>
              </a>
            </div>
            <figure className="ed-inset">
              <div>
                <img
                  src="/shots/notch-island.png"
                  alt="Fresh Shinbo Quick Ask composer with Ask mode and no model selected"
                  loading="lazy"
                />
              </div>
              <figcaption>
                Quick Ask. A fresh composer with no model selected.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="ed-chapter ed-wrap" aria-labelledby="ed-more-title">
          <div className="ed-section-head">
            <p className="ed-kicker">03 / There is more under the hood</p>
            <h2 id="ed-more-title">
              Built for the way
              <br />
              you <em>actually work.</em>
            </h2>
          </div>
          <div className="ed-detail-grid" data-reveal>
            <a href="/docs/jobs">
              <span className="ed-kicker">When the work repeats</span>
              <h3>Put it on a schedule.</h3>
              <p>
                Save a trigger and a workflow graph. Each run opens a normal
                thread with the permission mode you chose.
              </p>
              <span className="ed-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <a href="/docs/agent">
              <span className="ed-kicker">When something goes wrong</span>
              <h3>Make the next run better.</h3>
              <p>
                Review saved evidence by model, propose a scoped repair, and
                compare it on the paired replay bench.
              </p>
              <span className="ed-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <a href="/docs/models">
              <span className="ed-kicker">When you want a different model</span>
              <h3>Choose your connection.</h3>
              <p>
                Use OpenRouter, an OpenAI-compatible endpoint or a local model.
                Setup starts with a required OpenRouter key.
              </p>
              <span className="ed-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </section>

        <section className="ed-download-band">
          <div className="ed-wrap" data-reveal>
            <p className="ed-kicker">04 / Start here</p>
            <DownloadGuide />
          </div>
        </section>

        <section
          className="ed-chapter ed-wrap"
          aria-label="Feature documentation"
        >
          <FeatureDirectory />
        </section>

        <section
          className="ed-honesty ed-wrap"
          aria-labelledby="ed-status-title"
          data-reveal
        >
          <p className="ed-kicker">A work in the open</p>
          <div>
            <h2 id="ed-status-title">
              The product,
              <br />
              <em>as it stands.</em>
            </h2>
            <p>
              Downloads are available for Apple silicon Macs and Windows x64;
              the Windows build is unsigned. The iPhone app is built but
              unreleased. There is no Linux desktop build. The current workspace
              is Electron, with a native GPUI rewrite in progress.
            </p>
            <a className="ed-text-link" href="/#roadmap">
              Read the public roadmap <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section
          className="ed-chapter ed-wrap"
          aria-label="Frequently asked questions"
        >
          <Questions />
        </section>

        <section className="ed-closing ed-wrap" data-reveal>
          <p className="ed-kicker">Your tools. A shared workspace.</p>
          <h2>
            Bring it
            <br />
            <em>all together.</em>
          </h2>
          <a className="ed-button" href="#download">
            Find your download <span aria-hidden="true">↗</span>
          </a>
          <p>Free app. Provider and subscription usage billed separately.</p>
        </section>
      </main>

      <footer className="ed-footer ed-wrap">
        <a className="ed-brand" href="/">
          <Mark size={25} />
          shinbo
        </a>
        <p>
          Made to be understood.
          <br />
          Open source, from the start.
        </p>
        <nav aria-label="Footer">
          <a href="/docs">Documentation</a>
          <a href={repo}>GitHub ↗</a>
          <a href="/#roadmap">Roadmap</a>
          <a href="/llms.txt">For AI readers</a>
        </nav>
        <span>macOS / Apple silicon · Windows / x64</span>
      </footer>
    </div>
  );
}

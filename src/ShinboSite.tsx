import { useState } from "react";
import { PlatformIcon, Ticker, modes } from "./shared";
import {
  Learning,
  Permissions,
  ScheduledRun,
  featureTiles,
} from "./tiles/features";
import {
  DownloadGuide,
  FeatureDirectory,
  Questions,
  useReveal,
} from "./variations/common";
import Explain from "./Explain";
import HeroMark from "./HeroMark";
import { usePlatformDownload } from "./downloads";
import { SiteFooter, SiteHeader, repo } from "./SiteChrome";

const railLinks: [string, string][] = [
  ["#fg-overview", "Overview"],
  ["#explain", "How it works"],
  ["#fg-control", "Permissions"],
  ["#fg-workflow", "Workflows"],
  ["#features", "Features"],
  ["#download", "Download"],
];

/* Eyebrow pill + centered serif heading + optional lede: the section
   header pattern used everywhere below the hero. */
function SectionHead({
  eyebrow,
  title,
  id,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  id: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="fg-section-head" data-reveal="">
      <span className="fg-eyebrow">{eyebrow}</span>
      <h2 id={id}>{title}</h2>
      {children}
    </div>
  );
}

export default function ShinboSite() {
  const download = usePlatformDownload();
  const [motionPlaying, setMotionPlaying] = useState(false);
  useReveal();
  const { selected } = download;

  return (
    <div
      className="v-shinbo"
      data-motion={motionPlaying ? "playing" : "paused"}
    >
      <a className="fg-skip" href="#fg-main">
        Skip to content
      </a>
      <SiteHeader rail={railLinks} selected={selected} />
      <div className="fg-layout">
        <main id="fg-main">
          <section
            className="fg-overview fg-section"
            id="fg-overview"
            aria-labelledby="fg-title"
            onPointerMove={(e) => {
              if (!motionPlaying) return;
              // The dithered backdrop drifts toward the pointer (see
              // .fg-overview::before / ::after).
              const r = e.currentTarget.getBoundingClientRect();
              const el = e.currentTarget;
              el.style.setProperty("--mx", `${(e.clientX - r.left) / r.width}`);
              el.style.setProperty("--my", `${(e.clientY - r.top) / r.height}`);
            }}
          >
            <div className="fg-intro">
              <HeroMark playing={motionPlaying} />
              <h1 id="fg-title" className="fg-sr">
                Shinbo — AI agent workspace
              </h1>
              <div className="fg-definition">
                <p>A free, open-source meta-harness for your coding agents.</p>
                <div className="fg-actions">
                  <a
                    className="fg-button fg-button-lg"
                    href={selected.href}
                    title={selected.requirement}
                  >
                    <PlatformIcon icon={selected.icon} />
                    {selected.action}
                  </a>
                  <a
                    className="fg-button fg-button-lg fg-button-ghost fg-button-icon"
                    href={repo}
                    aria-label="Source on GitHub"
                  >
                    <img
                      src="/brands/github.svg"
                      alt=""
                      width={22}
                      height={22}
                    />
                  </a>
                </div>
                <small className="fg-install-requirement">
                  Free &amp; open source · Mac &amp; Windows.
                  <br />
                  Setup needs an OpenRouter key; model services may cost extra.
                </small>
                <a className="fg-link" href="/docs/models#first-task">
                  Start your first task
                </a>
              </div>
            </div>
            <figure className="fg-hero-screen">
              <div className="fg-screen-stage">
                <a
                  href="/shots/workspace-thread.png"
                  aria-label="Open workspace screenshot at full size"
                  className="fg-screen-link"
                >
                  <img
                    src="/shots/workspace-thread-960.webp"
                    srcSet="/shots/workspace-thread-480.webp 480w, /shots/workspace-thread-960.webp 960w, /shots/workspace-thread-1440.webp 1440w, /shots/workspace-thread.webp 2760w"
                    sizes="(max-width: 760px) calc(100vw - 64px), (max-width: 1280px) 85vw, 1120px"
                    alt="Shinbo workspace showing projects, a Markdown conversation, and the context inspector"
                    width="2760"
                    height="1720"
                    fetchPriority="high"
                  />
                </a>
              </div>
              <figcaption>
                <span>Example data · development build.</span>
                <a href="/docs/surfaces">Workspace guide</a>
              </figcaption>
            </figure>
            <Ticker
              className="fg-providers"
              label="Models, subscriptions and local runtimes"
            />
          </section>

          <Explain onPlayingChange={setMotionPlaying} />

          <section
            className="fg-section fg-control"
            id="fg-control"
            aria-labelledby="fg-control-title"
          >
            <SectionHead
              eyebrow="Permissions"
              id="fg-control-title"
              title="Four modes. Apps always ask."
            >
              <p>
                Ask, Accept edits, Auto or Full access. Access to other apps
                always needs approval.
              </p>
            </SectionHead>
            <div className="fg-control-grid">
              <div className="fg-modes" data-reveal="">
                {modes.map(([glyph, name, copy], i) => (
                  <article className="fg-mode" data-tint={i} key={name}>
                    <h3>
                      <i aria-hidden="true">{glyph}</i>
                      {name}
                    </h3>
                    <p>{copy}</p>
                  </article>
                ))}
                <a className="fg-link" href="/docs/control">
                  Permission guide
                </a>
              </div>
              <figure className="fg-control-figure" data-reveal="">
                <Permissions />
                <figcaption>
                  The same request under each mode. Auto blocks ten prohibited
                  actions; other apps and the pointer always ask.
                </figcaption>
              </figure>
            </div>
          </section>

          <section
            className="fg-section fg-learning-section"
            id="fg-learning"
            aria-labelledby="fg-learning-title"
          >
            <div className="fg-evidence" data-reveal="">
              <div className="fg-evidence-copy">
                <span className="fg-eyebrow">Self learning</span>
                <h2 id="fg-learning-title">Learn from a failed run.</h2>
                <p>
                  Inspect the evidence, ask Shinbo for a scoped change, and
                  compare it on a replay before deciding to keep it.
                </p>
                <a className="fg-link" href="/docs/agent">
                  How learning works
                </a>
              </div>
              <div className="fg-evidence-figure">
                <Learning />
              </div>
            </div>
          </section>

          <section
            className="fg-section fg-workflow"
            id="fg-workflow"
            aria-labelledby="fg-workflow-title"
          >
            <SectionHead
              eyebrow="Scheduled workflows"
              id="fg-workflow-title"
              title="On a schedule, a workflow runs."
            >
              <p>
                On a cron schedule Shinbo runs a chain of agents, scripts and
                conditions. It must be open and the computer awake.
              </p>
            </SectionHead>
            <figure className="fg-schedule" data-reveal="">
              <ScheduledRun />
              <figcaption>
                Every Monday 09:00 UTC: an agent writes the brief, a script
                ships it if nothing errored.
              </figcaption>
            </figure>
            <a className="fg-link fg-link-center" href="/docs/jobs">
              Workflow guide
            </a>
          </section>

          <div className="fg-section fg-directory">
            <FeatureDirectory tiles={featureTiles} />
          </div>

          <div className="fg-section fg-download-section">
            <DownloadGuide selection={download} />
          </div>

          <div className="fg-section fg-faq">
            <Questions />
          </div>

          <section className="fg-cta" aria-labelledby="fg-cta-title">
            <h2 id="fg-cta-title">
              Free, open source,
              <br />
              and yours to inspect.
            </h2>
            <div className="fg-actions">
              <a
                className="fg-button fg-button-lg"
                href={selected.href}
                title={selected.requirement}
              >
                <PlatformIcon icon={selected.icon} />
                {selected.action}
              </a>
              <a className="fg-button fg-button-lg fg-button-ghost" href={repo}>
                View the source
              </a>
            </div>
          </section>

          <SiteFooter />
        </main>
      </div>
    </div>
  );
}

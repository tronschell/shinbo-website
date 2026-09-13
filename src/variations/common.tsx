import type { ReactNode } from "react";
import { useId, useLayoutEffect } from "react";
import {
  platforms,
  RELEASE,
  usePlatformDownload,
  type Platform,
} from "../downloads";
export { RELEASE } from "../downloads";
import { clis, PlatformIcon } from "../shared";
import { productFaq } from "../product-content";
import "./common.css";

/**
 * Scroll reveal. Every `[data-reveal]` element starts "out" and flips to "in"
 * as it enters the viewport; elements entering together stagger by 60ms.
 * The look lives in CSS, so a page that never calls this stays fully visible.
 */
export function useReveal() {
  useLayoutEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (
      !els.length ||
      !("IntersectionObserver" in window) ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const io = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .forEach((e, i) => {
            const el = e.target as HTMLElement;
            el.style.transitionDelay = `${Math.min(i, 8) * 60}ms`;
            el.addEventListener(
              "transitionend",
              () => (el.style.transitionDelay = ""),
              { once: true },
            );
            el.dataset.reveal = "in";
            io.unobserve(el);
          });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => {
      el.dataset.reveal = "out";
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}

export function DownloadGuide({
  selection,
}: { selection?: ReturnType<typeof usePlatformDownload> } = {}) {
  const id = useId();
  const fallback = usePlatformDownload();
  const { platform, selected, explanation, setPlatform } =
    selection ?? fallback;
  return (
    <section
      className="vc-download"
      id="download"
      aria-labelledby={`${id}-title`}
      data-reveal=""
    >
      <h2 id={`${id}-title`}>Download</h2>
      <div className="vc-download-grid">
        <div className="vc-download-result" key={platform} aria-live="polite">
          <h3>{selected.title}</h3>
          <p>{selected.requirement}</p>
          <a className="vc-primary" href={selected.href}>
            <PlatformIcon icon={selected.icon} />
            {selected.action}
          </a>
          <p>{selected.steps}</p>
        </div>
        <div className="vc-download-side">
          <label htmlFor={`${id}-platform`}>Your system</label>
          <select
            id={`${id}-platform`}
            aria-describedby={`${id}-detection`}
            value={platform}
            onChange={(e) => setPlatform(e.target.value as Platform)}
          >
            {Object.entries(platforms).map(([key, value]) => (
              <option value={key} key={key}>
                {value.label}
              </option>
            ))}
          </select>
          <p id={`${id}-detection`} className="vc-fine" aria-live="polite">
            {explanation}
          </p>
          <p className="vc-download-links-title">Direct downloads</p>
          <ul className="vc-download-links">
            <li>
              <a href={platforms.mac.href}>
                <PlatformIcon icon="mac" />
                Mac DMG <span>Apple silicon</span>
              </a>
            </li>
            <li>
              <a href={platforms.windows.href}>
                <PlatformIcon icon="windows" />
                Windows EXE <span>x64 (unsigned)</span>
              </a>
            </li>
          </ul>
          <p className="vc-release-note">
            Shinbo v0.8.2. <a href={RELEASE}>Release notes &amp; checksums</a>
          </p>
        </div>
      </div>
      <div className="vc-download-foot">
        <p className="vc-fine">
          Setup requires an OpenRouter key (a free key works), even with a
          subscription. Sign into your agent CLIs; providers bill separately.
          <a href="/docs/models"> Setup guide</a>
        </p>
        <p className="vc-fine">
          No Intel Mac or Linux installer. Mobile unreleased. Mac-only features
          may differ on Windows.
        </p>
      </div>
    </section>
  );
}

const features: [string, string, string][] = [
  [
    "harness",
    "Agent CLIs",
    "Run Claude Code, Codex and other CLIs in one thread.",
  ],
  ["delegation", "Subagents", "Delegate work; inspect progress and results."],
  [
    "plan",
    "Plans",
    "Steps run in parallel or in sequence; each waits only on the steps it depends on.",
  ],
  ["models", "Models", "APIs, subscriptions, Ollama, LM Studio and llama.cpp."],
  ["control", "Permissions", "Control edits, commands and app access."],
  [
    "surfaces",
    "Workspace",
    "Threads, goals, terminal, browser and artifacts. Quick Ask and voice on Mac.",
  ],
  ["knowledge", "Memory", "Keep Markdown notes in a folder or Obsidian vault."],
  ["jobs", "Workflows", "Schedule agents, scripts and conditions."],
  [
    "agent",
    "Self learning",
    "Inspect failures, compare a repair, and decide what to keep.",
  ],
  ["tools", "Extensions", "Add MCP servers, skills, plugins and generated UI."],
];

export function FeatureDirectory({
  shots = false,
  tiles,
  items = features,
  title = "Features",
}: {
  shots?: boolean;
  tiles?: Record<string, () => ReactNode>;
  /** [slug, title, copy]; defaults to the home-page feature list. */
  items?: [string, string, string][];
  title?: ReactNode;
} = {}) {
  return (
    <section className="vc-features" id="features">
      {title && <h2 data-reveal="">{title}</h2>}
      <div className="vc-feature-grid">
        {items.map(([slug, title, copy], i) => (
          <a
            key={slug}
            href={`/docs/${slug}`}
            data-reveal=""
            data-tint={shots || tiles ? i % 4 : undefined}
          >
            <h3>{title}</h3>
            <p>{copy}</p>
            {tiles?.[slug] && (
              <>
                <span className="vc-feature-go" aria-hidden="true">
                  →
                </span>
                <div className="vc-feature-art">{tiles[slug]()}</div>
              </>
            )}
            {shots && !tiles && (
              <>
                <span className="vc-feature-go" aria-hidden="true">
                  →
                </span>
                <img
                  className="vc-feature-shot"
                  src={`/shots/thumbs/${slug}-360.webp`}
                  srcSet={`/shots/thumbs/${slug}-360.webp 360w, /shots/thumbs/${slug}-720.webp 720w`}
                  sizes="(max-width: 700px) calc(100vw - 80px), (max-width: 1100px) 40vw, 320px"
                  alt=""
                  width="720"
                  height="450"
                  loading="lazy"
                  decoding="async"
                />
              </>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}

export function Questions() {
  return (
    <section className="vc-questions" id="questions">
      <h2 data-reveal="">Questions</h2>
      {productFaq.map(({ q, a }) => (
        <details key={q} data-reveal="">
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </section>
  );
}

export function BrandRow() {
  return (
    <div className="vc-brands" aria-label="Supported agent CLIs">
      {clis.map((cli) => (
        <span key={cli.name}>
          <img src={`/brands/${cli.brand}`} alt="" width="20" height="20" />
          {cli.name}
        </span>
      ))}
    </div>
  );
}

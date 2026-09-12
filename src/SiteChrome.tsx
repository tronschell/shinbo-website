import { useEffect, useState } from "react";
import { Mark, PlatformIcon } from "./shared";
import { guideLinks } from "./guide-links";
import { usePlatformDownload, type PlatformInfo } from "./downloads";

export const repo = "https://github.com/tronschell/shinbo";
const roadmap = `${repo}/blob/main/ROADMAP.md`;

/* Floating pill header. `rail` (home only) is the on-page section list; the
   scroll-spy observer runs only when it is passed. */
export function SiteHeader({
  rail,
  selected: choice,
}: {
  rail?: [string, string][];
  selected?: PlatformInfo;
}) {
  const fallback = usePlatformDownload();
  const selected = choice ?? fallback.selected;
  const [activeSection, setActiveSection] = useState(rail?.[0][0]);

  useEffect(() => {
    if (!rail) return;
    // A section is "active" while it crosses a band 20–30% down the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting);
        if (hit) setActiveSection(`#${hit.target.id}`);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    for (const [href] of rail) {
      const section = document.querySelector(href);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [rail]);

  return (
    <header className="fg-header">
      <a href="/" className="fg-brand">
        <Mark size={26} /> shinbo
      </a>
      {rail && (
        <nav className="fg-sections" aria-label="On this page">
          {rail.map(([href, label]) => (
            <a
              key={href}
              href={href}
              aria-current={activeSection === href ? "true" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
      )}
      <nav className="fg-primary" aria-label="Primary">
        <a
          href="/docs"
          aria-label="Documentation"
          aria-current={rail ? undefined : "page"}
          className="fg-github"
        >
          <svg
            viewBox="0 0 20 20"
            width={20}
            height={20}
            fill="currentColor"
            aria-hidden="true"
          >
            <g transform="translate(-2.5 -3.75) scale(1.25)">
              <path d="M3 4.5A1.5 1.5 0 0 1 4.5 3H10v3.5A1.5 1.5 0 0 0 11.5 8H15v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 3 14.5zM11.5 3.2 14.8 6.5h-3.3zM17 7v8.5A3.5 3.5 0 0 1 13.5 19H6v-1.5h7.5a2 2 0 0 0 2-2V7z" />
              <path fill="var(--vc-bg)" d="M5.5 9.5h7v1.4h-7zm0 3h7v1.4h-7z" />
            </g>
          </svg>
        </a>
        <a href={repo} aria-label="Source on GitHub" className="fg-github">
          <img src="/brands/github.svg" alt="" width={20} height={20} />
        </a>
        <a
          className="fg-button"
          href={selected.href}
          title={selected.requirement}
        >
          <PlatformIcon icon={selected.icon} />
          {selected.action}
        </a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="fg-footer">
      <div className="fg-footer-brand">
        <Mark size={48} />
      </div>
      <div className="fg-footer-cols">
        <nav aria-label="Product">
          <span className="fg-footer-h">Product</span>
          <a href="/#download">Download</a>
          <a href="/docs">Documentation</a>
          <a href={roadmap}>Roadmap</a>
          <a href={repo}>GitHub</a>
          <a href="/llms.txt">For AI readers</a>
        </nav>
        <nav aria-label="Guides" className="fg-footer-guides">
          <span className="fg-footer-h">Guides</span>
          {guideLinks.map(([slug, title]) => (
            <a key={slug} href={`/docs/${slug}`}>
              {title}
            </a>
          ))}
        </nav>
        <p className="fg-footer-fine">
          © {new Date().getFullYear()} Shinbo · Mac &amp; Windows
        </p>
      </div>
    </footer>
  );
}

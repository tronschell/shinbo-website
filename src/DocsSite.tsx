import { Link } from "./shared";
import { docs, docSeo } from "./docs";
import { SiteFooter, SiteHeader } from "./SiteChrome";
import { FeatureDirectory, useReveal } from "./variations/common";
import "./docs.css";

function DocsToc({ slug }: { slug: string | null }) {
  return (
    <nav className="docs-toc" aria-label="Docs">
      <span className="fg-eyebrow">Guides</span>
      <a href="/docs" aria-current={slug === null ? "page" : undefined}>
        All guides
      </a>
      {docs.map((d) => (
        <a
          key={d.slug}
          href={`/docs/${d.slug}`}
          aria-current={d.slug === slug ? "page" : undefined}
        >
          {d.title}
        </a>
      ))}
    </nav>
  );
}

function DocsIndex() {
  return (
    <article className="docs-body">
      <span className="fg-eyebrow">Docs</span>
      <h1>How Shinbo works.</h1>
      <p className="lede">
        Setup, capabilities and operating limits, with fresh app screenshots.
        Example data; current source may differ from the published release.
      </p>
      <FeatureDirectory
        shots
        title="Guides"
        items={docs.map((d) => [d.slug, d.title, d.blurb])}
      />
    </article>
  );
}

function DocTile({ label, slug }: { label: string; slug: string }) {
  const d = docs.find((x) => x.slug === slug)!;
  return (
    <Link href={`/docs/${slug}`}>
      <span className="fg-eyebrow">{label}</span>
      <h3>{d.title}</h3>
      <p>{d.blurb}</p>
      <span className="vc-feature-go" aria-hidden="true">
        →
      </span>
    </Link>
  );
}

function DocPage({ slug }: { slug: string }) {
  const i = docs.findIndex((d) => d.slug === slug);
  if (i === -1) return <DocsIndex />;
  const doc = docs[i];
  const prev = docs[(i - 1 + docs.length) % docs.length];
  const next = docs[(i + 1) % docs.length];
  return (
    <article className="docs-body">
      <nav className="doc-breadcrumb" aria-label="Breadcrumb">
        <Link href="/docs">Docs</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{doc.title}</span>
      </nav>
      <span className="fg-eyebrow">{doc.title}</span>
      <h1>{docSeo[doc.slug]?.title ?? doc.title}</h1>
      <p className="lede">{doc.blurb}</p>
      <p className="copy doc-version">
        These guides describe the current development source. The published
        v0.8.1 release can differ;{" "}
        <a href="https://github.com/tronschell/shinbo/releases/tag/v0.8.1">
          check release notes
        </a>{" "}
        before following a workflow.
      </p>
      {doc.body}
      <nav className="docs-nav" aria-label="Previous and next">
        <DocTile label="Previous" slug={prev.slug} />
        <DocTile label="Next" slug={next.slug} />
      </nav>
    </article>
  );
}

export default function DocsSite({ slug }: { slug: string | null }) {
  useReveal();
  const i = docs.findIndex((d) => d.slug === slug);
  return (
    <div className="v-shinbo">
      <a className="fg-skip" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <div className="fg-layout">
        <main id="main" className="docs" data-tint={Math.max(i, 0) % 4}>
          <DocsToc slug={i === -1 ? null : slug} />
          {slug ? <DocPage slug={slug} /> : <DocsIndex />}
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}

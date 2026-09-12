import Editorial from "./Editorial";
import Launchpad from "./Launchpad";
import MissionControl from "./MissionControl";
import Workflows from "./Workflows";
import ShinboSite from "../ShinboSite";
import Atlas from "./Atlas";
import { concepts } from "./catalog";
import { useReveal } from "./common";
import "./variations.css";

const pages = [
  Editorial,
  Launchpad,
  MissionControl,
  Workflows,
  ShinboSite,
  Atlas,
];

export default function Variations({ path }: { path: string }) {
  const number = Number(path.split("/")[2]);
  const Page = pages[number - 1];
  if (Page)
    return (
      <>
        <nav className="variation-bar" aria-label="Design comparison">
          <a href="/variations">← All six designs</a>
          <span>
            {String(number).padStart(2, "0")} / {concepts[number - 1].name}
          </span>
          <a href={`/variations/${(number % 6) + 1}`}>Next design →</a>
        </nav>
        <Page />
      </>
    );
  return <Gallery />;
}

function Gallery() {
  useReveal();
  return (
    <main className="variation-gallery">
      <header>
        <a className="variation-brand" href="/">
          <img src="/shinbo.svg" alt="" width="26" /> Shinbo
        </a>
        <span>Design study / September 2026</span>
      </header>
      <section className="variation-intro">
        <p>Six agents. Six directions. One product.</p>
        <h1>
          A new front door
          <br />
          for Shinbo.
        </h1>
        <div>
          <p>
            Choose the way Shinbo should introduce itself. Each is a complete,
            responsive page with real screenshots, your dither backgrounds, a
            verified download guide and the full feature directory.
          </p>
          <p className="variation-recommendation">
            Start with <a href="/variations/2">02 Launchpad</a> for download
            clarity, or <a href="/variations/1">01 Editorial</a> for the
            strongest introduction.
          </p>
        </div>
      </section>
      <section className="variation-grid" aria-label="Six layout variations">
        {concepts.map((concept, i) => (
          <article
            key={concept.name}
            data-reveal
            style={{ "--concept-color": concept.color } as React.CSSProperties}
          >
            <a
              className="variation-preview"
              href={`/variations/${i + 1}`}
              aria-label={`Open ${concept.name}`}
            >
              <iframe
                src={`/variations/${i + 1}`}
                title={`${concept.name} preview`}
                loading={i < 2 ? "eager" : "lazy"}
                tabIndex={-1}
                aria-hidden="true"
              />
              <span>Explore design ↗</span>
            </a>
            <div className="variation-card-copy">
              <p className="variation-number">
                0{i + 1} / {concept.type}
              </p>
              <h2>
                <a href={`/variations/${i + 1}`}>
                  {concept.name} <span>↗</span>
                </a>
              </h2>
              <h3>{concept.angle}</h3>
              <p>{concept.description}</p>
              <a className="variation-open" href={`/variations/${i + 1}`}>
                Open full page →
              </a>
            </div>
          </article>
        ))}
      </section>
      <section className="variation-foundation" data-reveal>
        <h2>
          Different layouts.
          <br />
          The same factual foundation.
        </h2>
        <div>
          <p>
            <strong>Downloads that make sense.</strong> Apple silicon DMG or
            Windows x64 installer. Intel, Linux and mobile get an honest status.
            Current Emma filenames are explained.
          </p>
          <p>
            <strong>Evidence people and engines can read.</strong> Clear product
            identity, ordinary HTML answers, descriptive links into the existing
            docs, and accurate prerequisites. Dither stays behind the
            screenshots.
          </p>
          <p>
            <strong>Prepared for selection.</strong> These previews are excluded
            from indexing and the sitemap. The current homepage stays available.
            Ranking and AI citations cannot be guaranteed; the selected
            direction will need publication and measurement.
          </p>
          <a href="/variations-notes.md">
            Read the design and discovery notes →
          </a>
        </div>
      </section>
      <footer>
        Shinbo / Six independent design directions{" "}
        <a href="/">View the current site ↗</a>
      </footer>
    </main>
  );
}

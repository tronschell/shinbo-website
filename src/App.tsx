import { guideLinks } from "./guide-links";
import "./shinbo-site.css";

function cleanPath(url: string) {
  return (
    url
      .replace(/\/index\.html$/, "/")
      .replace(/\.html$/, "")
      .replace(/\/+$/, "") || "/"
  );
}

export function pageEntry(url: string) {
  const path = cleanPath(url);
  if (path === "/") return "src/ShinboSite.tsx";
  if (path === "/docs" || guideLinks.some(([slug]) => path === `/docs/${slug}`))
    return "src/DocsSite.tsx";
  if (/^\/variations(?:\/[1-6])?$/.test(path))
    return "src/variations/Variations.tsx";
  return null;
}

// Load the same page before hydration and prerendering. Ordinary links keep
// navigation native; unused guides and design previews stay out of the entry.
export async function loadPage(url: string) {
  const path = cleanPath(url);
  switch (pageEntry(path)) {
    case "src/ShinboSite.tsx": {
      const { default: Page } = await import("./ShinboSite");
      return <Page />;
    }
    case "src/DocsSite.tsx": {
      const { default: Page } = await import("./DocsSite");
      return <Page slug={path.split("/")[2] ?? null} />;
    }
    case "src/variations/Variations.tsx": {
      const { default: Page } = await import("./variations/Variations");
      return <Page path={path} />;
    }
    default:
      return (
        <div className="v-shinbo">
          <main className="fg-layout fg-section">
            <h1>Page not found.</h1>
            <p>This address does not match a Shinbo page.</p>
            <p>
              <a href="/">Go to the homepage</a> or{" "}
              <a href="/docs">browse the guides</a>.
            </p>
          </main>
        </div>
      );
  }
}

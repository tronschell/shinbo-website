import { renderToString } from "react-dom/server";
import { loadPage } from "./App";
export { pageEntry } from "./App";
import { docs, docSeo } from "./docs";
import { concepts } from "./variations/catalog";
export { SHOT_SIZE } from "./shared";
export { productFaq as faq } from "./product-content";

/* Used only by scripts/prerender.mjs, at build time. */
export async function render(url: string) {
  return renderToString(await loadPage(url));
}

export const routes = [
  {
    path: "/404",
    name: null,
    title: "Page not found · Shinbo",
    description: "This address does not match a Shinbo page.",
    preview: true,
  },
  {
    path: "/variations",
    name: "Design comparison",
    title: "Six Shinbo website designs",
    description:
      "Compare six independent, responsive design directions for Shinbo.",
    preview: true,
  },
  ...concepts.map((concept, i) => ({
    path: `/variations/${i + 1}`,
    name: concept.name,
    title: `${concept.name} · Shinbo design preview`,
    description: concept.description,
    preview: true,
  })),
  { path: "/", name: null, title: null, description: null },
  {
    path: "/docs",
    name: "Docs",
    title: "Shinbo docs — setup, agents and desktop workflows",
    description:
      "Set up Shinbo on Mac or Windows, connect models and coding agents, and learn about plans, computer control, notes and scheduled tasks.",
  },
  /* Every doc title carries the brand: "Shinbo" is a common given name, and ten
     title tags with no brand string give an answer engine nothing to bind to.
     The doc's own screenshot becomes its og:image. */
  ...docs.map((d) => {
    const seo = docSeo[d.slug] ?? { title: d.title, description: d.blurb };
    return {
      path: `/docs/${d.slug}`,
      name: d.title,
      image: d.shot,
      ...seo,
      title: `${seo.title} · Shinbo`,
    };
  }),
];

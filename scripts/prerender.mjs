/* Writes one static HTML file per route into dist/, so every doc page is a
   real crawlable URL. Run after `vite build` + `vite build --ssr`. */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const dist = "dist";
const { render, routes, faq, SHOT_SIZE, pageEntry } =
  await import("../dist-ssr/entry-server.js");
const template = await readFile(join(dist, "index.html"), "utf8");
const ORIGIN = "https://shinbo.app";
const manifest = JSON.parse(
  await readFile(join(dist, ".vite/manifest.json"), "utf8"),
);

function routeCss(key, seen = new Set()) {
  if (!key || seen.has(key)) return [];
  seen.add(key);
  const chunk = manifest[key];
  if (!chunk) throw new Error(`Missing client chunk: ${key}`);
  return [
    ...(chunk.css ?? []),
    ...(chunk.imports ?? []).flatMap((id) => routeCss(id, seen)),
  ];
}

for (const r of routes) {
  let html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${await render(r.path)}</div>`,
  );
  // Route CSS must be available before JS for the prerendered page to paint.
  const styles = [...new Set(routeCss(pageEntry(r.path)))].filter(
    (file) => !html.includes(`/${file}`),
  );
  html = html.replace(
    "</head>",
    styles.map((file) => `<link rel="stylesheet" href="/${file}">`).join("\n") +
      "\n</head>",
  );
  if (
    r.path === "/" ||
    r.path === "/variations/5" ||
    r.path.startsWith("/docs")
  )
    html = html.replace(
      "</head>",
      '<link rel="preload" as="image" fetchpriority="high" href="/bg/shinbo-clouds.webp">\n</head>',
    );
  const url = ORIGIN + (r.path === "/" ? "/" : r.path);
  if (r.preview) {
    html = html.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/g,
      "",
    );
    html = setMeta(html, "name", "robots", "noindex, follow");
  }
  html = setAttr(html, "link", "rel", "canonical", "href", url);
  html = setMeta(html, "property", "og:url", url);
  if (r.image) {
    html = setMeta(html, "property", "og:image", ORIGIN + r.image);
    html = setMeta(html, "name", "twitter:image", ORIGIN + r.image);
    html = setMeta(html, "property", "og:image:alt", esc(r.description));
    const [w, h] = SHOT_SIZE[r.image] ?? [2760, 1720];
    html = setMeta(html, "property", "og:image:width", String(w));
    html = setMeta(html, "property", "og:image:height", String(h));
  }
  if (r.title) {
    const t = esc(r.title);
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`);
    html = setMeta(html, "property", "og:title", t);
    html = setMeta(html, "name", "twitter:title", t);
  }
  if (r.description) {
    const d = esc(r.description);
    html = setMeta(html, "name", "description", d);
    html = setMeta(html, "property", "og:description", d);
    html = setMeta(html, "name", "twitter:description", d);
  }
  if (r.path.startsWith("/docs/")) {
    html = setMeta(html, "property", "og:type", "article");
    html = html.replace(
      "</head>",
      `<script type="application/ld+json">${ld({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "TechArticle",
            "@id": `${url}#article`,
            headline: r.title,
            name: r.name,
            description: r.description,
            url,
            image: r.image ? ORIGIN + r.image : undefined,
            articleSection: "Documentation",
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            inLanguage: "en",
            isPartOf: { "@id": `${ORIGIN}/#site` },
            about: { "@id": `${ORIGIN}/#app` },
            publisher: { "@id": `${ORIGIN}/#org` },
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${url}#breadcrumb`,
            itemListElement: [
              { name: "Shinbo", item: `${ORIGIN}/` },
              { name: "Docs", item: `${ORIGIN}/docs` },
              { name: r.name, item: url },
            ].map((b, i) => ({ "@type": "ListItem", position: i + 1, ...b })),
          },
        ],
      })}</script>\n  </head>`,
    );
  }
  if (r.path === "/") {
    html = addLd(html, {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${ORIGIN}/#faq`,
      isPartOf: { "@id": `${ORIGIN}/#site` },
      about: { "@id": `${ORIGIN}/#app` },
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  if (r.path === "/docs") {
    const pages = routes.filter((x) => x.path.startsWith("/docs/"));
    html = addLd(html, {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${url}#page`,
      name: "Shinbo documentation",
      description: r.description,
      url,
      isPartOf: { "@id": `${ORIGIN}/#site` },
      about: { "@id": `${ORIGIN}/#app` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: pages.length,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: pages.map((x, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: x.name,
          description: x.description,
          url: ORIGIN + x.path,
        })),
      },
    });
  }
  const out =
    r.path === "/"
      ? join(dist, "index.html")
      : join(dist, r.path, "index.html");
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, html);
  // Both clean URL and directory forms work on static hosts and Vite preview.
  if (r.path !== "/")
    await writeFile(join(dist, `${r.path.slice(1)}.html`), html);
  console.log("prerendered", r.path);
}

const sitemap = [
  ...routes
    .filter((r) => !r.preview)
    .map((r) => ORIGIN + (r.path === "/" ? "/" : r.path)),
  `${ORIGIN}/llms.txt`,
  `${ORIGIN}/llms-full.txt`,
]
  .map((loc) => `  <url><loc>${loc}</loc></url>`)
  .join("\n");
await writeFile(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap}\n</urlset>\n`,
);
console.log("wrote sitemap.xml");

/* Prettier wraps any long <meta> onto several lines, so these must tolerate
   newlines between attributes -- and throw rather than silently no-op, which
   is how every route once shipped the homepage's og:title. */
function setMeta(html, attr, key, value) {
  return sub(
    html,
    new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*`),
    value,
    `${key} meta`,
  );
}

function setAttr(html, tag, k1, v1, k2, value) {
  return sub(
    html,
    new RegExp(`(<${tag}\\s+${k1}="${v1}"\\s+${k2}=")[^"]*`),
    value,
    `${v1} ${tag}`,
  );
}

function sub(html, re, value, what) {
  if (!re.test(html)) throw new Error(`prerender: no ${what} in template`);
  return html.replace(re, `$1${value}`);
}

function addLd(html, obj) {
  return html.replace(
    "</head>",
    `<script type="application/ld+json">${ld(obj)}</script>\n  </head>`,
  );
}

/* JSON-LD, with < escaped so a "</script>" in the data cannot close the tag. */
function ld(obj) {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { render, routes, pageEntry } from "../dist-ssr/entry-server.js";

const origin = "https://shinbo.app";
const manifest = JSON.parse(await readFile("dist/.vite/manifest.json", "utf8"));
function imports(key, seen = new Set()) {
  if (!key || seen.has(key)) return seen;
  seen.add(key);
  for (const child of manifest[key]?.imports ?? []) imports(child, seen);
  return seen;
}

for (const route of routes) {
  const file =
    route.path === "/" ? "dist/index.html" : `dist${route.path}/index.html`;
  const html = await readFile(file, "utf8");
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, file);
  assert.ok(
    html.includes(`href="${origin}${route.path}"`),
    `Canonical: ${file}`,
  );
  assert.ok(
    !html.includes("shinbo.sh") && !html.includes("[object Promise]"),
    file,
  );
  if (route.preview) assert.match(html, /noindex, follow/);
  for (const [, url] of html.matchAll(/(?:src|href)="(\/[^"?#]*)/g)) {
    if (url.startsWith("//")) continue;
    await access(`dist${url}`).catch(() => access(`dist${url}.html`));
  }
  for (const [, css] of html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g))
    await access(`dist${css}`);
  if (route.path !== "/") {
    assert.equal(pageEntry(`${route.path}.html`), pageEntry(route.path));
    assert.equal(pageEntry(`${route.path}/index.html`), pageEntry(route.path));
    assert.equal(await render(`${route.path}.html`), await render(route.path));
  }
}
assert.equal(pageEntry("/index.html"), pageEntry("/"));
assert.equal(pageEntry("/docs/not-a-page"), null);
assert.match(await render("/not-a-page"), /Page not found/);
for (const path of ["/", "/docs", "/docs/harness"]) {
  const initial = [...imports(pageEntry(path))].join(" ");
  assert.doesNotMatch(initial, /hero-mark-renderer|Variations/);
}
const home = await readFile("dist/index.html", "utf8");
assert.match(home, /fg-hero-mark-fallback/);
assert.match(home, /workspace-thread-480\.webp 480w/);
assert.match(
  await readFile("dist/docs/models/index.html", "utf8"),
  /id="first-task"/,
);
assert.doesNotMatch(
  await readFile("dist/sitemap.xml", "utf8"),
  /\/404|\/variations/,
);
console.log(
  `Verified ${routes.length} routes: SSR, canonical URLs, assets, .html aliases, 404s, and isolated initial bundles.`,
);

# Shinbo website

Public website for [Shinbo](https://shinbo.app), a desktop workspace for its own
agent and installed coding-agent CLIs. Source and installers for the application
live in [tronschell/shinbo](https://github.com/tronschell/shinbo).

## Develop and verify

Requires Node.js 24 and Python 3. This repository is self-contained.

```sh
npm ci
npm run dev
npm run check
npm run preview -- --port 4187
```

`check` runs formatting, ESLint, TypeScript, the production build, and regression
checks for routes, metadata, images, downloads, animation state and design previews.
The preview serves the production build. Unknown routes return HTTP 404.

## Build and delivery

React 19, TypeScript and Vite. `src/App.tsx` loads the requested page before
hydration; ordinary links load complete documents. `scripts/prerender.mjs` writes
static HTML and route-specific CSS links for the homepage, all guides, the design
previews and the not-found page. It also generates `sitemap.xml`.

The build writes `dist/`. It includes both clean-URL HTML files and directory
indexes; client routing accepts either form. Canonical URLs use `https://shinbo.app`.
Design previews at `/variations` are marked `noindex, follow` and excluded from the
sitemap. The generated `404.html` lets Cloudflare serve a useful missing-page
response instead of treating every unknown path as the homepage.

Cloudflare Pages uses the GitHub integration for `tronschell/shinbo-website`:
production branch `main`, build command `npm run check`, output `dist`, Node 24.
GitHub Actions also runs the same checks for pull requests and pushes to `main`.
See [deployment details](docs/deployment.md) for domain setup and verification.

## Images and motion

Original app screenshots and their provenance remain in `public/shots/manifest.json`.
They were captured September 12, 2026 from an isolated development profile. Examples
are labelled; screenshots do not imply a live run, benchmark, or release-level test.

WebP delivery variants are committed. To regenerate them after refreshing source
PNGs, run `python3 scripts/optimize-images.py` in an environment with Pillow and WebP
support. Pillow is not required for ordinary builds. Dithered backgrounds are
encoded losslessly; screenshots have responsive delivery sizes. Full-size originals
remain available from screenshot links.

Instrument Serif and Departure Mono are served locally with their licenses in
`public/fonts/`. The Three.js logo progressively enhances desktop browsers with
hover/fine-pointer input. Mobile and reduced-motion visitors keep the static mark.
The desktop renderer pauses offscreen, in hidden tabs and when animations are paused.

## Product claims

Keep visible copy, FAQs, metadata and `public/llms*.txt` consistent. The application
is free; model providers charge separately, and setup requires a verified OpenRouter
key. Download links in `src/downloads.ts` point to verified v0.7.1 assets, which still
use the former Emma name. Current development guides may describe features newer
than that release; they disclose this boundary. Search rankings, AI citations and
activation require measurement after publication.

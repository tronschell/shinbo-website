# Implementation and launch verification

The initial audit is a historical baseline. The launch domain is **shinbo.app**, purchased through Cloudflare; shinbo.sh is not owned and is not used by the launch site.

## Implemented

- Preserved the user’s “free, open-source meta-harness” description and removed the visible “Your coding agents. One workspace.” headline.
- Kept Three.js on normal-motion desktop browsers; mobile uses the static SVG and does not download the renderer, even after pressing Play. Desktop enhancement loads after paint, caps pixel density, and stops when paused, offscreen, or hidden. Fixed the first-frame texture exception.
- Split route bundles, delivered prerendered route CSS before JavaScript, and repaired direct HTML/directory route hydration. Unknown paths have a real not-found page.
- Added responsive WebP screenshots and lossless WebP backgrounds, removed duplicate PNG delivery, and served fonts locally with licenses.
- Corrected docs heading order, image dimensions, and timeline accessible names. Manual platform selection now updates the header download as well.
- Updated canonicals, sitemap, crawler files, metadata and machine-readable references to shinbo.app. Kept design previews out of the sitemap and marked them noindex.
- Added concrete first-task, CLI handoff and persistent-record guidance. Setup requirements, model costs, release-versus-development scope and platform limitations are explicit.
- Added GitHub checks and the Cloudflare deployment contract. All ordinary builds use committed assets and need no image-conversion tooling.

## Validation

`npm run check` passes: formatting, ESLint, TypeScript/client/SSR builds, route/metadata/assets checks for 21 generated pages, download selection, motion controls, 18 screenshot hashes and six design previews. ESLint has 19 existing warnings and no errors. The optional Three.js chunk still produces a bundle-size advisory.

Browser checks confirmed desktop rendering, static mobile (including after Play), no page errors, automatic Mac detection, manual Windows selection updating the header, and direct harness.html loading without hydration errors. Desktop and mobile screenshots were inspected.

The repeated local homepage Lighthouse median improved from mobile **71 to 94** and desktop **96 to 100**. Final documentation confirmations scored **94/100** (mobile/desktop) for the index and **96/100** for the harness guide. All measured pages scored 100 in accessibility, best practices and SEO. See [performance evidence](performance.md) for exact methodology, separate confirmation runs, payloads and residual limits. These are laboratory scores; they do not establish real-user Core Web Vitals or search/AI recommendation outcomes.

GitHub push CI [34708073486](https://github.com/tronschell/shinbo-website/actions/runs/34708073486) passed for initial website commit `722bdba840a422204768edb152af26c064290ba0`. Cloudflare native Git integration was authorized for this repository only. The final commit is `3d0640e93411507b41486ef2f389218d87b0b191`. Its [GitHub CI34708254578](https://github.com/tronschell/shinbo-website/actions/runs/34708254578) passed. Cloudflare automatically received the `github:push` event and deployed it successfully as `1d1e8338-a987-4670-aa02-334e5c235cbe` at 17:27:47 UTC, without a manual rebuild.

`shinbo.app` is active with valid HTTPS and a proxied CNAME to `shinbo-website.pages.dev`. Authoritative DNS and Cloudflare DNS resolve it. Some resolvers still cache the earlier empty response; the launch HTTP checks used the DNS-observed address `104.21.29.40` while retaining hostname and certificate validation. All **32 route/reference checks** passed, including clean and HTML aliases, sitemap, robots, text references and an unknown-path 404. Served markup matches the final build apart from build-generated asset hashes; hashed assets have immutable one-year caching. The [route receipt](evidence/live-route-checks.json) records this caveat. The live robots file matches the repository and has no injected crawler block.

The final scoped accessibility check passed after timeline buttons adopted native visible names, retaining start times as descriptions. Live Cloudflare Lighthouse scored **95 mobile / 100 desktop**, with accessibility, best practices and SEO all 100, no runtime errors and no failed assets. Mobile did not request Three.js; desktop did. These two live runs used the documented DNS override and are single laboratory observations. Full evidence is in [the performance report](performance.md).

## Growth work after publication

The [competitor and keyword research](market-research.md) contains the prioritized audience, ten alternatives, query opportunities and content briefs. The strongest next proof is a recorded, released-version Claude-to-Codex workflow with an inspectable result. No outreach or promotional messages were sent. Rankings, assistant recommendations and activation have not been measured; publication alone does not prove adoption.

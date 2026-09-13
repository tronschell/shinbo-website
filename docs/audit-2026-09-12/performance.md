# Final performance comparison — 12 September 2026

The revised site is substantially faster while retaining the Three.js mark on normal-motion desktop. The home’s matched three-run performance median improved from **71 → 94 mobile** and **96 → 100 desktop**. Final one-off confirmation scores are **94/100 home, 94/100 docs, and 96/100 Harness** (mobile/desktop). All final accessibility, best-practices, and SEO scores are **100**, with **zero TBT** and no console exceptions or failed HTTP assets.

The user owns **shinbo.app**, now deployed on Cloudflare. Live homepage checks measured **95 mobile / 100 desktop**, with accessibility, best-practices, and SEO all **100**. The local comparison and live-origin tests below are laboratory measurements, not proof of indexing, rankings, AI citations, or a field Core Web Vitals pass. The earlier `shinbo.sh` address belongs only to the historical baseline.

## Live Cloudflare verification — 17:30–17:31 UTC

Tested `https://shinbo.app/` after the GitHub-triggered Cloudflare deployment of commit `3d0640e93411507b41486ef2f389218d87b0b191` completed (deployment readiness confirmed by the root task). One mobile and one desktop run, same Lighthouse/Chrome versions and simulated device settings as the local comparison. This is the **live Cloudflare-served website**, not the local preview; the deployed build's asset hashes can differ from the macOS build.

| Live homepage | Performance | A11y | Best practices | SEO | FCP | LCP | TBT | CLS | Transfer / requests |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| [Mobile](lighthouse/live-shinbo-app-mobile.report.html) | 95 | 100 | 100 | 100 | 1.826s | 2.704s | 0ms | 0 | 250,733 B / 53 |
| [Desktop](lighthouse/live-shinbo-app-desktop.report.html) | 100 | 100 | 100 | 100 | 0.476s | 0.645s | 0ms | 0.000026 | 454,381 B / 60 |

Both completed with **zero run warnings, console exceptions, and failed HTTP assets**. Desktop fetched the Three.js renderer; mobile did not. Raw JSON siblings preserve complete configuration and requests; [live summary](lighthouse/live-shinbo-app-summary.json) gives compact metrics. Live mobile LCP is still slightly above 2.5s, and these are single-run observations, not medians or real-user metrics.

**Transport caveat:** this machine's normal DNS lookup still returned `Could not resolve host: shinbo.app`. Root independently confirmed authoritative/Cloudflare DNS and a valid TLS 200 response at `104.21.29.40`. Chrome therefore used the **DNS-only** override `--host-resolver-rules=MAP shinbo.app 104.21.29.40`. The requested hostname and HTTPS URL remained `shinbo.app`; normal certificate validation stayed enabled, with **no certificate-ignore flag**. These successful runs verify that Cloudflare serves the site securely through that route; they do not prove this machine's ordinary resolver cache had recovered or measure normal DNS lookup time. Field data and universal resolver propagation remain separate checks.

An initial attempted run quoted the entire Chrome flag in a form Lighthouse's CLI parser did not accept, so the override was not applied and navigation hit an interstitial. It is retained as `live-shinbo-app-mobile-failed-flag.*`, excluded from scores. A direct Chrome navigation with the atomic resolver argument returned HTTPS 200; the successful Lighthouse reruns quoted only the flag value:

```sh
CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' \
  /tmp/shinbo-lighthouse/node_modules/.bin/lighthouse https://shinbo.app/ \
  --chrome-flags="--headless --no-sandbox --host-resolver-rules='MAP shinbo.app 104.21.29.40'" \
  --output=json --output=html --output-path=/tmp/shinbo-live-mobile
```

Add `--preset=desktop` for desktop. Remove the resolver override once ordinary DNS is working; do not hard-code this Cloudflare address into the application.

## Comparison and evidence

Same Lighthouse 13.4.1, Chrome 153, local port 4187, mobile/desktop presets, fresh browser launches, sequential uncontended runs as the baseline below. Ten matched after-runs were followed by six confirmation runs after a remaining PNG background, image-dimension attributes, and preload priority were corrected. Files prefixed `after-final-` describe that final measured build. The three-run home median remains clearly distinguished from the final one-off confirmation. All 16 after-runs completed without Lighthouse run warnings.

| Page / device | Baseline performance | After performance | Baseline LCP | After LCP | Baseline transfer | After transfer |
|---|---:|---:|---:|---:|---:|---:|
| Home mobile (3-run median) | 71 | 94 | 6.906s | 2.866s | 1,396,007 B | 276,705 B |
| Home desktop (3-run median) | 96 | 100 | 1.278s | 0.607s | 1,396,007 B | 481,087 B |
| Docs mobile (final confirmation) | 72 | 94 | 6.267s | 2.936s | 1,549,717 B | 380,018 B |
| Docs desktop (final confirmation) | 97 | 100 | 1.286s | 0.626s | 1,549,717 B | 264,994 B |
| Harness mobile (final confirmation) | 81 | 96 | 4.055s | 2.591s | 659,848 B | 210,416 B |
| Harness desktop (final confirmation) | 99 | 100 | 0.946s | 0.607s | 811,694 B | 293,102 B |

Home mobile transfer fell **80.2%** and median LCP **58.5%**. Desktop transfer fell **65.5%**, despite the desktop measurement including the optional Three.js renderer. Original first-run mobile TBT was an outlier (1,699ms); the baseline median was 30.5ms, while every after-run measured 0ms. The home after-repeat scores were mobile **95, 94, 94** and desktop **100, 100, 100**; mobile LCP ranged 2.794–2.869s. Final home single-run confirmation was 94/100 with LCP 2.864/0.605s.

| Final confirmation | Performance | A11y | Best practices | SEO | FCP | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| [Home mobile](lighthouse/after-final-home-mobile.report.html) | 94 | 100 | 100 | 100 | 1.808s | 2.864s | 0ms | 0.0000 |
| [Home desktop](lighthouse/after-final-home-desktop.report.html) | 100 | 100 | 100 | 100 | 0.444s | 0.605s | 0ms | 0.0000 |
| [Docs mobile](lighthouse/after-final-docs-mobile.report.html) | 94 | 100 | 100 | 100 | 1.882s | 2.936s | 0ms | 0.0000 |
| [Docs desktop](lighthouse/after-final-docs-desktop.report.html) | 100 | 100 | 100 | 100 | 0.464s | 0.626s | 0ms | 0.0007 |
| [Harness mobile](lighthouse/after-final-harness-mobile.report.html) | 96 | 100 | 100 | 100 | 1.897s | 2.591s | 0ms | 0.0000 |
| [Harness desktop](lighthouse/after-final-harness-desktop.report.html) | 100 | 100 | 100 | 100 | 0.465s | 0.607s | 0ms | 0.0000 |

Every HTML report has its matching `.report.json`; [after-summary.json](lighthouse/after-summary.json) records all after-runs, timestamps, metrics, requests, warnings, renderer requests, and errors. The original baseline and excluded preview-fallback reports remain unchanged.

## What changed and what was verified

- The 936kB shared JavaScript file became route chunks. The common entry is now about **185kB raw / 58.5kB gzip**; the **538kB raw / 134kB gzip** Three.js renderer is separately loaded on eligible desktop only. Its remaining large-chunk warning is not an initial mobile/docs dependency.
- Screenshots/backgrounds use smaller responsive WebP assets, fonts are local, route styles are separated, and the important background is preloaded. The confirmation specifically caught and removed a duplicate 171kB clouds PNG still referenced in docs CSS; mobile docs LCP improved 3.754 → 2.936s between the first after-run and confirmation.
- The hero’s frame time begins at its first rAF timestamp, preventing the negative texture index; idle scheduling, visibility, reduced-motion, pause, and desktop-media gating prevent unwanted work. DPR is capped at 1.5. The static SVG is present in initial HTML.
- **Actual browser verification:** desktop produced a canvas with `data-rendered="true"` and loaded `hero-mark-renderer`; mobile had neither canvas nor renderer request, including after clicking Play. Both had no page errors. See [canvas check](lighthouse/after-canvas-check.json). All desktop home Lighthouse runs also recorded the renderer request (~133.7kB transferred); this improvement was not obtained by disabling the desktop mark.
- Docs heading order and home console errors are fixed in the measured reports. Explicit logo dimensions and the confirmed LCP preload priority pass in final home reports. The six final Lighthouse reports preceded one last annotation-only change: timeline buttons now use their native visible names with start time in `aria-description`. The scoped axe 4.13.0 check on the rebuilt page returned **0 violations and 0 incomplete results** for `label-content-name-mismatch`; [raw scoped check](lighthouse/after-label-check.json). The historical reports retain their old informational flag rather than being altered.

Visual artifacts from the three-run comparison: [desktop viewport](lighthouse/after-home-desktop-viewport.jpg), [mobile viewport](lighthouse/after-home-mobile-viewport.jpg), [desktop full page](lighthouse/after-home-desktop-full.jpg), [mobile full page](lighthouse/after-home-mobile-full.jpg). Root inspected the viewports and exercised platform selection/navigation separately.

## Remaining limits

Mobile LCP remains **2.59–2.94s** in final confirmations, slightly above the 2.5s good threshold; a high overall Lighthouse score does not erase that metric. Final docs/Harness are single observations, so remeasure medians if making another performance decision. Further gains should be tied to a concrete requirement and measured against image clarity and visual behavior. No field INP or real-user data was collected in these tests. Desktop graphics quality and runtime resource use are not summarized by the score alone.

Reproduce using the commands in the original methodology below, with the `after-final` reports as the current baseline. The local build comparison is complete; verify the deployed `https://shinbo.app/` HTTPS origin, caching, compression, static route handling, and field data separately.

---

The following original findings describe the **pre-fix baseline**, retained for audit history. They are not a list of currently unresolved defects.

# Original baseline audit — 12 September 2026

The current production build is strong on desktop and materially slower on simulated mobile. Home mobile median performance is **71**, with **6.91s LCP**. All six home runs produced a JavaScript exception. The best first work is image delivery, critical-path CSS/font loading, and removing unused routes/Three.js from the shared entry bundle. No application or dependency files were changed for this audit.

## Scope and methodology

- Built the current working tree with `npm run build`: TypeScript, Vite client/SSR, and static prerender all passed. Existing uncommitted changes were preserved; these results describe that working tree, not a verified deployed revision.
- Local origin: `http://127.0.0.1:4187`, Vite 8.2.2 preview serving `dist`. Node 24.19.0; Lighthouse **13.4.1**; Headless Chrome **153.0.0.0**; axe-core 4.13.0, macOS host. Individual report timestamps are UTC.
- Sequential navigation audits, fresh Lighthouse Chrome launches and default storage reset. Three home runs per device, one run per device for docs index and the Harness feature guide. No concurrent benchmark runs. First-run outlier retained.
- Mobile default simulated throttling: 412×823, DPR 1.75, 150ms RTT / 1,638.4 Kbps throughput / 4× CPU slowdown. Desktop preset: 1,350×940, DPR 1, 40ms RTT / 10,240 Kbps / 1× CPU. Raw JSON contains exact configuration and host benchmark indices.
- These are **local laboratory measurements**, not live-origin or real-user measurements. They do not establish CDN latency, TLS behavior, cache effectiveness, geography, field INP, or a Core Web Vitals pass. Lab/field differences are explained in [Google's guidance](https://web.dev/articles/lab-and-field-data-differences); performance scores vary with conditions, so medians and ranges are retained per [Lighthouse scoring guidance](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring).
- Live attempt: `curl -I --max-time 20 https://shinbo.sh` failed DNS resolution even outside the sandbox. Actual Lighthouse navigation failed with `CHROME_INTERSTITIAL_ERROR`, redirected to `chrome-error://chromewebdata/`. **No valid live scores or field data were obtained.** This environment's failure alone does not prove a worldwide outage. [Failed report](lighthouse/live-home-mobile.report.html), [JSON](lighthouse/live-home-mobile.report.json), [log](lighthouse/live-home-mobile.log).

## Results

Home rows show medians of three runs; other rows are single observations. Scores are /100, time values seconds except TBT milliseconds. CLS rounded to four decimals.

| Route | Device | Perf | A11y | Best practices | SEO | FCP | LCP | TBT | CLS |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|
| `/` | Mobile | 71 | 100 | 96 | 100 | 3.005 | 6.906 | 30.5 | 0 |
| `/` | Desktop | 96 | 100 | 96 | 100 | 0.663 | 1.278 | 0 | 0.0000 |
| `/docs/` | Mobile | 72 | 98 | 100 | 100 | 2.926 | 6.267 | 23.5 | 0 |
| `/docs/` | Desktop | 97 | 98 | 100 | 100 | 0.664 | 1.286 | 0 | 0.0017 |
| `/docs/harness/` | Mobile | 81 | 100 | 100 | 100 | 3.005 | 4.055 | 26 | 0 |
| `/docs/harness/` | Desktop | 99 | 100 | 100 | 100 | 0.662 | 0.946 | 0 | 0.0000 |

All valid runs had no Lighthouse run warnings. Lighthouse 13.4.1 additionally reports agentic-browsing=100 on these runs; this checks its automated criteria, **not** AI recommendation visibility, citation likelihood, or content accuracy. SEO=100 likewise does not establish rankings or indexing. A11y=100 is not a manual accessibility certification; the home report still lists the informational label-content-name-mismatch finding.

| Home repeat | Performance | LCP | TBT | Speed Index | Report |
|---|---:|---:|---:|---:|---|
| Mobile 1 | 41 | 6.977s | 1,699ms | 4.913s | [HTML](lighthouse/local-home-mobile-1.report.html) |
| Mobile 2 | 71 | 6.906s | 30.5ms | 3.005s | [HTML](lighthouse/local-home-mobile-2.report.html) |
| Mobile 3 | 71 | 6.904s | 28ms | 3.004s | [HTML](lighthouse/local-home-mobile-3.report.html) |
| Desktop 1 | 97 | 1.264s | 0ms | 0.693s | [HTML](lighthouse/local-home-desktop-1.report.html) |
| Desktop 2 | 96 | 1.279s | 0ms | 0.886s | [HTML](lighthouse/local-home-desktop-2.report.html) |
| Desktop 3 | 96 | 1.278s | 0ms | 0.888s | [HTML](lighthouse/local-home-desktop-3.report.html) |

The mobile first run spent 5.4s on main-thread work including 3.64s script evaluation; this is a real observed outlier, not representative steady behavior. Its specific cause was not isolated. LCP is consistently slow across all three mobile runs, even when TBT is low. Do not present 1,699ms as the typical TBT or claim that all mobile delay is JavaScript execution.

Other valid reports: [docs mobile](lighthouse/static-docs-mobile.report.html), [docs desktop](lighthouse/static-docs-desktop.report.html), [Harness mobile](lighthouse/static-harness-mobile.report.html), [Harness desktop](lighthouse/static-harness-desktop.report.html). Each HTML has a sibling `.report.json`; [machine-readable summary](lighthouse/summary.json) includes both valid runs and excluded attempts.

## Observed request and transfer totals

| Static page | Device | Requests | Total transfer bytes |
|---|---|---:|---:|
| Home (run 2) | Mobile | 51 | 1,396,007 |
| Home (run 2) | Desktop | 51 | 1,396,007 |
| Docs index | Mobile / desktop | 24 | 1,549,717 |
| Harness guide | Mobile | 20 | 659,848 |
| Harness guide | Desktop | 21 | 811,694 |

These are compressed network transfer measurements including headers, distinct from build gzip estimates and filesystem sizes. The larger desktop guide total reflects the actual requests recorded for that viewport. JSON `resource-summary` and `network-requests` retain the full type and URL breakdown.

## Prioritized findings

### P1 — Home animation throws in every run

All six home reports contain `TypeError: Cannot read properties of undefined (reading 'image')` at the compiled `HeroMark` aspect helper. Source: [HeroMark.tsx](../../src/HeroMark.tsx), lines 80–85 and 140–166. The helper reads `t.image`; the animation indexes texture arrays from elapsed time without validating the index. An initial rAF timestamp preceding the effect's `performance.now()` is a plausible route to a negative phase and `tex[-1]`, but was **not instrumented or proven** in this audit. Establish the cause with timestamp/index logging; initialize elapsed-time origin from the first callback or guard the computed phase if confirmed. Retest a cold home navigation and ensure the error is absent. Best practices is 96 because of the console exception, not merely a stylistic concern.

Related code concern, not a proven cause of score loss: the mark schedules rAF continuously even under reduced motion and while offscreen (the offscreen branch returns after scheduling the next frame). It has no global pause input. Stop/pause work when hidden or motion is paused; provide a static SVG fallback if WebGL creation fails. This also merits keyboard/motion validation outside Lighthouse.

### P1 — Mobile image delivery and CSS-discovered visual assets dominate payload

Home mobile observed **51 requests / 1,396,007 bytes transferred**, including 44 image requests / 1,071,060 bytes. Largest home assets include workspace PNG 237,689 transfer bytes, clouds background 171,465, workspace background 170,011. The 2760×1720 hero screenshot renders at 356×222 CSS pixels on mobile; Lighthouse estimates **228 KiB** image savings. Use appropriately sized `srcset`/`sizes` and modern compressed variants while retaining enough resolution for screenshots; preserve explicit dimensions and the existing hero `fetchpriority="high"`.

The LCP diagnostic identifies `section#fg-overview`, with a CSS background absent from initial HTML discovery. `src/shinbo-site.css:299–307` adds the clouds via pseudo-elements; it becomes visible only after stylesheet discovery. Reduce/compress decorative backgrounds, and only preload an asset after confirming it is actually the critical LCP resource. Blindly adding priority to the hero `<img>` will not fix this diagnostic: it already has that hint.

Static docs index mobile observed **24 requests / 1,549,717 bytes**, with **730 KiB** estimated image delivery savings. Thumbnail PNGs use fixed 720px sources even when displayed around 296px wide ([common.tsx](../../src/variations/common.tsx), lines 195–205). Resize/compress those alongside the hero. Existing `loading="lazy"` and dimensions are good, but lazy loading alone does not make each fetched file smaller. Resource totals cover the Lighthouse navigation recording and may include below-fold images in its loading range; they are not a claim about initial critical bytes alone.

### P2 — Every route receives the same large JS/CSS entry

Build output: `index-DI6Q-5-m.js` **936.08 kB raw / 247.43 kB gzip**; `index-BLTP06WW.css` **142.57 kB raw / 27.38 kB gzip**. Vite warned the JS chunk exceeds 500kB. Lighthouse home mobile 2 records ~246kB transferred JS and estimates 95KiB unused; static docs estimates **136KiB unused JS** and around 20KiB unused CSS.

`src/App.tsx:3–8` eagerly imports docs, the home, and Variations. `src/variations/Variations.tsx:1–8` eagerly imports all six design variants. Home imports `HeroMark`, which imports Three.js (`src/HeroMark.tsx:2`). Split route-specific views and keep design-preview routes/Three.js out of docs' initial module graph. Reuse the existing router and prerender pipeline; validate hydration after splitting. No need for a new routing library.

### P2 — Blocking stylesheet/font chain delays first paint

All mobile pages have ~2.93–3.02s FCP. Home mobile Lighthouse estimates **1,050ms** render-blocking savings: Google Fonts CSS (~797ms modeled delay) plus entry CSS (~452ms; estimates are not additive guaranteed gains). `index.html:34–39` already preconnects and uses `display=swap`, but the Google stylesheet remains render blocking. Consider a system font or a small self-hosted font with appropriate loading, then remove route-unused styles from the critical entry. Validate typography and layout shift after changes.

### P2 — Docs heading order and home accessible-name mismatch

Static docs A11y=98: the feature grid jumps to `<h3>Harness</h3>` without a preceding section-level heading (`src/variations/common.tsx:180`, rendered in docs index). Give the feature directory a real `<h2>` or align card heading levels with the page hierarchy. Home's informational `label-content-name-mismatch` lists timeline buttons whose visible `4s` text is replaced by `4 seconds` in the aria-label; preserve visible label wording in accessible names for speech input. The automated category score alone hides this lower-level finding.

## Local serving caveat — excluded runs

The first docs/harness audits used `/docs` and `/docs/harness` without trailing slashes. Vite preview served root SPA HTML for these URLs rather than the prerendered directory documents, then React replaced it on hydration (error #418). The root HTML payload was 12,323 transferred bytes for `/docs`; it even downloaded home images before replacing the DOM. These runs are kept as `local-docs-*` and `local-harness-*`, **excluded from the primary performance tables**. Repeating with `/docs/` and `/docs/harness/` served the actual static documents, removed the hydration exception, and reduced requests. This is evidence about this preview server configuration; inspect production clean-URL routing before treating it as a deployed defect.

## Repeat and acceptance checks

From the repository root, use the same tool version and run sequentially. Tooling remains external to project dependencies:

```sh
npm run build
npm install --prefix /tmp/shinbo-lighthouse lighthouse@13.4.1 --no-audit --no-fund
npx vite preview --host 127.0.0.1 --port 4187 --strictPort
```

In another terminal:

```sh
CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' \
  /tmp/shinbo-lighthouse/node_modules/.bin/lighthouse \
  http://127.0.0.1:4187/ --chrome-flags='--headless --no-sandbox' \
  --output=json --output=html --output-path=/tmp/shinbo-home-mobile-1
```

Repeat three times with distinct paths; add `--preset=desktop` for desktop, and use `/docs/` and `/docs/harness/` for static subpages. Keep original runs for comparison; do not overwrite this baseline. Once the live domain is reachable, repeat against the real origin and confirm static route behavior, cache/compression headers, and deployed asset hashes. Obtain CrUX/PageSpeed field data if available; if insufficient, collect real-user LCP/INP/CLS before claiming a field pass.

Suggested acceptance: no home console exceptions; correct static HTML on clean documentation URLs; meaningfully reduced image/JS transfer; three-run mobile median LCP trending below 2.5s and performance above 90, without regressions to CLS, appearance, hydration, keyboard use, or motion controls. Lighthouse estimates are hypotheses to measure, not promised gains. The existing zero/near-zero lab CLS, prerendered content, SEO checks, image dimensions/lazy thumbnails, and strong desktop results should be preserved.

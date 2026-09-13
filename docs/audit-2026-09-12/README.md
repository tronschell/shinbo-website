# Shinbo performance and discovery audit

> Follow-up: fixes and launch work are documented in [implementation and verification](implementation.md). The findings below preserve the original audit baseline.

Prepared September 12, 2026. Scope: the existing website working tree, local production build, public DNS/release checks, and internet competitor/keyword research. Three Astra subagents used low reasoning effort. This audit adds evidence and recommendations; it does not change the application, deploy the site, change DNS, contact anyone, or add analytics.

## Decisions in order

The first constraint is access, then product reliability and comprehension, then distribution. Keyword work cannot compensate for a domain that does not resolve. “Widely used” remains an outcome to earn and measure, not a result of completing this audit.

| Local production page | Mobile performance | Desktop performance | Mobile LCP |
| --- | ---: | ---: | ---: |
| Homepage | 71 | 96 | 6.91s |
| Docs index | 72 | 97 | 6.27s |
| Harness guide | 81 | 99 | 4.06s |

Homepage values are three-run medians; guide values are single observations per device. All valid local runs scored 100 on Lighthouse SEO checks, which does not establish public indexing or AI visibility. Fifteen Lighthouse attempts are retained: ten valid baseline runs, four excluded local-routing attempts, and one failed live attempt. Details, all categories, ranges and raw reports are in [performance](performance.md).

| Priority | Action | Evidence / confidence | Validation before considering it done | Owner and effort |
| --- | --- | --- | --- | --- |
| P0 | Confirm the intended live domain; make its DNS and deployment reachable. | Google and Cloudflare public DNS both returned NXDOMAIN for `shinbo.sh`; all canonical URLs point there. High confidence in the observation, unknown administrative cause. | Resolve the domain, verify HTTPS and actual content on all 13 public pages, redirects and a real unknown-route 404. Then rerun production Lighthouse. | Domain/hosting owner; effort unknown until configuration is inspected. |
| P1 | Fix the animated logo's runtime error; supply a static fallback and honor pause/reduced motion. | All six home Lighthouse runs and an independent browser session reported `undefined.image`. The WebGL logo is eagerly loaded and its loop is separate from the page pause state. | No console errors, correct fallback without WebGL, motion control visibly works; rerun the same mobile/desktop matrix. | Website; small-to-medium change. |
| P1 | Use one selected download platform across homepage controls. | Manually selecting Windows or Linux changes the main/hero/bottom actions, but the sticky header still offers the detected Mac DMG. `SiteHeader` creates its own independent download hook. | On each supported/unsupported manual choice, every context-sensitive CTA agrees. Keep explicit direct-download links available. | Website; small shared-state fix and one browser regression check. |
| P1 | Reduce initial page work and serve appropriately sized imagery. | Homepage median mobile LCP is 6.906s; every route receives the same roughly 936 KB uncompressed JS bundle, including previews and Three.js. See the performance report for measured opportunities. | Compare matched runs after isolating optional code and resizing assets; preserve SSR bodies and static route metadata. Confirm gains on real hosting. | Website; medium effort, measure each substantial change. |
| P1 | Explain the first useful job and reconcile learning/release claims. | Current first definition is “self-learning meta-harness”; detailed documentation describes a user-controlled process and source newer than release. | Newcomer can explain the job, costs and prerequisites; claim ledger agrees with the release and visible copy/schema. | Product + website; small copy change, separate release-level validation. |
| P1 | Prove one two-CLI handoff and one clean first-task setup. | Good fit with source and researched user language; current evidence is not a released workflow test. | Record actual draft → review → revision execution and installation/setup on advertised platforms. Document stdout/session limits. | Product; medium effort. |
| P2 | Improve the existing Harness/Models guides, then run one distribution experiment. | Multiple direct/native alternatives already claim agent orchestration. Three content briefs identify narrower supported jobs. | Qualified people reach the guide, complete a useful task, and voluntarily report repeat use. | Content/product; one bounded experiment first. |
| P2 | Establish search/activation baselines and test real AI answer surfaces after access is fixed. | Search samples found no official result; no owned-property metrics or consumer AI answers were available. | Fixed prompts, actual answers and sources, complete/error counts, and separately measured install/activation outcomes. | Owner/product; reuse available accounts and measurement. |

Recommended sequence: finish the P0/P1 website corrections, verify the live release journey, publish one truthful walkthrough through existing owned surfaces, and observe a small willing cohort. Expand content and outreach only when that cohort can get useful work done. Proposed experiments are detailed in [market research](market-research.md).

## Working brief

- **Product:** Shinbo, formerly Emma, maintained at [tronschell/shinbo](https://github.com/tronschell/shinbo). The configured canonical domain is `https://shinbo.sh`.
- **Audience hypothesis:** developers already using more than one coding-agent CLI who need a readable record of work and an explicit way to pass one run's output to another.
- **Offer:** free application; provider/API/subscription costs and limits remain separate. Initial setup requires a verified OpenRouter key, including for users intending to use subscriptions or local models.
- **Published distribution:** GitHub's latest-release API returned v0.7.1, published September 6, with Apple silicon Mac and Windows x64 installers still named Emma. These names match the website links. Downloading or running an installer was not part of this audit. See [release evidence](evidence/release.json).
- **Source boundary:** the website contains substantial pre-existing uncommitted changes and labels screenshots as development-build examples. Present website features are not evidence that every feature shipped in v0.7.1. See [baseline hashes](evidence/source-baseline.json).
- **Success event:** a qualified person completes a useful first agent task, then returns to complete another. Download clicks, installation, activation, retention, and AI mentions are separate observations.
- **Unavailable measurement:** no Search Console, Bing Webmaster Tools, analytics property, production crawl logs, installation cohort, or usage-retention dataset was inspected. Source searches found no analytics integration in the website entry, scripts, package, or `src` files; hosting-level analytics may still exist.

## Evidence reports

1. [Lighthouse performance report](performance.md): actual local mobile/desktop measurements, raw reports, root causes, and reproduction instructions.
2. [Search, answer, and generative discovery](search-discovery.md): DNS, rendered route checks, metadata/schema, product consistency, and dated search observations.
3. [Competitor and keyword research](market-research.md): alternatives, query evidence, intent priorities, content briefs, and distribution experiments.

## Conversion and product-truth findings

These observations come from the current website implementation and documentation, not a test of the shipped desktop application.

| Finding | Evidence | Why it matters | Smallest useful action |
| --- | --- | --- | --- |
| The first visible definition is difficult for a new visitor to interpret. | `src/ShinboSite.tsx` leads with “A free, open-source, self-learning meta-harness”; all four description surfaces in `index.html` repeat a shortened version. The more concrete H1 is visually hidden. | A visitor must learn the category before understanding the job. Metadata repeats the same ambiguity for retrieved snippets. | Keep the brand/design, but lead with the actual task and explain “meta-harness” below it. Measure comprehension and first-task completion. |
| Automatic-learning wording exceeds the described user-controlled process. | Homepage: after a failure it finds a cause and replays; `src/docs/agent.tsx` describes user selection, asking for analysis, a paired bench, and choosing keep/discard, and explicitly denies autonomous self-healing. | A trial user may expect a background repair system that the guide does not promise. | Align the homepage, feature directory, metadata and machine references with the documented workflow; show a real recorded example before claiming measured improvement. |
| Existing setup and platform disclosures are useful. | `src/downloads.ts` and `src/variations/common.tsx` give architecture requirements, unsupported platforms, unsigned Windows status, Emma filenames, direct installer links, and the required OpenRouter key. | These reduce wrong-platform downloads and surprise costs. | Preserve these disclosures. Make the setup guide and key-acquisition step easy to reach from the first CTA. |
| The sticky header ignores the visitor's explicit platform choice. | Manual browser test: select Windows, then Linux; main/hero/bottom controls follow the selection while header remains “Download for Mac.” `src/SiteChrome.tsx` owns a separate `usePlatformDownload()` instance. | A visitor can deliberately choose a system and still receive the wrong installer from the persistent CTA. | Pass the homepage's existing selected download state into the header, with appropriate default behavior on docs pages. Verify all contextual CTAs together. |
| The handoff promise has meaningful limits. | `src/docs/harness.tsx`: latest successful stdout only; no files or terminal log; up to eight sources in the same thread; CLI run/session memory lasts only while Shinbo is open. | “Persistent threads” must not become a claim of seamless session migration or restart-persistent native CLI sessions. | Demonstrate a bounded draft → review handoff and show where files and original runs remain. |
| The docs expose implementation detail before a single first success. | The existing setup destination is `/docs/models`, a long guide to roles, routes, providers, and limits. The harness guide has useful steps but assumes an installed and authenticated CLI. | A new user can download successfully and still fail to get value. This is a conversion hypothesis, not an observed user failure. | Add a short “first useful task” section to an existing guide, with prerequisites, a safe sample folder, expected result, and common recovery steps. Observe a small opt-in trial cohort before building more onboarding. |
| Machine references and historical audit notes need maintenance. | The previous AEO report claims 12 FAQs; current `productFaq` has four. The agent guide again says “1 MiB” where the old evidence ledger described a character ceiling. | Stale evidence can be mistaken for a current validation pass. | Use the current search report as the baseline; recheck underlying product code before changing the trace unit. Do not blindly reuse old audit conclusions. |

## Reviewable copy proposal

This is proposed wording, not a website edit or a claim that every described workflow has been tested in the published release.

**Headline:** “Run your coding agents in one workspace.”

**Supporting text:** “Use your installed agent CLIs in a Shinbo thread, inspect their results, and pass one run's output to another. Free for Apple silicon Mac and Windows x64; model services may cost extra.”

**Setup line:** “Setup requires a verified OpenRouter key. Your agent CLIs must be installed and signed in separately.”

**Self-improvement line:** “Inspect failed runs, ask Shinbo for a scoped change, and compare it on a replay before deciding to keep it.”

**Meta description candidate:** “Run coding-agent CLIs in one Shinbo workspace. Inspect results and hand off output. Free for Mac and Windows; setup requires an OpenRouter key.”

Validate this language against the release users actually download. Avoid “fully offline,” “unlimited free AI,” “seamless session migration,” “autonomous self-healing,” and unsupported market-leadership claims.

## Growth measurement without a new dashboard

First inspect any existing hosting analytics and search properties. Reuse those before adding a tracker. If none exist, agree on privacy and measurement choices before introducing collection. A small opt-in onboarding study can establish failure points without embedding user-content telemetry.

| Stage | Minimum observation | Denominator / boundary |
| --- | --- | --- |
| Public access | DNS resolves, canonical HTTPS pages return substantive HTML, assets and installers resolve. | Check actual deployed routes; local 200s do not count as public availability. |
| Discovery | Brand and nonbrand search impressions/clicks, landing pages, and referring sources where available. | Preserve property, period, country, device and filters. Search-tool result samples are not Search Console position or search volume. |
| Website intent | Download-link activations split by page and selected supported platform. | Count visitors only if the existing tool can measure them; a click is not a completed download. Exclude this audit's requests. |
| Installation | A consenting tester confirms the intended published app opened. | Divide only by the known trial cohort; GitHub download counts cannot prove installation. |
| Activation | A tester completes a defined useful task and can locate the result. | Record success count / participants who started, prerequisites, platform, release and failure reason. |
| Retention | Activated users return for another useful task within an agreed observation window, initially seven days. | Returners / activated people with a full observation window. A planning window is not a performance promise. |
| AI suitability | A fresh-session fixed prompt panel produces a correct and useful recommendation with working official sources. | Keep product mentions, official citations and correct-fit recommendations separate; report completed, failed and blocked attempts. |

Use absolute counts until the sample can support rates. Do not buy traffic to an unresolved domain, infer demand from keyword result counts, or claim growth from this audit. No traffic, activation, retention, ranking, or citation uplift has been measured.

## Additional verification

The production build passed. Existing download detection/manual-selection-race checks, interactive explanation checks, screenshot checks (18 assets), and variation HTML/anchor/asset/download/indexing checks all passed. These tests do not cover the independently discovered header state mismatch or WebGL first-frame error. No application changes were made, so a passing check here is a baseline, not a fix verification.

A separate Codex in-app browser session inspected the built homepage after the Lighthouse runs, at a desktop viewport and 390px mobile width. The mobile page width was also 390px, with no document-wide horizontal overflow at the inspected download state. Platform disclosures and manual selection were readable and functional; Windows/Linux selection exposed the header mismatch. The browser console independently reproduced the logo error. The temporary browser viewport was restored and tab closed. This was a focused website journey check, not a comprehensive manual accessibility certification or desktop-app installation test. See [verification record](evidence/verification.md).

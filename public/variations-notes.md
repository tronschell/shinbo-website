# Shinbo: six layout directions

Prepared September 12, 2026. Six independent subagents designed the six pages; the coordinator supplied shared product facts, download guidance, integration and verification. These are local selection previews, not a published redesign.

| Direction           | Information architecture                                                                                    | Best fit                                                                        | Tradeoff                                                                            |
| ------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 01 Editorial        | Plain-language promise → large workspace proof → numbered product story → download → feature reference      | Broad first-time audience; strongest brand introduction                         | Longer path to detailed compatibility than Launchpad                                |
| 02 Launchpad        | Product introduction + download selector → workspace → first-run setup → use cases → complete reference     | Visitors arriving ready to install; recommended for the stated download problem | More practical than cinematic; download details take significant first-screen space |
| 03 Mission Control  | Product introduction → selectable workspace screenshots → handoff narrative → controls → download/reference | People who want to inspect the interface before committing                      | Darker and more technical; the screen tour needs interaction to see every screen    |
| 04 Workflows        | User goals → task-specific explanations → proof and documentation → download                                | Visitors who know what they want to accomplish but not the product category     | Requires concise task descriptions to avoid becoming a long tutorial                |
| 05 Shinbo workspace | Persistent section navigation → system overview → reference-oriented product explanation → download         | Technical evaluators and repeat visitors                                        | Selected layout; refined into the grey-and-pink homepage                            |
| 06 Atlas            | Visual product atlas → categorized screenshot stories → download/reference                                  | Product exploration and a distinctive dither-led brand                          | More image weight; keep real text beside every visual                               |

## Product truth resolved

The existing website is not a fully reliable source for current download availability. GitHub's live release API was read on September 12:

- Latest public release: **v0.7.1**, published September 6, 2026.
- Apple silicon Mac installer: `Emma-v0.7.1-darwin-arm64.dmg`.
- Windows x64 installer: `Emma-v0.7.1-win32-x64-Setup.exe`.
- Both assets are present in the official Shinbo repository. The former **Emma** name remains in the files and release notes. The previews explain this next to the download.
- Windows is **published but unsigned**. The old site's “unpublished” description is stale. The source release contract documents macOS 12+ on Apple silicon and Windows 10 version 1809+ on x64. Installers were not executed in this task.
- No Intel Mac or Linux desktop installer is published. The iPhone client is built but not publicly distributed; iPad and Android remain planned.
- The current source's first-run connection page marks an **OpenRouter key as required**. Optional subscriptions do not bypass it. The app is free; provider usage and subscriptions are separate.
- Features and screenshots are grounded in the current website docs and desktop source. Some source-head features are newer than v0.7.1. The previews label this distinction; they do not certify all current features as release-tested.
- Quick Ask/notch, Mac permission flows and local voice are Mac-specific. Windows availability does not imply full platform parity.
- Prompt reinjection and pruning are experiments, off by default. GPUI is an ongoing native rewrite. Trace retention is bounded. Local model support is not an app-wide offline guarantee.

Evidence: [official release](https://github.com/tronschell/shinbo/releases/tag/v0.7.1), [release contract](https://github.com/tronschell/shinbo/blob/dev/docs/releases.md), current local `desktop/src/model-plans.tsx`, website `src/docs.tsx`, `src/shared.tsx`, and `ROADMAP.md`.

## Shared discovery foundation

SEO, AEO and GEO should lead to useful answers and the correct install. The six layouts share these principles:

1. Explain **what Shinbo is** in normal words, then define “meta-harness.” Keep its name, repository and desktop category together to disambiguate the product.
2. Put **platform, architecture, installer type, setup prerequisites and cost boundaries** close to the action. Use actual release assets rather than send everyone into GitHub's full asset list without explanation.
3. Keep **capabilities in ordinary HTML**, with a clear heading hierarchy, real screenshots, descriptive captions and relevant links to all ten existing documentation pages.
4. Answer real evaluation questions: “Can I use Claude Code and Codex together?”, “Does it use my subscription?”, “Which Mac download?”, “Does Windows work?”, “Can I use local models?”, “What can I inspect?” Treat this as an editorial intent map, not measured keyword-volume research.
5. Provide reproducible product evidence. Existing dither exports frame existing screenshots; no customer logos, testimonials, usage counts or benchmark improvements were invented. The handoff screenshot's sample output is an interface demonstration, not a completed customer run.
6. Render the pages at build time. All six pages and the gallery get direct HTML output. Because these are competing previews, they deliberately use **noindex, follow** and are excluded from the production sitemap. They do not inherit the old homepage's SoftwareApplication assertions.

Google explicitly says ordinary SEO foundations apply to AI Overviews and AI Mode; there is no special AI text file or schema requirement. Crawlability, useful visible text, internal links, page experience and structured data consistent with visible claims matter. None guarantee indexing, ranking or citation. [Google's AI features guidance](https://developers.google.com/search/docs/appearance/ai-features).

## What to carry into the chosen design

The next implementation should promote one layout to `/` and preserve the useful existing docs URLs. It should also reconcile the old site surfaces together:

- Update the homepage, documentation, `llms.txt`, `llms-full.txt`, and structured data so none still claim Windows is unpublished or imply setup has no required provider account.
- Use one canonical SoftwareApplication entity with truthful OS, free application offer, provider-cost conditions, official repository, and release links. Do not add ratings or claim FAQ rich-result eligibility. The six previews do not compete for the production canonical entity.
- Give the final download section a durable `/download` URL only if it becomes a substantial installation/troubleshooting page. Keep architecture and platform choices manually selectable; browser OS detection alone cannot identify Mac chip architecture reliably.
- Align canonical, Open Graph and social titles/descriptions with the chosen plain-language positioning. Existing metadata updates on static page loads; revisit client-side navigation metadata when promoting the design.
- Keep useful doc pages accessible without reveal animation. Remove build-time-only sitemap `lastmod` and article `dateModified` updates; use genuine content changes as freshness signals.
- Reconcile existing machine-readable summaries for accuracy. Do not treat `llms.txt` as a proven ranking intervention, and do not change crawler/training permissions as a side effect.
- Optimize images for the final crop and rendered size, keep image dimensions, lazy-load secondary screenshots and honor reduced motion. Preserve the dither texture around screenshots, with readable solid surfaces behind text.
- After authorized publication, verify real HTTP status/redirects, rendered HTML, canonical URLs, mobile layout, installation links and available Search Console evidence. Local build success is not production verification.
- Measure platform-specific download selections and completed installation/first successful task where existing privacy choices and telemetry permit. Compare branded and problem-first discovery separately. No ranking, citation or conversion lift has been measured here.

## Scope

The current homepage and documentation remain the baseline. Existing unrelated working-tree changes were preserved. No release, website deployment, account creation, search submission, paid service or recurring monitor was performed.

## Verification completed

- `npm run check` passed: formatting, lint and production build. Existing code still emits 15 non-failing lint warnings and a legacy unresolved font-path build warning.
- `python3 scripts/check-variations.py` passed for all six pages: main headings, preview metadata, unique IDs, local anchors, image files, all ten documentation routes, platform choices and sitemap exclusion.
- All six layouts were visually inspected at 1280px desktop and 390px phone widths. No horizontal page overflow or broken loaded images appeared.
- All five platform choices were exercised, including the exact Windows installer URL. Mission Control's four screenshot controls switched to the expected images.
- Production-browser checks found and fixed a shared hydration bug: the initial app route now matches the pre-rendered URL. All six previews and a directly loaded documentation page then rendered with no browser console errors.
- Installer execution, performance benchmarks, production deployment, indexing and AI citation improvements were not tested or claimed.

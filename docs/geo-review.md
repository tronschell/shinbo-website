# Shinbo product identity and AI retrieval review

> Historical implementation record; superseded for current-state claims by [the September audit](audit-2026-09-12/README.md). The current site has four FAQs, not the twelve described in the earlier AEO snapshot. The owner confirmed shinbo.sh is an intended prelaunch domain, not yet acquired; DNS non-resolution is not a production outage. Source capabilities and screenshots do not certify the downloadable release.

Reviewed 2026-09-12. Scope: existing machine-readable references, source truth and a small public retrieval check. No publication, outreach, accounts, indexing submissions or crawler-policy changes.

## Implemented

Reconciled `public/llms.txt` and `public/llms-full.txt` with the current product evidence. They now explain Shinbo's former Emma name, macOS Apple silicon and Windows x64 availability, unsigned Windows installers, required OpenRouter first-run verification, separate provider costs, local-model limitations and bounded traces. They distinguish ongoing GPUI/phone work from a downloadable release. The long reference now summarizes capabilities and links to maintained guides instead of repeating volatile model catalogs, CLI flags and detailed limits across hundreds of lines.

The same material facts must remain in visible copy and metadata. These files are convenience references, not a substitute for crawlable pages or a proven ranking intervention.

## Evidence ledger

| Claim                                                             | Evidence and boundary                                                                                                                                                                                                                                                                                                     |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Current public release is v0.7.1, published September 6, 2026     | The parallel SEO review rechecked the live [GitHub release API](https://api.github.com/repos/tronschell/shinbo/releases/latest) on September 12: `Emma-v0.7.1-darwin-arm64.dmg` and `Emma-v0.7.1-win32-x64-Setup.exe`. This GEO worker's own GitHub web/API requests failed; the release receipt is shared team evidence. |
| Shinbo is the current name; Emma persists in historical artifacts | Current [repository](https://github.com/tronschell/shinbo), README, source rename history and verified release asset names. Do not manufacture current-brand asset URLs.                                                                                                                                                  |
| Published platforms include Windows x64                           | Release assets plus source README. README specifies macOS 12+ on Apple silicon and Windows 10 1809+ x64; Windows installers are unsigned. ARM64 Windows source packaging is not public availability.                                                                                                                      |
| Onboarding requires OpenRouter                                    | `desktop/test/setup-onboarding.test.ts` explicitly tests that subscription connections do not bypass a verified OpenRouter key. The coordinator also observed this in the current app's Connect screen. A free-tier key can pass.                                                                                         |
| Free software is not universally free operation                   | MIT application [license](https://github.com/tronschell/shinbo/blob/main/LICENSE), [model routing documentation](https://github.com/tronschell/shinbo/blob/main/docs/models.md), and separate provider services. No claim of unlimited free inference.                                                                    |
| Local chat is not app-wide offline mode                           | [Privacy documentation](https://github.com/tronschell/shinbo/blob/main/docs/privacy.md) inventories secondary routes and network use. Private routing is optional and applies to the main OpenRouter agent route, not every service.                                                                                      |
| Traces and experiments have limits                                | `desktop/shared/trace.ts` clamps trace text; older traces may lack context. `desktop/shared/settings.ts` defaults reinjection/pruning triggers to zero and fresh-context/semantic-search flags to false, while auto-compaction is configured at 70%. Avoid claiming all experiments are off.                              |
| Source is newer than a published release                          | Source inspected at commit `c0aef2ff45328d713c3682fb755ebe469ad33f12` with ongoing development. No inference that all current checkout behavior ships in v0.7.1.                                                                                                                                                          |

## Current primary guidance

- [Google AI features and your website](https://developers.google.com/search/docs/appearance/ai-features), fetched September 12: ordinary search foundations apply. Eligible pages must be indexed and eligible for snippets; special AI text files or schema are not required, and eligibility does not guarantee serving. Put key facts in accessible text and keep structured data consistent with visible content.
- [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots), fetched September 12: OAI-SearchBot is for search, GPTBot addresses training, and ChatGPT-User performs user-triggered retrieval. These purposes and controls are independent. Existing `public/robots.txt` already allows these agents; it was left unchanged. A policy refresh interval is not a promised citation deadline.

## Small public retrieval check

Conditions: September 12, 2026, built-in web search, English exact-string queries, no supplied site content or accounts. This is a narrow search sample, not a multi-provider AI visibility benchmark.

| Query or request                                               | Observed result                                                                                                                                                                                                     |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"shinbo.sh"`                                                  | No results returned by this search tool.                                                                                                                                                                            |
| `"Shinbo" "agent workspace"`                                   | No results returned by this search tool.                                                                                                                                                                            |
| `"Shinbo" "Emma"`                                              | Returned unrelated academic namesakes and other unrelated pages, including [this J-STAGE paper](https://www.jstage.jst.go.jp/article/arfe/52/4/52_241/_article/-char/en). No product result in the returned sample. |
| Direct web retrieval of `https://shinbo.sh` and the repository | Tool reported internal errors. This does not prove an origin outage, crawler block or private repository.                                                                                                           |

Inference: consistent domain, repository and former-name context can reduce ambiguity for a retriever encountering the product. These results do not establish global deindexing, a rank, market demand, or absence from ChatGPT, Claude, Gemini or Perplexity. No fabricated model answers or independent endorsements were added.

## Remaining useful work and actual gaps

1. Verify deployed HTML, canonical routes, downloads and these reference files after publication; local changes do not establish production behavior. The SEO/coordinator tracks own this validation.
2. In an already-owned Search Console or Bing property, inspect real index coverage and selected canonicals after the deployment. This review did not access those accounts, crawl logs or CDN settings. No access failure was relabeled as a crawler-policy finding.
3. The public source/release rename remains a product-distribution issue until a new release changes asset names. Explain it in the download journey; do not hide it with broken URLs.
4. Measure real download starts, successful installation and first completed agent work. Search mentions alone do not establish useful activation. No traffic, citation, ranking or conversion improvement has been measured here.
5. If broader retrieval testing is later authorized, retain a fixed panel: "What is Shinbo at shinbo.sh?", "Is Shinbo the same project as Emma?", "Can I use Shinbo on Windows?", "Does Shinbo need an API key?", and a problem-first query about coordinating existing coding-agent CLIs. Record provider, date, citations, factual errors and non-results without favorable-answer fishing.

No new backlink campaign, reviews, endorsements, AI-specific infrastructure or training access changes were needed for these corrections.

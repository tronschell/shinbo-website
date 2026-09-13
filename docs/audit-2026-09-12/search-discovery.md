# Search discovery audit — 12 September 2026

## Executive finding

**P0: the advertised production hostname did not resolve.** Local and escalated curl failed DNS resolution; independent Google and Cloudflare public DNS-over-HTTPS queries both returned NXDOMAIN. Google A, AAAA and NS queries returned status 3 with the `.sh` parent SOA. This blocks the website journey in the observed environments before HTTP or crawler policy matters. The registrar/delegation cause is unknown; this is not proof of every resolver’s state or of domain ownership. Repair/confirm domain registration and authoritative delegation before optimizing search appearance. No DNS or deployment change was made.

The built site has a sound baseline: 13 intended public HTML pages, seven explicitly excluded design previews, meaningful prerendered bodies, per-route metadata, and linked product identity. The main remaining content risk is drifting product claims, especially current-source capabilities presented as shipped behavior. Ordinary search samples did not return the official product. They do not measure any consumer assistant’s recommendations or prove global deindexing.

## Scope and evidence conditions

Research-only inspection of current workspace sources and the sibling’s freshly generated `dist/`; public DNS, public release receipt supplied by the coordinator, and built-in web-search panels. Date: 2026-09-12, English wording. Search location, underlying engine, personalization and ranking implementation are not exposed. No Search Console, Bing Webmaster, analytics property, CDN logs or authenticated AI consumer account was inspected. No account creation, outreach, submission, crawler policy change or publication occurred.

Business event: a compatible visitor installs Shinbo, completes required provider setup and finishes useful agent work. A search mention or download click alone does not establish that event. The application is free; model services may charge separately. Production HTTP status, redirects, header directives and deployed HTML remain unverified because DNS prevented connection.

## Priorities and smallest useful changes

| Priority | Evidence and consequence | Smallest useful change | Validation / outcome |
| --- | --- | --- | --- |
| P0 · high confidence | `shinbo.sh` NXDOMAIN from two independent public resolvers, plus local/escalated client failures. Canonical, sitemap, image and documentation URLs all depend on this host. | Confirm intended domain and repair registration/delegation/DNS at its owner-controlled provider. | A/AAAA or valid alias resolution, HTTPS certificate and 200 for every public page; compatible download journey can start. |
| P1 · high confidence | Homepage description/OG/schema in `index.html` is only “a free, open-source self learning metaharness”; hero emphasizes learning while detailed agent documentation describes proposed changes, replay and explicit retention. Readers/search snippets receive a category label and potentially stronger automation promise than evidence supports. | Use a plain-language outcome description, preserve free/open-source claim and name platform/setup limits; align learning copy with controlled experiments. | Same factual offer in visible text, description and SoftwareApplication; first-time visitor can identify task, supported system and prerequisites. |
| P1 · source/release boundary | `src/docs/router.tsx` says “ships” ten free models; source docs contain exact counts/defaults. The docs index’s blanket source-newer-than-release warning is not shown atop every detail page. Search can land directly on a detail URL. Current trace “1 MiB” wording conflicts with the historical character-limit evidence ledger; current underlying product code was not reverified here. | Add version/source qualification next to volatile claims, verify them against the released tag, recheck current product code before correcting trace units, and avoid guarantees about changing free model availability. | Versioned source/release ledger and deep-link copy remain correct without visiting docs index. |
| P1 · conditional production risk | `App.tsx` unknown paths render homepage or docs index. Local Vite preview returned 200 for `/docs/not-a-real-audit-route`; production host behavior is unknown. | Set a real hosting 404 for unknown URLs and a useful not-found view; retain only intentional redirects. | Unknown public paths return 404; valid direct routes remain 200. Do not treat Vite fallback as proof of a production soft 404. |
| P2 · high confidence | Existing `docs/aeo-review.md` says twelve shared FAQs; actual source and built homepage contain four. Old GEO claims refer to an earlier inspected source commit. | Supersede stale audit statements with this current inventory; do not restore questions merely to hit a count. | Four visible questions match four structured answers; future review distinguishes historical implementation from current state. |
| P2 · high confidence | `/docs/router` exists in public routes/sitemap but neither llms guide inventory includes it. | Add the existing useful guide link to both references if these files continue to be maintained. | All 11 guide destinations represented consistently; no new AI infrastructure. |
| P2 · unknown measurement | No analytics integration found in inspected app/build sources; no property or received event data available. | Reuse existing owner accounts first, then establish only necessary landing/download/activation measurements. | Report qualified visits, actual download starts, installation and first completed task separately; no invented lift. |

## Route and rendering coverage

Parsed every generated HTML file with Python `html.parser.HTMLParser`, including JSON-LD scripts with `json.loads`. All 20 generated routes have one canonical, one description and one H1. These counts are consistency checks, not ranking scores. No duplicate fallback H1 was observed. `shared.tsx` Link renders ordinary anchors, so standard navigation loads each route’s static head rather than relying on runtime head mutation. SSR reveal attributes begin empty, and `useReveal` sets hidden states only after JavaScript runs; no permanently hidden SSR offscreen state was found in source inspection. Visual/runtime checks belong to the sibling audit.

| Route | Intended status / purpose | Structured data |
| --- | --- | --- |
| `/` | Public product and download entry | SoftwareApplication, Organization, WebSite, FAQPage (4) |
| `/docs` | Public guide collection | Base identity graph + CollectionPage/ItemList (11 guides) |
| `/docs/harness` | Installed agent CLI workflow | Base graph + TechArticle/BreadcrumbList |
| `/docs/delegation` | Subagents and persistent threads | Same article pattern |
| `/docs/plan` | Dependency plans, goals and context | Same article pattern |
| `/docs/models` | Model setup and provider costs | Same article pattern |
| `/docs/router` | Free model fallback route | Same article pattern |
| `/docs/control` | Permissions and computer access | Same article pattern |
| `/docs/surfaces` | Quick Ask and app surfaces | Same article pattern |
| `/docs/knowledge` | Markdown notes and folders | Same article pattern |
| `/docs/jobs` | Scheduled work and awake-app limits | Same article pattern |
| `/docs/agent` | Run analysis and controlled repair | Same article pattern |
| `/docs/tools` | Native tools and extensions | Same article pattern |
| `/variations`, `/variations/1` through `/variations/6` | Seven preview routes, `noindex, follow`; excluded from sitemap | Product schema removed |
| `/llms.txt`, `/llms-full.txt` | Text reference files; included in generated sitemap | Not HTML pages |

`dist/sitemap.xml` contains 15 URLs: the 13 public HTML pages and two text references; no fictional build-time lastmod values. Canonicals and sitemap use `https://shinbo.sh` consistently. Preview canonical URLs are self-referential and noindex. The source sitemap is generated by `scripts/prerender.mjs`, so absence of `public/sitemap.xml` is expected.

Existing robots allows all crawlers, including named search, user-fetch and training agents. No change is recommended merely to chase AI visibility. An allow rule does not prove origin access, indexing, citation or eligibility. Actual HTTP/www/apex redirects, query/path preservation, TLS, headers, bot challenges and crawl logs remain unknown behind the DNS failure.

## Public product truth and conversion boundary

Coordinator’s public [GitHub latest-release API](https://api.github.com/repos/tronschell/shinbo/releases/latest) receipt records **v0.7.1, published 2026-09-06T17:53:52Z**. I inspected the shared receipt at `/tmp/shinbo-latest-release-audit.json`; my web-tool release request returned a cache miss, so this is explicitly shared-team verification. [Release notes](https://github.com/tronschell/shinbo/releases/tag/v0.7.1) and actual assets agree with `src/downloads.ts`: `Emma-v0.7.1-darwin-arm64.dmg` and `Emma-v0.7.1-win32-x64-Setup.exe`. No installer was executed in this track.

Current copy correctly explains the former Emma name, Apple-silicon-only Mac installer, Windows x64 unsigned installer, required verified OpenRouter key, separate provider costs and limits of offline use. Download links use real versioned filenames instead of invented Shinbo filenames. `DownloadGuide` visibly explains Emma naming; the metadata points to latest release, whereas buttons pin v0.7.1. They currently agree, but a future release could make them diverge: update the shared release configuration as part of release publication.

The strongest existing problem-oriented destinations are harness, plan, models/router and jobs. Improve their opening answers with one concrete input → steps → result example and platform/provider qualifications; no need to create many overlapping keyword pages. Explain “meta-harness” after the ordinary task description. Independent public proof or a reproducible walkthrough would help evaluate the product, but no endorsements, users or benchmark gains were found or invented here.

## Ordinary-search panels (preserve exact wording)

Each row is one fixed query to the built-in web search on 2026-09-12. Returned examples below are evidence of this tool’s result set, not verified competitor recommendations or a stable rank. No favorable-answer regeneration was performed. The brand and site query were initially included in a batch and then isolated to retain readable result records; both observations were non-official/empty. Results may vary on repetition.

| Run | Panel / exact input | Observed returned sample |
| --- | --- | --- |
| S1 | Problem-first: `macOS AI assistant local files terminal bring your own API key` | General desktop/BYOK and local-model discussion results; no official Shinbo result in returned sample. Broad wording yields substantial chatbot/OS noise, so treat this as exploratory rather than a tightly qualified acquisition cohort. |
| S2 | Problem-first: `AI workspace run Claude Code and Codex together desktop` | Claude Code docs, [Pivio](https://pivio.app/), [Threadlines](https://www.threadlines.dev/), [Hydra](https://github.com/jpdlr/hydra), Cookrew, Claudex and discussions; no official Shinbo result in returned sample. This is a stronger fit for harness documentation. |
| S3 | Brand identity: `Shinbo AI assistant official download` | Shinbi AI Google Play/App Store pages, SHINOBI AI and unrelated Asian-language assistants; no official Shinbo destination in returned sample. Name ambiguity is observed; this does not establish wrongdoing by namesakes. |
| S4 | Supplied-domain search: `site:shinbo.sh` | Tool returned “Empty search results”. This is not a Search Console index count. |
| S5 | Supplied-source access: open `https://shinbo.sh/` | Web tool reported unsafe-to-open/non-retryable error, no page content. Independent DNS checks below establish the narrower access diagnosis. This is not an AI answer. |

ChatGPT Search, Gemini, Google AI Mode/Overviews, Copilot, Perplexity and Claude consumer answer surfaces: **untested**. No safely established consumer session was available within this track. The search tool is not a multi-provider AI benchmark. No mention rate, recommendation rate or score is reported. A future real-surface panel should keep S2’s task wording unbranded, use a separate “What is Shinbo?” identity question, and separately supply the URL; record exact mode, sign-in/memory conditions, citations, current release claims, errors and bad-fit answers.

## Reproducible DNS receipts

Public queries, 2026-09-12. `Status:3` is NXDOMAIN. Representative raw Google A response:

```json
{"Status":3,"TC":false,"RD":true,"RA":true,"AD":false,"CD":false,"Question":[{"name":"shinbo.sh.","type":1}],"Authority":[{"name":"sh.","type":6,"TTL":1800,"data":"a0.nic.sh. hostmaster.donuts.email. 1789230760 7200 900 1209600 3600"}],"Comment":"Response from 65.22.161.9."}
```

Cloudflare A response:

```json
{"Status":3,"TC":false,"RD":true,"RA":true,"AD":false,"CD":false,"Question":[{"name":"shinbo.sh","type":1}],"Authority":[{"name":"sh","type":6,"TTL":3600,"data":"a0.nic.sh. hostmaster.donuts.email. 1789230760 7200 900 1209600 3600"}]}
```

Google AAAA (type 28) and NS (type 2) each returned the same status/parent SOA and `Comment: Response from 65.22.163.9.`. Repeat with [Google A](https://dns.google/resolve?name=shinbo.sh&type=A), [Google AAAA](https://dns.google/resolve?name=shinbo.sh&type=AAAA), [Google NS](https://dns.google/resolve?name=shinbo.sh&type=NS) and [Cloudflare A](https://cloudflare-dns.com/dns-query?name=shinbo.sh&type=A) (request `accept: application/dns-json`). These links return current state, so the raw snapshots above preserve the audited state. No registrar cause was inferred.

## Current primary guidance and measurement

- [Google AI features](https://developers.google.com/search/docs/appearance/ai-features), retrieved today: standard search foundations apply; supporting pages need indexing and snippet eligibility; neither compliance nor a special text file guarantees serving. Keep visible facts and structured data aligned. Web Search Console totals include Google AI-feature traffic and do not isolate all AI experiences.
- [Google documentation updates](https://developers.google.com/search/updates), retrieved today: May 8 entry says FAQ results stopped May 7, 2026; June 15 records removal of FAQ documentation and clarification that llms.txt does not affect Google visibility/ranking. Do not sell FAQ schema as a current Google rich-result opportunity. Keeping matching FAQ markup is not an urgent defect; useful answers matter.
- [OpenAI crawler roles](https://developers.openai.com/api/docs/bots), retrieved today: OAI-SearchBot, GPTBot and ChatGPT-User address search, training and user-triggered retrieval respectively. Preserve their distinct roles. Existing permission does not certify actual crawl treatment.
- [Bing Webmaster guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a) returned only an empty shell through this fetch. No detailed current Bing directive claim is derived from it; Bing property/index evidence is untested.

After DNS and production verification, inspect an already-owned Search Console/Bing property before submissions. Record each important URL’s selected canonical, last crawl, current indexing state and live-test result separately. Establish matched branded/nonbrand landing cohorts and download/activation counts. Repeat the same search/AI panels after a defined change; retain non-results. Do not convert tiny samples into market share or promise a ranking/citation timeline.

## Reconciliation with previous reports

`docs/aeo-review.md` records historical implementation of twelve FAQs: **superseded by four in current source/output**. It also predates current modular `src/docs/*` details and cannot certify today’s exact limits. `docs/geo-review.md` remains useful for identity/setup/privacy caution and its explicit untested boundaries; its prior commit/retrieval evidence is historical, not fresh verification. Current refs still include useful qualifications but omit the new router guide. This audit supersedes current-state counts and adds independent DNS evidence; no earlier report’s claimed implementation or source truth is automatically accepted as today’s state.

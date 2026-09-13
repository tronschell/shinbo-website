# Shinbo market, demand and content research

Research date: 12 September 2026. Scope: research and recommendations only; no publishing, outreach, accounts, paid tools or product changes. This is qualitative English-language research using the web search tool, not a geographically controlled Google rank report. Search location, personalization and provider ranking methodology were not exposed. No search-volume, keyword-difficulty, traffic or conversion data was available. Results below are returned examples, not rank positions or exhaustive SERPs.

## Decision

Prioritize people already using two coding-agent CLIs who want to inspect and hand off their work. Demonstrate one real draft → review → revision workflow in the existing Harness guide before creating broad comparison content. “Multiple agents in one desktop workspace,” local operation and open source are already shared by numerous alternatives. Treat persistent Markdown records and explicit output handoffs as a testable positioning hypothesis, not a unique market claim.

Suggested outcome wording to test: **Run your coding agents together. Keep the work in a readable thread.** Supporting explanation: Shinbo runs its own agent and installed coding CLIs, with inspectable results and output handoffs. Keep “self learning metaharness” as an explained technical term, not the only acquisition headline. There is no measured uplift supporting this recommendation yet.

## Product truth and audience boundaries

Inspected `src/ShinboSite.tsx`, `src/downloads.ts`, `src/docs.tsx`, the Harness/Models/Delegation doc modules, both `public/llms*.txt` files, and previous `docs/aeo-review.md` / `docs/geo-review.md`. The previous audits concern attribution and corrected claims; they are not acquisition or activation measurements.

| Evidence in current site source | Marketing implication |
| --- | --- |
| Official identity is Shinbo, formerly Emma; shinbo.sh; tronschell/shinbo. Download links currently target v0.7.1 and Emma-named assets. | Explain the former name near installation. Do not invent Shinbo asset filenames. |
| MIT application, separate Apache-2.0-derived CLI scope; no Shinbo paid tier. Model APIs and coding CLI plans charge separately. | Sell freedom to inspect/modify; “free app” is accurate, “unlimited free AI” is not. |
| First-run verification requires an OpenRouter key even with optional subscriptions/local plans. | Expose prerequisites before download and in every setup brief. No-provider-account positioning is unsuitable. |
| Public installer targets: Apple silicon macOS and Windows x64; Windows unsigned. No public Linux desktop, Intel Mac or phone build in this source. | Prioritize supported systems; source builds are a different conversion. |
| Markdown threads persist. Harness guide says CLI run/session memory lasts only while the app is open, and externally started sessions are not tracked. | Do not promise CLI-session persistence across restarts or importing every old conversation. |
| Handoffs carry latest successful stdout, not files or terminal logs; up to eight same-thread sources with prompt limits. | Describe an output handoff, not lossless provider migration, shared full context, or automatic file transfer. |
| Local chat does not reroute secondary models, voice, search or CLIs. Archived threads are deleted after 30 days. | “Local records” is narrower than “fully offline/private forever.” Explain retention before an archival workflow claim. |
| Documentation can describe development beyond release. Self-improvement is scoped evaluation; no demonstrated universal gain. | Gate launch proof on an actual released-version run; source inspection alone is insufficient. |

Best-fit initial audience (inference): independent developers and technical builders on supported systems who already authenticate a coding CLI, accept an OpenRouter setup step, and value visible records and controlled delegation. Weak-fit acquisition: nontechnical users expecting zero configuration, mandatory offline users, enterprise audit-retention buyers, mobile-first users, Linux desktop users and people requiring full cross-provider session migration. A terminal or vendor's own app may serve a one-agent user with less setup.

## Competitor and substitute comparison

All competitor facts below are vendor-documented and checked on the research date, not installer-tested. License labels do not include inference cost. Pricing figures are deliberately omitted where a current comparable task price was not verified. “Better fit” judgments are our inferences from documented scope.

| Alternative / role | Current primary evidence and prerequisites | Implication for Shinbo / likely better fit |
| --- | --- | --- |
| **Orbit — direct** | [Repository](https://github.com/xinnaider/orbit) documents Claude Code, Codex and OpenCode, worktrees, MCP orchestration, SQLite session persistence, remote SSH and browser access; at least one installed CLI required; MIT. README lists Windows, macOS Intel/Apple silicon and Linux installation. | Multi-provider plus local/open-source is not unique. Orbit is worth testing when restart continuity or remote access dominates; no evidence Shinbo is categorically superior. |
| **Hydra — direct** | [Repository](https://github.com/jpdlr/hydra) describes Claude Code/Codex desktop coordination, live terminals, session resume, headless runs and an MCP manager; MIT, with macOS/Windows/Linux described. CLI prerequisites and actual release must be checked for installation. | Closely overlaps “one window for a fleet.” Compare exact handoff and history behavior, not number of panels. |
| **Swarmterm — direct terminal workspace** | [Official site](https://swarmterm.dev/) says free GPL-3.0 app, real CLI panes, templates, worktrees, broadcast input and web preview. Linux appears under “Next,” so “all platforms” must not be treated as shipped Linux. | Strong alternative for people who prefer authentic terminal interfaces. Shinbo needs proof of readable results/records beyond pane management. |
| **CLAI — direct general agent workspace** | [Official site](https://clai.run/) documents MIT desktop source, local/hosted models, installed CLI agents, per-agent permissions, schedules, transcripts and artifacts. It describes macOS/Windows/Linux; artifacts were not checked. | Very close functional narrative. Model flexibility, scheduling and permissions cannot by themselves establish differentiation. |
| **Conductor — direct/adjacent cloud execution** | [Official site](https://www.conductor.build/) now leads with cloud microVM sandboxes, team collaboration and BYO subscriptions/keys for Claude Code, Codex, Cursor and OpenCode. Current changelog includes 9 September 2026. No comparable current price verified. | Cloud/team execution is a different strength; compare execution location, setup and handoff honestly. Avoid old “Claude-only Mac wrapper” descriptions. |
| **Claude Code Desktop — native vendor alternative** | [Official docs](https://code.claude.com/docs/en/desktop) document graphical parallel sessions, visual review, local/cloud/SSH environments and shared CLI configuration. Paid subscription is specified in authentication troubleshooting. Desktop and CLI histories are separate; `/desktop` provides a documented handoff with restrictions. | Existing Claude customers may need no new app. Cross-vendor work is the relevant Shinbo comparison. Do not claim native apps lack parallel sessions. |
| **OpenAI desktop app / Codex — native vendor alternative** | [Current official desktop documentation](https://learn.chatgpt.com/docs/app) describes parallel projects, files, browser/computer, plugins and schedules, with ChatGPT sign-in. The old developers.openai.com/codex/app URL redirected here during research. No pricing claim assessed. | Broad “desktop agent workspace” is now also native vendor language. Keep comparison dates and naming explicit; vendor UI capabilities are not unique Shinbo selling points. |
| **goose — adjacent extensible general agent** | [Current repository](https://github.com/aaif-goose/goose) describes desktop/CLI/API, local execution, multiple providers including OpenRouter/Ollama, subscription access via ACP and MCP extensions; Apache-2.0. The former block/goose URL redirects here. | A credible substitute for users seeking an extensible local agent. Inspectable-source and provider flexibility are shared. Test Shinbo against its specific cross-CLI workflow, not a generic open-source checklist. |
| **tmux + existing CLIs + task notes — manual substitute** | [Official tmux wiki](https://github.com/tmux/tmux/wiki) documents multiple terminal programs, detach and reattach while programs continue. CLI authentication/model charges remain their own concern. | Least additional product setup for terminal users; user manages handoffs, task naming and records. Include this option in any fair decision guide. |
| **Repository Markdown knowledge base — adjacent continuity substitute** | [hraness/kb](https://github.com/hraness/kb) describes Markdown/Git knowledge with search, context and provenance, rather than a desktop agent workspace. | If the real job is preserving decisions between sessions, notes plus existing tools may suffice. Shinbo should not imply that simply retaining a transcript makes all past context available to every model. |

This is a useful job-based comparison set, not a market-share ranking. Further surfaced candidates include Pane, Paseo, cdesktop and Flowmux; these are leads for subsequent testing, not exhaustively verified substitutes in this report.

## Search and customer-language ledger

Exact queries and observations, all run 12 September 2026. Initial multi-query batches were used for discovery; Q2/Q3/Q6/Q7 were separately rerun to disambiguate their result sets. Linked search examples describe what surfaced; technical claims above rely on opened primary pages.

| ID | Exact query | Actual returned examples / interpretation |
| --- | --- | --- |
| Q1 | `desktop app manage Claude Code Codex multiple agents local open source` | Orbit, cdesktop, Claude Code Desktop, Clave, Swarmterm, Hydra, CLAI, Pane and Tempest surfaced in the discovery batch. Opened Orbit/Hydra/Swarmterm/CLAI/native docs confirm direct overlap. Qualitatively crowded; no numerical competition score. |
| Q2 | `how to manage multiple coding agents without switching terminals` | Separate run returned [Flowmux](https://flowmux.dev/), [StoicSoft guide](https://stoicsoft.github.io/1devtool/2026/03/26/how-to-run-multiple-ai-agents-single-terminal-workspace.html), [meshcode workflow](https://meshcode.ai/blog/multi-ai-coding-workflow), Agents UI, Crystl and amux. Vendor how-to pages compete alongside products; a generic terminal-management article has weak differentiation. These are SERP leads, not verified specification sources. |
| Q3 | `OpenRouter desktop agent workspace markdown threads` | Separate run surfaced [OpenRouter's Workspaces announcement](https://openrouter.ai/blog/announcements/introducing-workspaces/) and [Workspaces docs](https://openrouter.ai/docs/guides/features/workspaces/overview) prominently in the returned list. Intent collision: provider project/key management, not necessarily a desktop client. Target exact setup tasks rather than this phrase alone. |
| Q4 | `"keep context" "Claude Code" "Codex" sessions` | Discovery batch surfaced [Alook's cross-session guide](https://alook.ai/blog/keep-context-across-coding-agent-sessions), Keep CLI, migration content and community context discussions. Indicates competing answers to continuity, but batch output is not an isolated ranking of this query. |
| Q5 | `"coding agents" "Markdown" "history"` | Discovery batch surfaced hraness/kb, Sourcebook, CodeAlmanac and Markdown context material. Notes/history tools compete for this job; instruction-file searches may be a different intent from agent execution. |
| Q6 | `"self learning metaharness"` | Separate run returned [RuVector mirror](https://sourceforge.net/projects/ruvector.mirror/files/) and a Vienna Agentics meetup post, not Shinbo among visible examples. Results broadened beyond exact phrase. Does not establish zero demand; does show weak evidence for this as a known Shinbo acquisition category. |
| Q7 | `"OpenRouter" "desktop" "agent" "Shinbo"` | Separate run returned “Empty search results.” This is a tool non-result under these conditions, not proof of deindexing or zero market demand. |

Strongest firsthand problem example: an opened [r/codex question](https://www.reddit.com/r/codex/comments/1tq0p2e/looking_for_one_local_app_to_use_multiple_ai/) asks for ordinary local folders, multiple CLI agents, provider choice per task and continuity when one provider hits limits. Replies disagree about whether suggested tools transfer context. This is evidence of one person's task and evaluation friction, not incidence, market size or current competitor specifications. It suggests explaining **output handoff versus session migration** explicitly. Shinbo only partially addresses the full request under the inspected documentation.

Secondary demand signal: the opened [hraness/kb project](https://github.com/hraness/kb) frames lost decisions and repeated discovery as its problem. Because that is another vendor's framing, treat it as corroborating language and competitive positioning, not independent customer validation.

## Intent cluster map

P0 = fix/strengthen a conversion prerequisite; P1 = first acquisition experiment; P2 = test after proof. Priorities combine product fit, observed intent and effort; volume/KD is **unknown for every row**. Candidate variants below are hypotheses, not claims that every phrase was searched.

| Priority | Candidate customer wording | Intent and fit | Existing destination / smallest useful action | Validation and metric |
| --- | --- | --- | --- | --- |
| P0 | Shinbo OpenRouter setup; does Shinbo need an API key; Shinbo Mac/Windows download | Setup/brand; strong product fit, demand unquantified | `/docs/models` + `/#download`: keep required key, system and separate costs obvious; show first successful task after verification | Fresh-install completion, first successful run; count setup failures by step |
| P1 | run Claude Code and Codex together; use Claude Code and Codex in one app | Evaluation/workflow; Q1 and firsthand question; strong conditional fit | Improve `/docs/harness` with one released-version workflow and example output | Qualified guide visit → supported download → completed first CLI run |
| P1 | have Codex review Claude Code output; hand off work between coding agents | Outcome; narrower than category, supported output-handoff mechanism | Add draft/review/revision example to `/docs/harness`; no new thin route | Successful two-CLI handoff with inspected output, then seven-day repeat |
| P1 | keep AI agent work in Markdown; find decisions from previous agent tasks | Continuity; Q4/Q5; partial fit | `/docs/delegation` and `/docs/knowledge`: distinguish records, notes, runtime state and archive deletion | User retrieves a prior decision and uses it in a follow-up task |
| P2 | open-source agent workspace; Conductor alternatives; agent manager vs tmux | Comparison; crowded Q1/Q2 | One evidence-backed decision guide only after comparable workflow testing; link to existing guides | Comparison visitor reaches the appropriate setup path and activates |
| P2 | OpenRouter desktop agent; local models in an agent workspace | Setup-aware; Q3 intent collision and many substitutes | `/docs/models`: a bounded setup and routing guide, including remaining network routes | Chosen route completes a task; avoid counting picker selection as success |
| P2 | debug an agent run; inspect agent tool calls; agent run trace | Technical evaluation; product fit plausible but demand not established by this panel | `/docs/agent`: real failed-run diagnosis with retained evidence, not performance claims | User identifies a failure cause and retries successfully |
| Defer | autonomous self-learning AI; fully offline assistant; unlimited free coding; mobile agent app | Broad or unsupported promise | Explain scope in existing FAQ/docs; no acquisition pages promising these outcomes | Reconsider only with released capabilities and firsthand demand |

## Three content briefs

### 1. Claude Code drafts, Codex reviews: one inspectable handoff

- **Question/outcome:** How can I use the two agents I already have to produce a draft, get a second review and send corrections back?
- **Destination:** expand `/docs/harness`, preserving its useful existing adapter/reference material; suggested on-page heading “Use Claude Code and Codex together.” Link from homepage, Models and Delegation.
- **Prerequisites:** supported OS, exact installed Shinbo release, verified OpenRouter key, both CLIs installed/authenticated, access to selected models and a disposable local example folder. API/subscription costs remain separate.
- **Outline:** first CLI creates a short implementation plan; inspect its Result; Hand off output to the second CLI with a review instruction; inspect source link and response; return review to the original run; inspect final answer. Explain stdout-only transfer and the distinction between shared files and transferred text. Include failure paths for CLI missing/login failure, invalid model, empty/truncated result and restarted app.
- **Proof required:** record actual released-version execution with CLI versions, redacted settings, source/output samples and observed failure handling. Reconcile the guide against release if the inspected source is newer. No invented success percentages or “agents always agree” claim.
- **CTA/success:** platform-correct download plus “Complete your first handoff”; primary event is a successful two-CLI handoff, secondary is repeat use within seven days. Web clicks cannot alone prove it.
- **Publication boundary:** not ready to advertise as a tested tutorial until the release-level run exists. Its outline and current source-derived explanation are ready.

### 2. What survives an agent session: threads, outputs and reusable notes

- **Question/outcome:** How do I preserve a decision so I do not explain it again next time?
- **Destination:** improve `/docs/delegation` with links to `/docs/knowledge` and `/docs/harness`; only create a separate guide if the full example cannot fit coherently.
- **Outline:** distinguish persistent Markdown thread, transient CLI runtime/session tracking, selected successful output and explicitly saved knowledge note; record one design decision; close/reopen the app; locate the record; explicitly supply it to a new task; show what was not recovered. Include archive's 30-day deletion policy.
- **Prerequisites/proof:** released version, sample folder and model setup; screen capture plus actual redacted Markdown before/after restart. Verify exact note path and retrieval steps in the release. Do not promise automatic total recall, immutable audit history or lossless cross-vendor conversation transfer.
- **Current sources:** Shinbo Delegation/Harness/Knowledge; use tmux/native sessions as alternatives only with current primary docs. Explain when a simple repo note is enough.
- **CTA/success:** “Save a decision and reuse it in another task”; activated result is correct retrieval and reuse after restart, with the next-week repeat measured separately.

### 3. First useful Shinbo task: setup, model costs and provider boundaries

- **Question/outcome:** What must I install and pay for before this free app does useful work?
- **Destination:** `/docs/models` plus a clear homepage/download link; reuse platform guidance.
- **Outline:** choose a supported installer; explain legacy Emma filename and unsigned Windows status; verify OpenRouter key; optional provider/CLI configuration; choose one route; complete a small task in a sample folder; inspect output; where to diagnose login, model-access and provider errors. End with what local routing does and does not cover.
- **Prerequisites/proof:** clean release install on each advertised target before claiming cross-platform verification; real first-run screenshots with no keys; test free-key verification separately from availability of free inference. Link to current provider setup and release notes rather than embedding volatile prices.
- **Offer/CTA:** free Shinbo application, separate services/limits. Send supported users to actual asset; unsupported users to candid platform notes. Link onward to the handoff guide after first-run success.
- **Success/validation:** installation → key verification → first completed useful task, median elapsed time and failure reason where voluntarily available. No target conversion percentage before a baseline.

## Bounded distribution experiments

All are proposals, not submissions. Publication/outreach requires authorization. Disclose maintainer affiliation; follow the destination's current rules. No repetitive promotional replies, invented reviews or paid-link campaigns.

| Experiment | Audience and useful contribution | Evidence needed / scope | Activation metric and decision |
| --- | --- | --- | --- |
| Official repository release walkthrough | Existing [Shinbo repository](https://github.com/tronschell/shinbo) readers deciding whether to install; one short draft/review demo with sample files and exact limits | Publish with the next verified release; one canonical guide link, real footage, version and prerequisites | Release-guide cohort completes first handoff; review after two weeks, improve setup if clicks fail to activate |
| One disclosed community demonstration | r/codex / r/ClaudeCode users with the exact multi-CLI need surfaced above; standalone useful explanation of output handoffs vs full migration | Read rules first; prepare a reproducible sample and disclose authorship; one relevant post only if allowed, not unsolicited replies to every thread | Qualified visits, voluntary activation feedback and seven-day reuse; stop if users primarily need unsupported migration |
| Maintainer-authored comparison with native/manual baseline | Developers evaluating pane managers and vendor apps | First run the same bounded task in Shinbo, tmux and one native app; include where alternatives win; publish an owned page, not a fake independent review | Correct-fit installs and completion, not competitor-keyword impressions; expand only if it changes decisions |
| Small invited usability cohort | Existing willing testers on Apple silicon/Windows x64; one first-task brief | Invite only after outreach authorization; no provider secrets collected; 5–8 participants is an experiment design, not statistical power | Observe setup failures, task completion and time to first output; fix repeated blockers before more distribution |

Use existing analytics if available. A website can observe a guide visit or download click, not installation or completed agent work. If there is no consented app measurement, use voluntary task-completion feedback and record attribution as incomplete; do not add covert telemetry. Count denominators separately: eligible visitors, clicks, reported installs, completed setup, successful first task, successful handoff, seven-day repeat. Shinbo has no paid tier, so revenue conversion is not an appropriate default business KPI; verified repeat usage and contributors are more useful candidate outcomes until the owner defines another model.

## Ranked next steps and unproven items

1. Validate one released handoff end to end and make its limits visible. High fit/confidence, moderate proof effort. This resolves whether the strongest proposed acquisition promise actually delivers.
2. Turn the existing Models guide into an unmistakable first-task path. High confidence, low content effort; measure setup completion before expanding acquisition.
3. Prove record reuse across restart, while separating transient CLI state and archive expiry. High relevance, moderate validation effort.
4. Run one small distribution experiment linked to the proved workflow. Qualitative demand exists, but audience size, acquisition cost and retention remain unknown.
5. Write a comparison only after comparable product trials. Current primary research is enough to choose whom to test; it is not enough to award Shinbo a universal winner badge.

Not measured: search volume, ranking changes, search-console coverage, clicks, install success, provider setup success, retention, comparative speed/quality, or AI recommendation uplift. No competitor installers were executed in this research track. Freshness-sensitive facts must be rechecked before publication.

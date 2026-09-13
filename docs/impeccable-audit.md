# Shinbo website audit and refinement

September 12, 2026 · homepage, shared download/features components, documentation index and article templates.

**Implementation integrity: pass for the reviewed scope.** The site retains the chosen workspace layout, charcoal grey, application pink, actual app screenshots, and backgrounds exported from Dither Lab. The headline description remains exactly “a free, open-source self learning metaharness”. Product claims and download destinations were preserved. The requested bento layout is implemented in the existing interactive examples.

The audit found **13 issues: 0 P0, 5 P1, 7 P2, 1 P3**. All were addressed in this pass. This is a bounded implementation and browser audit, not a WCAG certification.

## Health score

Scores are editorial assessments against Impeccable’s five dimensions, not automated test percentages.

| Dimension                | Before                 | After            | Evidence and limit                                                                                                                                |
| ------------------------ | ---------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accessibility            | 2/4                    | 3/4              | Fixed hover contrast, control boundaries, motion pause and keyboard table access. Screen-reader use was not physically tested.                    |
| Performance              | 3/4                    | 3/4              | Static HTML, lazy screenshots and visibility-aware demo timer retained; removed docs reveal observer. No production field-performance data.       |
| Responsive design        | 2/4                    | 3/4              | Desktop bento, mobile stacking, larger controls and no document overflow at inspected widths. Physical touch and zoom remain untested.            |
| Theming                  | 2/4                    | 3/4              | Shared neutral/pink tokens, selection, focus, scrollbars and native controls. Some existing documentation/chart styles remain explicitly colored. |
| Implementation integrity | 2/4                    | 4/4              | Native route navigation restores real titles/metadata; diagrams are labeled examples; screenshot originals and download limits remain intact.     |
| **Total**                | **11/20 — Acceptable** | **16/20 — Good** | No known unresolved blocking issue in the inspected paths.                                                                                        |

## Findings and fixes

### P1 — Major

1. **Download hover could make its label disappear.** `src/shinbo-site.css:125` now gives both primary-link classes explicit dark text on pink in hover and active states. The previous generic anchor hover produced pink text on pink: **1:1**. New default and hover text contrasts are **5.58:1** and **7.72:1**. Relevant to WCAG 1.4.3. Refinement: colorize/polish.
2. **Important control and diagram boundaries lacked contrast.** `src/shinbo-site.css:7` adds a shared control-border token; `src/explain.css` applies it to buttons and strengthens plan connectors and node strokes. Previous button border against panel was **1.62:1**; the control border now measures **3.97:1**. Relevant boundaries should meet 3:1 under [WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html). Refinement: colorize.
3. **Pause stopped the examples but left other homepage animations running.** `src/Explain.tsx:158` reports play state to `src/ShinboSite.tsx`; `src/shinbo-site.css:453` pauses the surrounding animated diagrams too. The control is named “Pause all animations” / “Play all animations”. Reduced-motion users still start with static examples, and Step/Compact remain functional. This addresses the need for a pause mechanism for ongoing automatic motion under [WCAG 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html). Refinement: animate/harden.
4. **Wide documentation tables lacked a reliable keyboard scroll target.** All three wrappers in `src/docs.tsx` now have `tabIndex={0}`, a named region and visible focus. All table header cells declare column scope. At a 320px viewport, ArrowRight moved the model-role table to `scrollLeft=40` while focus stayed visible. Relevant to WCAG 2.1.1 and 1.3.1. Refinement: adapt/harden.
5. **Documentation navigation retained stale page identity.** The custom `Link` in `src/shared.tsx:1` used history mutation without replacing title, canonical or social metadata, and without a route focus handoff. It is now a native anchor. Navigating into Models loads the correct article title, canonical URL and browser document focus. Relevant to WCAG 2.4.2 and discoverability. Refinement: harden.

### P2 — Minor

6. **Essential supporting copy was 9–11px.** Homepage requirements, captions and setup notes are now 12–14px, with ordinary body copy at 14–15px. Headline tracking was relaxed to −0.03em. `src/shinbo-site.css` and `src/explain.css` retain density through layout rather than very small text. No minimum font size is claimed as a WCAG rule. Refinement: typeset.
7. **Navigation and controls were difficult to acquire.** The original navigation links were 18px high, screenshot guide links about 16px, and many demo buttons 38px. Main navigation, primary actions, animation buttons and FAQ summaries now have at least 44px height; all 11 example buttons were measured at 44px. Inline prose links remain inline. WCAG AA’s [target-size minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) is 24px with exceptions; 44px is the chosen usability target, not a claim that every previous smaller link failed AA. Refinement: adapt.
8. **Timeline ticks did not align with the tracks.** `src/explain.css:359` and its mobile override now derive the visual margins from the actual label, padding and duration columns. The axis starts and ends with the bar tracks. Refinement: layout.
9. **Screenshots were too small to inspect.** Both homepage screenshots and the shared `Shot` component now link to their original full-resolution images, with descriptive accessible names, a zoom cursor and keyboard focus. Original files, dimensions and provenance are unchanged. Refinement: harden.
10. **Documentation text faded in during reading.** Removed the shared reveal observer from `src/App.tsx` and obsolete reveal styles from `src/index.css`. Content is immediately visible; documentation no longer depends on an intersection event to become readable. Final browser inspection found zero reveal elements. Refinement: quieter.
11. **Documentation hierarchy and mobile navigation were inconsistent.** The index now uses H1 → H2 for guide links; next-guide titles use H2; articles have a real breadcrumb with current-page semantics. Decorative section labels were removed. Header and footer links stay reachable on narrow layouts, with wrapping where needed. Refinement: adapt/typeset.
12. **The hero and examples consumed space without useful grouping.** The hero’s agent diagram now sits alongside the copy when space permits. `src/explain.css:544` defines the requested bento: full-width Plan, then Context and Timeline in a 0.9:1.1 split from 760px upward, and one column below that. At the normal 880px viewport, lower panels measured approximately 367px and 449px wide. The phone plan retains a keyboard-scrollable graph and a visible scroll instruction. Refinement: layout.

### P3 — Polish

13. **Presentation drift and obsolete rules accumulated.** Replaced the homepage stylesheet’s obsolete section styling with rules for the current structure; aligned screenshot frames, corner radii, secondary text and control states; themed selection/scrollbars; changed browser theme color to the actual grey. Existing typography was preserved rather than introducing a new font dependency. Refinement: polish.

## Contrast measurements

Calculated from the final opaque CSS colors using relative luminance. These cover representative theme pairs, not every pixel of screenshot content or every possible composited state.

| Pair                                           |   Ratio |
| ---------------------------------------------- | ------: |
| Main text `#eeeef0` / page `#202023`           | 14.02:1 |
| Secondary text `#bcbcc5` / panel `#29292d`     |  7.68:1 |
| Primary action text `#202023` / pink `#ff5c94` |  5.58:1 |
| Primary action text / hover `#ff91b6`          |  7.72:1 |
| Control boundary `#85858f` / panel             |  3.97:1 |
| Plan connector `#8b8b96` / page                |  4.82:1 |

## Verification

- `npm run check`: formatting, lint and production build passed. There are 15 pre-existing lint warnings and zero errors.
- `node scripts/check-explain.mjs`: dependency ordering, blocked branches, context totals, timeline bounds, SSR, reduced-motion initialization, controls and propagation of motion state passed.
- `node scripts/check-downloads.mjs`: platform cases, installer URLs, server-rendered fallback and manual-selection/async-detection race passed.
- `python3 scripts/check-variations.py`: all six retained design previews passed route, anchor, image, feature-link, installer and indexing checks.
- `python3 scripts/check-screenshots.py`: all 18 original screenshots passed dimension, hash and reference checks.
- Generated HTML checks across all 12 production pages passed: one H1 and main landmark, image alternatives, ARIA reference targets, fragment destinations, keyboard table wrappers and column scopes.
- Browser checks used Codex’s in-app browser at 1440×1000, normal 880px width, 390×844 and 320×844. No document overflow was observed on the inspected homepage/docs paths. Wide graphs/tables scroll within their own regions.
- Keyboard checks exercised the blocked plan branch, visible focus, native documentation navigation and horizontal table scrolling.
- Selecting Windows updated header, hero and main download links to the same verified Windows installer. Reloading restored automatic Mac detection on this computer.
- Pause was confirmed in the rendered root state and the hero diagram’s computed animation play state.
- No warning/error entries were returned by the browser log check during the inspected route path.
- Production client output: approximately 339.09 kB JS / **98.65 kB gzip**, and 110.11 kB CSS / **22.12 kB gzip**. No dependency was added.

## What worked and was preserved

Native buttons, labels and FAQ disclosure controls; prerendered content and route-specific metadata; descriptive screenshot alternatives; shared platform selection; explicit unsupported-platform paths; manual installer overrides; labeled example data; reduced-motion support; offscreen demo timer gating; local screenshots and Dither Lab backgrounds. The user’s essential-only homepage copy remains intact apart from a functional mobile scroll hint.

## Scope and limits

The Impeccable context launcher could not initialize its engine because its cache directory was not writable in this environment. The documented direct-context fallback was used. No PRODUCT.md or DESIGN.md was found in this repository, so the existing implementation and the user’s explicit brief were the visual authority. **The bundled detector did not run.** Findings came from source inspection, browser measurements, keyboard interaction and repository checks.

This pass did not run VoiceOver/NVDA sessions, a physical touch device, browser zoom at 200%/400%, forced-colors rendering, cross-engine testing or production Lighthouse/field measurements. Reduced motion was checked through the existing executable hook test and CSS inspection. Viewport emulation verifies layout, not real touch gestures. These limits are why the score does not assert full WCAG compliance.

The six alternate concepts were preserved and regression-checked, not individually redesigned. No release was published. Any later device-specific findings should be handled with `$impeccable adapt` or `$impeccable harden`, followed by `$impeccable polish`.

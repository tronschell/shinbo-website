# Coordinator verification record

Date: September 12, 2026. Tested the existing working tree; no app edits.

## Runnable existing checks

Node v24.19.0. All commands exited successfully:

```sh
node scripts/check-downloads.mjs
node scripts/check-explain.mjs
python3 scripts/check-screenshots.py
python3 scripts/check-variations.py
```

Observed output:

```text
Download detection, installer links, SSR and manual-selection race checks passed.
Explain checks passed: dependency states, blocked branches, context totals, span bounds, SSR, reduced motion and controls.
Verified 18 fresh screenshots, dimensions, hashes and page references.
{"result": "passed", "variations": 6, "checks": "HTML, anchors, assets, downloads, feature routes, preview indexing"}
```

Node emitted its ordinary experimental `stripTypeScriptTypes` warning. This did not fail the checks. Build and Lighthouse methodology/results are in the performance report.

## Manual browser reproduction

Browser: Codex in-app browser, separate session after local Lighthouse measurements finished. Local build URL `http://127.0.0.1:4187/`; not production. Initial browser detected Apple silicon Mac. Desktop screenshot was 1280 × 720; temporary mobile viewport 390 × 844, reset at completion.

1. Open the homepage and choose the on-page Download navigation link.
2. Change **Your system** to **Windows · x64**. The main result, hero and bottom CTA change to the Windows EXE; the sticky header remains “Download for Mac.”
3. Change **Your system** to **Linux**. The main result correctly reads “No Linux desktop installer” and links to source. The hero and bottom CTA also link to source. The sticky header still offers the Mac DMG.
4. Inspect at 390px width: the native selector and platform notes are readable; measured document scroll width is 390px. No full-page overflow was observed at this state.

Read-only DOM result after Linux selection:

```json
{
  "viewport": 390,
  "pageWidth": 390,
  "selected": "linux",
  "headerDownload": "Download for Mac",
  "headerHref": "https://github.com/tronschell/shinbo/releases/download/v0.7.1/Emma-v0.7.1-darwin-arm64.dmg"
}
```

The cause is visible in source: `ShinboSite` owns a download hook passed to `DownloadGuide`, while `SiteHeader` creates a different hook. The current hook-unit check validates late detection versus a manual choice inside one instance; it does not test agreement between separate components.

The independent browser console also recorded:

```text
TypeError: Cannot read properties of undefined (reading 'image')
  at p (http://127.0.0.1:4187/assets/index-DI6Q-5-m.js:4377:505)
  at E (http://127.0.0.1:4187/assets/index-DI6Q-5-m.js:4377:1820)
```

This corroborates the repeated Lighthouse console result. See the performance report for the source-level cause hypothesis; the suspected first-frame timestamp cause was not instrumented or proven. No installer download or execution was triggered by these browser checks.

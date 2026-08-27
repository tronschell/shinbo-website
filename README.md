# Emma website

Public landing page for Emma. The site is self-contained in this directory: it
has its own `package-lock.json` and is not part of any root workspace, so run
every command from `website/`.

React 19, Tailwind 4, and TypeScript on Vite 8. It is a single page:
`src/main.tsx` mounts `src/App.tsx` into `index.html`. `src/index.css` holds the
Tailwind import — used for its reset only, there are no utility classes — and
the whole stylesheet.

## Design

The page is drawn from the app's own tokens, copied from
[`desktop/src/styles/tokens.css`](../desktop/src/styles/tokens.css): the same
paper and ink steps, the same six categorical hues with orange leading, square
corners, 1px rules instead of filled cards, Departure Mono for anything on the
grid and Inter for prose. See [`docs/design-system.md`](../docs/design-system.md).

Copy is checked against `docs/` and the source it cites; the numbers on the page
(tool counts, ceilings, model ids, CLI flags) come from there rather than from
marketing.

## Assets

`public/` is copied verbatim into the build.

|                    |                                                                                                                                                                                               |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `public/shots/`    | Real app screenshots, taken from [`desktop/screenshots/`](../desktop/screenshots)                                                                                                             |
| `public/brands/`   | Vendor marks for the CLIs Emma drives and the agents she imports from, from [`desktop/assets/brands/`](../desktop/assets/brands) — terms in [`docs/icon-sources.md`](../docs/icon-sources.md) |
| `public/fonts/`    | Departure Mono, OFL 1.1 — see [`docs/credits.md`](../docs/credits.md)                                                                                                                         |
| `public/emma.webp` | The mark                                                                                                                                                                                      |

Re-take a screenshot in the app, drop it into `desktop/screenshots/`, then copy
it over the one in `public/shots/`. Nothing generates them.

## Development

Requires Node.js 20.19+ or 22.13+ (Vite 8 wants 20.19+ or 22.12+, ESLint 10
wants 20.19+, 22.13+, or 24+). There is no `engines` field enforcing this.

```sh
npm install
npm run dev
```

## Checks

```sh
npm run format:check   # or: npm run format, to rewrite
npm run lint
npm run typecheck
npm run build
```

`npm run check` runs `format:check`, `lint`, and `build`; `build` runs `tsc -b`
first, so it covers `typecheck`.

## Output

`npm run build` writes the static bundle to `dist/`, which is gitignored. The
repository contains no CI workflow or host configuration for this site, so
deployment is done outside of it.

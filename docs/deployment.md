# Cloudflare deployment

Target: `https://shinbo.app`, owned by the user through Cloudflare.
Repository: `https://github.com/tronschell/shinbo-website`.

## Deployment contract

- Native Cloudflare Pages GitHub connection scoped to this repository.
- Production branch: `main`.
- Root directory: repository root.
- Build command: `npm run check`.
- Output directory: `dist`.
- Node version: `24` (Cloudflare build environment variable `NODE_VERSION`).
- Python 3 is used only for standard-library validation scripts.
- Generated images/fonts are committed; no image-conversion dependency is needed on the builder.
- Add `shinbo.app` through Pages **Custom domains** so the deployment and DNS binding agree.

A push to `main` triggers the Pages build and deployment. A failed check prevents
that build from publishing. GitHub Actions independently runs the same checks on
pull requests and main pushes. No Cloudflare credential is committed or copied
into a GitHub workflow; the native integration manages access.

## Verify after deployment

1. Match the successful Pages deployment to the pushed Git commit.
2. Confirm `shinbo.app` resolves, presents a valid HTTPS certificate, and serves the new page.
3. Check the homepage, `/docs`, every guide, sitemap, robots and text references.
4. Confirm `.html` and directory URL variants render the same page or redirect to its canonical destination; unknown paths must return 404.
5. Verify image/font assets, download selection, desktop animation and static mobile behavior.
6. Run Lighthouse on the real origin; keep lab scores separate from real-user Core Web Vitals.

The historical audit used `shinbo.sh`, an unregistered placeholder at the time.
It is not the launch domain. Live deployment receipts will be recorded after the
initial Git-connected build and custom-domain verification finish.

## Launch receipts — September 12, 2026

- Pages project: `shinbo-website` (`shinbo-website.pages.dev`).
- Initial Git source commit: `722bdba840a422204768edb152af26c064290ba0`.
- GitHub push check: [34708073486](https://github.com/tronschell/shinbo-website/actions/runs/34708073486), successful.
- Initial Cloudflare deployment: `372c5c93-0ffc-430d-9bcc-457bc905622a`, successful at 17:25:16 UTC.
- Native GitHub source has automatic production deployments enabled for `main`.
- The Pages custom-domain flow created the apex CNAME to `shinbo-website.pages.dev`; domain verification is active. Certificate issuance and live routing are verified separately using the procedure above.

The follow-up accessibility fix provides a push-event check of this connection:
match its GitHub commit to the new native Pages deployment, rather than manually
starting another build.

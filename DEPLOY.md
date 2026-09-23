# Deploying

## Where it's hosted

The site is hosted on **Cloudflare Pages** at `https://<project-name>.pages.dev`. It uses a Git-connected Pages
project that watches this GitHub repository (`djaypratt23/CPA_Study_Program`).

Cloudflare builds the site by running `npm run build`, which runs these steps in order, and a failure at any
step stops the deploy:

1. `vitest run`: unit tests
2. `tsx scripts/validate-content.ts`: content schema and cross-reference checks
3. `vite build`: static site in `dist/`

The output directory is `dist/`. Node 22 is pinned through `.nvmrc`, `package.json` `engines`, and the Pages
environment variable `NODE_VERSION=22`.

The build output also includes:

- `robots.txt`, set to `Disallow: /`, and `_headers`, which sends `X-Robots-Tag: noindex, nofollow` on every
  response. Together they keep the site out of search engines.
- `version.json`, which records the commit the build came from.

The app uses hash routing (`/#/module/...`), so deep links work without a `_redirects` file.

## What triggers a deploy

- **Push to `main`** → production deploy to `https://<project-name>.pages.dev`.
- **Push to any other branch** → a preview deploy at `https://<branch>.<project-name>.pages.dev`. Production is
  not affected. You can turn preview deploys off under *Settings → Builds & deployments → Preview branches*.

GitHub Actions (`.github/workflows/ci.yml`) runs the same checks on every push, independently of Cloudflare.

## GitHub Pages mirror

On pushes to `main`, the same workflow also publishes a copy to
https://djaypratt23.github.io/CPA_Study_Program/. It builds with `BASE_PATH=/CPA_Study_Program/` because GitHub
Pages serves the site from a subpath.

This requires **Settings → Pages → Build and deployment → Source: GitHub Actions**. If the source is
*Deploy from a branch*, GitHub publishes the raw repository files instead of the built app, and the page loads
blank. The mirror's live commit is at `/CPA_Study_Program/version.json`. To roll it back, re-run an older
successful *CI & Deploy* run from the Actions tab.

## Checking which commit is live

Open `https://<project-name>.pages.dev/version.json`:

```json
{ "commit": "<full git SHA>", "branch": "main", "builtAt": "2026-09-23T14:35:05.368Z" }
```

Compare `commit` with `git log -1 --format=%H origin/main`, or with the latest commit on GitHub. The dashboard
also shows the commit for each deployment under *Workers & Pages → <project> → Deployments*.

The app is a PWA. An open tab picks up a new deploy when the page next loads, and the service worker then
updates itself automatically. If the page looks stale, reload it once more.

## Rolling back

1. In the Cloudflare dashboard, go to **Workers & Pages → <project-name> → Deployments**.
2. Find the last good production deployment in the list.
3. Open its **⋯** menu and choose **Rollback to this deployment**, then confirm.

The rollback takes effect immediately and doesn't rebuild. Check `/version.json` to confirm the older commit is
live. The next push to `main` deploys as normal, so fix or revert the bad commit on `main` (`git revert <sha>`)
before pushing again.

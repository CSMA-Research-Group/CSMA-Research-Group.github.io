# GitHub Pages Deployment

## Current deployment model

The repository is an organization Pages site named `CSMA-Research-Group.github.io`. The workflow at `.github/workflows/deploy.yml` runs only on pushes to `main` and uses GitHub's Pages artifact/deployment actions.

The build job:

1. checks out the repository;
2. uses Node 22;
3. installs the exact lockfile with `npm ci`;
4. runs `npm run build`;
5. uploads `./dist` as the Pages artifact;
6. deploys through GitHub Pages.

No local maintenance command should push, merge, or trigger this workflow automatically.

## Vite and routing

`vite.config.js` uses `base: '/'`, which is correct for the organization root domain:

```text
https://csma-research-group.github.io/
```

The application uses `createWebHashHistory()`. Public routes therefore use hash URLs and remain compatible with static hosting without a custom SPA `404.html` fallback. Keep the legacy redirect routes in `src/router/index.js` unless a manual URL audit approves retirement.

## Visitor API variable

`VITE_VISITOR_API_BASE` is a public build-time frontend variable, not a secret. The workflow reads the GitHub Actions repository variable when it is set and otherwise uses the public Worker URL already tracked by the repository. This prevents an empty Actions variable from overriding the production configuration.

Recommended repository variable:

```text
Name: VITE_VISITOR_API_BASE
Value: https://csma-visitor-stats.hjpwhu.workers.dev
```

Do not store `VISITOR_HASH_SALT`, a D1 database ID, an API token, or any private value in a `VITE_` variable. Vite embeds all `VITE_` values in public client assets.

For local development, copy `.env.example` to ignored `.env.local` and set a local Worker or approved public endpoint. Do not commit `.env.local`.

## Manual pre-deployment validation

From a clean dependency installation:

```bash
npm ci
npm test
npm run build
git diff --check
find dist -maxdepth 3 -type f | sort
```

Confirm:

- the build exits successfully;
- `dist/index.html` uses root-relative asset paths;
- `dist/robots.txt` and `dist/sitemap.xml` exist;
- no `work/homepage-audit/` file appears under `dist/`;
- the client bundle contains the intended public visitor API base and no secret;
- all seven primary navigation routes work in a local preview, with the brand link returning home;
- all four Interactive Research Vision targets resolve;
- the footer and Globe do not cover content at laptop/tablet/mobile widths.

If using the existing preview script:

```bash
npm run preview -- --host 127.0.0.1
```

## GitHub settings checklist

In repository settings, confirm that Pages uses **GitHub Actions** as its source. Confirm the workflow retains `contents: read`, `pages: write`, and `id-token: write` permissions. A custom domain is not currently required by the checked-in configuration; if one is added later, update canonical/OG URLs, CORS origins, sitemap, and the Worker configuration together.

## Post-deployment checks

After a human pushes an approved commit and the Actions run succeeds:

1. open the organization site in a fresh/private browser session;
2. check the browser console and Network panel for asset or CORS errors;
3. verify the current route title and description;
4. verify all primary navigation items and compatibility redirects;
5. verify that Globe markers and counts originate from the Worker response;
6. verify that the current visitor has a positive number, an orange approximate-region marker, and a clock in the returned timezone;
7. confirm the displayed established time remains `2026-05-19 05:19`;
8. verify the production bundle does not contain internal audit reports or secrets.

Changing the Worker or applying a D1 schema is a separate external-state operation. Review and authorize it independently; the Pages workflow does not deploy the Worker.

## Worker deployment checklist

The public counters require the Worker CORS configuration as well as the Pages build. Before deploying, confirm that the ignored `workers/visitor-stats/wrangler.toml` binds the intended D1 database and contains:

```toml
[vars]
ALLOWED_ORIGIN = "https://csma-research-group.github.io"
```

Then, from the repository root, run the tests and deploy only after reviewing the exact account/database target:

```bash
npm test
npx wrangler secret list --config workers/visitor-stats/wrangler.toml
npx wrangler deploy --config workers/visitor-stats/wrangler.toml
```

Confirm that `VISITOR_HASH_SALT` appears by name in the secret list; never print or replace its value during routine deployment. After deployment, the official-origin OPTIONS request must return `204` with the exact `Access-Control-Allow-Origin`, and the official-origin GET must return `200` with the same header and `apiVersion: 2`. A POST is a real analytics write; use the website itself for the final tracked-visitor check rather than a synthetic production write.

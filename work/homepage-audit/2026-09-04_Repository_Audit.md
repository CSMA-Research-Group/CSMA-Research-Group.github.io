# CSMA Research Group Homepage Repository Audit

- Audit date: 2026-09-04 (Asia/Shanghai)
- Audit baseline branch: `main`
- Audit baseline HEAD: `94d6ee6ce3cc76543e1c995d20500b838a9354d1`
- Working branch: `feature/system-audit-redesign-20260904-215647`
- Baseline branch: `backup/pre-system-redesign-20260904-215647`
- Git bundle: `../CSMA-Research-Group.github.io-20260904-215647.bundle`
- Worktree copy: `../CSMA-Research-Group.github.io-worktree-20260904-215647/`
- Initial worktree state: clean (`## main...origin/main`)
- Remote: `https://github.com/CSMA-Research-Group/CSMA-Research-Group.github.io`

## Executive conclusion

The repository is a functioning Vue 3 + Vite single-page site with structured content, hash routing, a GitHub Pages Actions workflow, and a Cloudflare Worker + D1 visitor-statistics backend. The information base is small but internally coherent: all public data IDs are unique, all project/publication/person cross-references resolve, and no fake visitor fallback is rendered.

The most important confirmed problems are:

1. The production workflow can replace the tracked visitor API URL with an empty Actions variable.
2. the deployed visitor endpoint returned HTTP 200 for a read-only stats request but omitted `Access-Control-Allow-Origin` for the official site origin, so browsers cannot currently read it unless the deployed Worker configuration changes;
3. `GlobalVisitorsGlobe.vue` can start multiple independent `requestAnimationFrame` loops and cancel only the most recently recorded one;
4. the homepage puts the protected Interactive Research Vision inside the Hero instead of below the Research Vision copy, and omits Publications, People, and Resources previews;
5. the homepage and Research page still present “Artificial Intelligence” as the primary label instead of making Cognitive and Collaborative Intelligence the distinctive core;
6. the Research Highlights and Featured Projects blocks duplicate the same two works;
7. the Publications page renders each featured paper twice;
8. the 561–820 px Research Areas layout retains three columns and live connectors, creating a high risk of crowding and misalignment;
9. global keyboard focus treatment, a skip link, route-specific document titles, canonical/OG metadata, robots, sitemap, and structured data are absent;
10. a live `npm audit --omit=dev` found two high-severity transitive dependency findings in the locked `postcss@8.5.12` and `nanoid@3.3.11`, both fixable within the existing compatible version ranges.

No source, content record, media file, route ID, data ID, Worker database, secret, or remote configuration was changed during the audit phase.

## 1. Real technical stack

- Framework: Vue 3 (`vue@3.5.33` locked)
- Build tool: Vite (`vite@7.3.2`)
- Router: Vue Router (`vue-router@4.6.4`)
- Language: JavaScript and Vue single-file components
- Styling: one global native CSS file plus scoped component CSS
- Visitor visualization: custom Canvas 2D implementation; no Three.js or globe.gl
- Visitor backend: Cloudflare Worker and Cloudflare D1
- Hosting: GitHub Pages through GitHub Actions
- Package manager: npm; `package-lock.json` is the only lockfile
- Recommended runtime: Node 22.12 or newer (workflow uses Node 22)

`package.json` exposes only `dev`, `build`, and `preview`; there are no repository-provided lint or test scripts.

## 2. Entry point, shell, and routing

Application entry chain:

```text
index.html
→ src/main.js
→ src/App.vue
→ Navbar + RouterView + Footer
```

The router uses `createWebHashHistory()`. This is compatible with static GitHub Pages hosting and avoids a required SPA `404.html` rewrite. Current routes are synchronously imported and therefore compile into one application chunk.

Primary routes and order are correct:

```text
Home → Research → Projects → Publications → People → News → Resources → About
```

Compatibility redirects are present for `/join-us`, `/contact`, `/highlights`, `/seminars`, `/positions`, and `/gallery`. The `/contact` redirect currently loses the real `#contact` anchor and should point to `/about#contact` while retaining the old route.

The four Interactive Research Vision targets resolve to real Research card IDs:

- `#artificial-intelligence`
- `#intelligent-software-engineering`
- `#intelligent-robotics`
- `#application-scenarios`

## 3. Vite base and static assets

`vite.config.js` sets `base: '/'`, which is correct for the organization root site `csma-research-group.github.io`. It should only change if the site is later hosted below a repository subpath.

The protected vision component currently references `/figures/csma-research-vision.svg`, which is valid for the current root-domain deployment. The Globe correctly builds its texture URL from `import.meta.env.BASE_URL`.

`dist/` is tracked even though the Actions workflow rebuilds and uploads `./dist`. This is redundant but may reflect an older branch-based Pages workflow. It is a retirement candidate only; it must not be removed without human confirmation.

The root `work/` directory is not under Vite's `public/` directory and is not imported by source code. It should not enter `dist`; this must be verified after the final build.

## 4. Homepage and content architecture

Current homepage order:

1. Hero with Interactive Research Vision in the right column
2. text-only Research Vision
3. Featured Research Areas
4. Research Highlights
5. Featured Projects
6. Latest News
7. About CTA
8. Footer and Global Visitors Globe

The current composition has three structural issues: the core visual is attached to the Hero instead of the Research Vision narrative, Research Highlights repeat the same TraceCoder/KGMAF work immediately before Projects, and no Selected Publications, People Preview, or Resources Preview exists.

The data layer already exports everything needed to correct this without inventing content or changing interfaces.

## 5. Structured data sources

- `src/data/site.js`: site identity, contacts, affiliation, navigation
- `src/data/researchAreas.js`: six research areas and two highlights
- `src/data/projects.js`: four projects/research themes
- `src/data/publications.js`: two publications and featured selection
- `src/data/people.js`: four groups and nine records, including one explicit placeholder
- `src/data/news.js`: two verified-content news records, sorted descending
- `src/data/resources.js`: four groups and five resource entries
- `src/data/visitorStats.js`: canonical founding timestamp and empty fallback sources

Automated read-only validation found no duplicate IDs and no missing cross-references among research areas, highlights, projects, publications, and people.

## 6. Interactive Research Vision

Confirmed strengths that must be preserved:

- high-resolution background visual;
- four button-based hotspots and real route targets;
- hover/focus highlight and tooltip;
- center glow and breathing rings;
- particles, neural pulses, module effects, flow lines, orbit animation, and pointer parallax;
- deterministic seeded random values (`20260519`), avoiding rerender jitter;
- one guarded pointer `requestAnimationFrame` with cleanup;
- `matchMedia` listener cleanup;
- reduced-motion mode;
- mobile animation reduction.

The tooltip is correctly separated from the stage's `overflow: hidden`: the stage clips visual effects while the sibling tooltip layer remains visible. No redesign is justified.

Protective improvements are limited to consistent Cognitive Intelligence display copy, base-aware asset resolution, slightly richer hotspot labels, and global reduced-motion/focus behavior. The image itself is a raster embedded inside SVG and should not be regenerated merely to change a label.

## 7. Research Areas interaction and responsiveness

The homepage uses one SVG overlay and DOM measurements via `ResizeObserver`, which is the correct mechanism. The animation frame, observer, and window resize listener are cleaned up.

However, the current map makes Application Scenarios the dominant top card and compresses Cognitive Intelligence into a smaller peer card. It does not express the required hierarchy. It also remains three columns down to 561 px, while its connectors remain active until 560 px.

The safe redesign is presentation-only:

- Cognitive Intelligence as the core;
- Intelligent Software Engineering and Intelligent Robotics as carriers;
- Application Scenarios as grounding;
- Multi-Agent and Collaborative Intelligence plus Knowledge and Human Feedback as supporting/cross-cutting mechanisms;
- retain a single SVG overlay with measured card edges;
- hide connectors and use a single column at tablet width.

## 8. Visitor statistics chain

Static data flow:

```text
Footer.vue
→ GlobalVisitorsGlobe.vue
→ src/services/visitorStats.js
→ POST /api/visitor/track
→ Cloudflare Worker
→ D1
→ aggregate countries[]
→ Canvas markers and statistics panel
```

The frontend uses only API-provided coordinates for visitor markers. On failure it clears all markers and prints `Unavailable`; it does not display invented counts.

The Worker:

- stores a salted SHA-256 visitor hash rather than a full IP address;
- uses bound SQL parameters;
- validates country code and coordinates;
- suppresses exception details in responses;
- exposes POST tracking and read-only GET aggregate endpoints;
- keeps the specified founding time `2026-05-19 05:19` in code and schema.

Confirmed problems:

- the official production origin is not in the repository's default allowlist;
- a read-only request with `Origin: https://csma-research-group.github.io` returned HTTP 200 but no ACAO header;
- the ignored local `wrangler.toml` inspected in redacted form has no active `ALLOWED_ORIGIN` variable;
- the Globe calls only POST even though a GET fallback service already exists;
- fetch calls have no timeout;
- the frontend sends the full referrer even though the Worker does not store or use it;
- CORS is not bot protection, and the endpoint has no application-level rate limiting;
- the schema stores region/city/coordinates and has no documented retention period;
- aggregate updates span multiple statements and are not transactionally atomic.

The current task must not deploy the Worker, alter D1, inspect secrets, or invent counts. Repository code and documentation can be hardened, but production remains subject to a manual Worker configuration/redeployment check.

## 9. Globe animation and performance

`drawGlobe()` schedules a new animation frame internally, while mount, texture load, statistics completion, motion changes, and resize callbacks also invoke it directly. Each invocation can create another independent loop and overwrite the single stored frame ID. Component unmount then cancels only one loop.

This is a confirmed CPU and lifecycle defect because textured rendering performs per-pixel sampling every frame. The fix should establish one guarded scheduler, reuse the image buffer, cap visual refresh cadence, and pause continuous animation while the footer is off screen or the document is hidden.

Asset observations:

- Earth texture: approximately 478 KiB, 2048 × 1024
- interactive public SVG: approximately 2.6 MiB and contains a raster image
- TraceCoder and KGMAF figures: approximately 735 KiB each and are referenced
- unused `src/assets` material: approximately 16.5 MiB, but it is not imported and therefore is not in the current production bundle

Core image clarity should be preserved; no media is deleted in this task.

## 10. GitHub Pages workflow

The workflow triggers on `main`, grants the standard Pages permissions, uses Node 22, builds with Vite, uploads `./dist`, and deploys with `actions/deploy-pages@v4`. It does not deploy the Worker.

Required high-confidence changes:

- replace `npm install` with deterministic `npm ci`;
- use a non-empty fallback for `VITE_VISITOR_API_BASE` so an absent Repository Variable does not override `.env.production` with an empty value.

Remote Pages settings, Actions Variables, and environment protection were not modified and still require human verification.

## 11. SEO

Present:

- English language declaration;
- title;
- meta description;
- viewport;
- SVG favicon;
- one page-level `h1` per route in current templates.

Missing:

- canonical link;
- Open Graph core metadata;
- route-specific document titles/descriptions;
- robots.txt;
- sitemap.xml;
- structured organization data.

No social preview image exists. In accordance with the existing-site rules, this audit does not authorize inventing or generating one.

## 12. Accessibility

Present:

- semantic header/nav/main/footer shell;
- native links and buttons for primary interactions;
- `aria-expanded` on the mobile menu;
- useful figure alt text;
- button hotspots with focus handlers and focus ring;
- reduced-motion handling inside the two animation-heavy components.

Missing or weak:

- no skip-to-content link;
- no global `:focus-visible` treatment;
- mobile menu lacks `aria-controls` and Escape handling;
- global `scroll-behavior: smooth` ignores reduced-motion preference;
- `<time>` has no `datetime` attribute;
- Canvas marker hover is pointer-only, though aggregate values remain text-accessible;
- several important Footer labels use 11 px text;
- the same-route Home-to-top RouterLink may not scroll.

## 13. External link spot-check

Read-only automated checks on 2026-09-04 produced:

- site root, GitHub organization, TraceCoder repository, Huang faculty page, Weisong Sun homepage, Yang Liu homepage, Weibo, and X: HTTP 200 after redirects;
- KGMAF DOI: resolver reached IEEE with an automated-client HTTP 202 response;
- TraceCoder DOI: DOI resolver returned HTTP 404 to the automated client;
- Mingyue Zhang profile URL: current server returned HTTP 404.

The 404 results are not silently “fixed” because publication DOI values and personal links require authoritative human confirmation. Automated status can also be affected by bot protection.

## 14. Security baseline

Repository checks:

- `.env.local` and real `workers/visitor-stats/wrangler.toml` are ignored;
- tracked `.env.production` contains only a public Vite endpoint;
- no secret values were printed or copied into reports;
- no dynamic HTML injection (`v-html`) was found;
- external content is rendered through Vue escaping;
- SQL values are bound rather than concatenated.

Live npm advisory check:

| Package | Locked | Finding | Minimum audited target |
|---|---:|---|---:|
| `postcss` | 8.5.12 | path/source-map disclosure advisories | 8.5.28 |
| `nanoid` | 3.3.11 | generator loop/integer handling advisories | 3.3.18 |

Both are transitive Vite/Vue build dependencies and can be patched within current semver ranges without changing the framework or adding a dependency. The lockfile change is justified by this audit.

Remaining security items requiring external configuration include Cloudflare rate limiting/bot controls, D1 retention policy, exact production bindings, Repository Variable presence, and optional pinning of GitHub Actions to immutable SHAs.

## 15. Unreferenced and duplicate candidates

Confirmed candidates include `Contact.vue`, `JoinUs.vue`, `researchAreas copy.js`, legacy `config.yml`, IDE metadata, tracked `dist/`, `public/icons.svg`, unused source assets, and unused declared dependencies. None should be deleted in this task. Full evidence and recommendations are recorded in `2026-09-04_Module_Retirement_Candidates.md`.

## 16. High-risk modification areas

1. `InteractiveResearchVision.vue`: protected core interaction; only minimal copy/accessibility/path changes are appropriate.
2. `GlobalVisitorsGlobe.vue`: animation and real-data behavior require lifecycle regression testing.
3. `workers/visitor-stats/`: production changes require separate manual deployment and D1/CORS verification.
4. `.github/workflows/deploy.yml`: a syntax or environment mistake can break Pages deployment.
5. `src/data/*.js`: IDs and field names are cross-referenced and must remain stable.
6. `src/router/index.js`: old URLs and hashes must remain compatible.
7. tracked `dist/`: build refresh changes hashed files and must be treated as generated output, not hand-edited source.

## 17. Items intentionally deferred

- no deletion or archiving;
- no dependency pruning;
- no framework migration;
- no Worker deployment or D1 schema execution;
- no remote repository settings changes;
- no publication/news/member factual rewrites;
- no attempt to change the two news entries that predate the stated group founding time;
- no replacement of the protected research-vision artwork;
- no generated social card;
- no commit, push, merge, or formal site deployment.

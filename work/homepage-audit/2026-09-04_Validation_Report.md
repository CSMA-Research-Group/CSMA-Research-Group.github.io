# CSMA Homepage Validation Report

- Validation date: 2026-09-04 (Asia/Shanghai)
- Baseline branch: `main`
- Baseline and current HEAD: `94d6ee6ce3cc76543e1c995d20500b838a9354d1`
- Working branch: `feature/system-audit-redesign-20260904-215647`
- Safety branch: `backup/pre-system-redesign-20260904-215647`
- Commit/push/merge/deploy performed: no

## Executive acceptance result

The high-confidence repository, content-architecture, accessibility, SEO, responsive, deployment, and visitor-statistics source changes are complete. The final Vue/Vite production build succeeds, the production preview returns HTTP 200, the dependency audit reports zero known vulnerabilities, all canonical content datasets compare byte-for-byte with the baseline, and every existing ID, data relationship, route path, legacy redirect, media file, and substantive source module remains present.

The repository-side visitor chain is now internally consistent, but the Worker source change was deliberately not deployed. The previously deployed public endpoint returned a read-only response without an `Access-Control-Allow-Origin` header for the official site Origin during this audit. Therefore production browser CORS, the live D1 binding, and real marker rendering remain manual post-deployment checks; no production POST, D1 write, schema execution, secret read, or Worker/site deployment was performed.

## 1. Current branch

`feature/system-audit-redesign-20260904-215647`

The branch was created from the clean baseline. No commit was created, so HEAD remains the modification-before hash.

## 2. Modification-before HEAD

`94d6ee6ce3cc76543e1c995d20500b838a9354d1`

## 3. Git bundle path

`/Users/hjp/Applications/VSCode/hjp.edu.cse.ms.aps/work/group/CSMA-Research-Group.github.io-20260904-215647.bundle`

## 4. Worktree backup path

`/Users/hjp/Applications/VSCode/hjp.edu.cse.ms.aps/work/group/CSMA-Research-Group.github.io-worktree-20260904-215647/`

The copy excludes `.git/`, `node_modules/`, `dist/`, and `.vite/`, as requested.

## 5. Modified files

### Build, deployment, and metadata

- `.github/workflows/deploy.yml`
- `index.html`
- `package-lock.json`
- `README.md`

`package.json`, `vite.config.js`, and the declared dependency set remain unchanged. The lockfile was refreshed within existing semver ranges to address live audit findings. This updated the compatible transitive dependency graph more broadly than only `postcss` and `nanoid`; the final installed graph includes Vite 7.3.6 and Wrangler 4.129.0 and passes both build and full `npm audit`.

### Application shell, components, and styles

- `src/App.vue`
- `src/style.css`
- `src/components/Footer.vue`
- `src/components/GlobalVisitorsGlobe.vue`
- `src/components/HeroSection.vue`
- `src/components/InteractiveResearchVision.vue`
- `src/components/Navbar.vue`
- `src/components/NewsList.vue`
- `src/components/PeopleCard.vue`
- `src/components/ProjectCard.vue`
- `src/components/PublicationList.vue`
- `src/components/ResearchAreaCard.vue`

### Views and routing

- `src/router/index.js`
- `src/views/About.vue`
- `src/views/Contact.vue` (link-rel hardening only)
- `src/views/Home.vue`
- `src/views/News.vue`
- `src/views/People.vue`
- `src/views/Projects.vue`
- `src/views/Publications.vue`
- `src/views/Research.vue`
- `src/views/Resources.vue`

### Data and visitor service

- `src/data/resources.js`
- `src/services/visitorStats.js`

The Resources collection still contains the same four groups and five items. It only adds presentation `type` fields and synchronizes the TraceCoder availability/link with the exact URL already present in Projects and Publications.

### Worker source and documentation

- `workers/visitor-stats/src/index.js`
- `workers/visitor-stats/wrangler.toml.example`
- `workers/visitor-stats/README.md`

### Regenerated tracked build output

- `dist/index.html`
- old hashed `dist/assets/index-BQbClBLN.js` and `dist/assets/index-CjRmt8cL.css` replaced by the final generated hashes

No source file or media file was deleted. Hash-named generated files changed only because `dist/` is already tracked and the requested final build regenerated it.

## 6. Added files

- `src/data/researchPresentation.js`
- `public/robots.txt`
- `public/sitemap.xml`
- `docs/site-maintenance.md`
- `docs/deployment.md`
- `docs/visitor-stats.md`
- `work/homepage-audit/2026-09-04_Repository_Audit.md`
- `work/homepage-audit/2026-09-04_Content_Inventory.md`
- `work/homepage-audit/2026-09-04_Redesign_Plan.md`
- `work/homepage-audit/2026-09-04_Module_Retirement_Candidates.md`
- `work/homepage-audit/2026-09-04_Validation_Report.md`
- generated `dist/robots.txt`
- generated `dist/sitemap.xml`
- generated `dist/assets/index-D7ycUEfD.css`
- generated `dist/assets/index-U77lvPdr.js`

## 7. Important data confirmed unchanged

Byte-for-byte baseline comparisons passed for:

- `src/data/researchAreas.js`, including all six areas and both highlights;
- `src/data/projects.js`;
- `src/data/publications.js`;
- `src/data/people.js`;
- `src/data/news.js`;
- `src/data/site.js`, including navigation and existing source copy;
- `src/data/visitorStats.js`, including `2026-05-19 05:19` and the empty non-fake fallback.

Automated reference checks found no duplicate IDs and no missing Area → Project/Publication, Highlight → Project/Publication, Project ↔ Publication, or People → Publication relationship. No object field, empty array, placeholder, publication title, project title, person record, news record, existing URL, or media asset was removed.

## 8. Final homepage section order

1. Header
2. Hero / Group Identity
3. Research Vision and four-part framework summary
4. full-width Interactive Research Vision
5. Research Areas hierarchy
6. Featured Projects
7. Selected Publications
8. People Preview
9. Latest News
10. Resources Preview
11. About / Contact / Join Us entry
12. Global Visitors Footer

The previous homepage Research Highlights instance is hidden only at composition level because it duplicated TraceCoder and KGMAF immediately before Projects. Both highlight records and the complete Research-page rendering remain intact.

## 9. Final navigation structure

The first-level navigation remains exactly:

```text
Home → Research → Projects → Publications → People → News → Resources → About
```

No Products, Search, Contact, or Join Us first-level item was added. Contact is integrated into About; Join Us appears in People and About. Every existing legacy route remains present. `/contact` is enhanced from a generic About redirect to `/about#contact`; no legacy path was removed.

## 10. Research Vision status

The protected Interactive Research Vision is retained, not redesigned. It is now placed below the Research Vision copy at full content width. The high-resolution image, four click targets, hotspots, hover/focus highlighting, tooltip, breathing center, particles, flow effects, pointer parallax, neural effects, feedback orbit, deterministic seeded parameters, reduced-motion handling, and cleanup remain.

Protective changes include base-aware asset resolution, Cognitive Intelligence display copy, richer accessible labels, and a mobile-only textual link set. At widths up to 820 px the tiny image hotspots/tooltip are hidden and replaced by one non-duplicated set of four semantic links.

All four desktop hotspot tooltips were visually checked within the component bounds, and all four targets navigated to their existing Research anchors.

## 11. Research Areas status

`src/data/researchPresentation.js` adds a display-only map keyed by the six stable existing IDs. It does not overwrite the canonical data:

- Cognitive Intelligence: core;
- Intelligent Software Engineering and Intelligent Robotics: primary carriers;
- Application Scenarios: grounding and validation;
- Multi-Agent and Collaborative Intelligence: collaborative mechanism;
- Knowledge and Human Feedback: cross-cutting support.

The homepage uses one SVG overlay measured from real DOM card rectangles for the core → carriers → grounding relationship. ResizeObserver and animation-frame cleanup are retained. At 820 px and below, cards become a single column and the connectors are hidden.

The Research page retains all six full records, now exposes existing `keyTopics`, and uses existing IDs to link highlights to real Projects and Publications.

## 12. Projects status

All four original project records remain. Featured Projects uses the shared structured source; ongoing research directions continue to be labeled as ongoing rather than released products. Project images use lazy loading and async decoding. Link accessible names and heading levels were corrected without changing project IDs or URLs.

## 13. Publications status

Both publication records remain unchanged. Each is now rendered once, in its existing category, with featured state expressed on the same card. Formal titles, authors, venues, dates, statuses, DOI values, code links, empty PDF/code values, contribution fields, and IDs are unchanged. Existing Project anchors are retained.

## 14. People status

All four sections and nine records remain, including the explicit alumni placeholder. The homepage previews only current internal group/student sections; the People page retains collaborators and alumni. Links, affiliations, interests, sources, and person-to-publication relationships remain. Join Us stays at the People-page bottom and links to About/contact.

## 15. News status

Both existing items remain unchanged and in descending date order. The full archive stays on News while Home shows the latest entries from the same source. `<time datetime>` semantics and heading hierarchy were corrected.

The pre-existing timeline ambiguity is deliberately unresolved: both news dates precede the stated group establishment time while the copy says “CSMA members attended” / “Our group attended.” This requires owner confirmation and was not silently rewritten.

## 16. Resources status

Resources continues to distinguish Software, Datasets and Benchmarks, Teaching Materials, and Open-Source Repositories. Missing URLs remain non-clickable and marked Coming soon. TraceCoder is shown as available using the exact already-existing official repository URL; no Demo, dataset, course, or code URL was invented.

## 17. About, Contact, and Join Us status

About now surfaces the existing affiliation, address, contact email, GitHub organization, contact note, six research-area labels, and the canonical established time. Contact remains under `#contact`; Join Us remains on People and is also linked from About. Existing inactive source views are preserved for review and compatibility history.

## 18. Globe and real visitor statistics status

### Repository-side status: pass

- markers are derived only from API `countries[]` data;
- failed API access displays `Unavailable`, empty markers, and no synthetic number;
- the canonical UI establishment time is fixed to `2026-05-19 05:19`;
- POST failure falls back to read-only GET;
- both requests use an eight-second timeout and omit credentials;
- referrer transmission is reduced to the origin;
- the request field names remain `visitorId`, `path`, and `referrer`;
- the Globe now has one guarded animation scheduler, a 24 fps cap, reusable ImageData, offscreen/background pause, deferred texture decoding, mounted guards, and complete listener/observer/timer cleanup;
- the production bundle contains the public API base and both visitor endpoints;
- Worker OPTIONS unit checks pass for the official Origin and reject an unapproved Origin before D1 access.

### Live production status: pending manual deployment/verification

The Worker was not deployed. During the audit, the already-public GET endpoint responded but omitted ACAO for `https://csma-research-group.github.io`; browser access to that deployed version therefore cannot be claimed as working. A human must review and deploy the Worker source, then verify OPTIONS and read-only GET, D1 binding, allowed origin, and real marker rendering.

The Worker does not store a full IP, but its current D1 schema stores a salted visitor hash plus pseudonymous country/region/city/coordinates and first/last-seen metadata. No retention period exists in the repository. Retention, data minimization, rate limiting/bot protection, and atomic aggregate updates remain deliberate manual decisions.

## 19. Responsive checks

Actual browser/device-mode checks were performed at:

| Viewport | Checks |
|---|---|
| 1440 × 900 | Home identity, header, hero balance, section container |
| 1280 × 800 | Home, framework summary, full-width Vision |
| 1024 × 768 | all eight primary pages; Research connectors; four Vision hotspots/tooltips/targets; footer |
| 768 × 1024 | Home stacking, mobile navigation, Research-area single column |
| 390 × 844 | mobile header/menu/Escape focus return; Hero; Vision text-link fallback; cards; Footer/Globe fallback; Back to top |

No visible horizontal overflow, connector/text collision, tooltip clipping, footer obstruction, or card overlap was observed in these checks. The mobile menu was verified to close on Escape and return focus to its toggle. The skip link was verified to focus the main landmark without changing the hash-router route.

The local visual session deliberately used an unreachable localhost visitor API, so the observed `Unavailable` state and failed local network requests were expected safety checks, not production API claims.

## 20. Accessibility changes

- hash-router-safe skip link and focusable main target;
- strong global `focus-visible` indicator, with a light override in the dark Footer;
- dynamic mobile navigation label, `aria-controls`, Escape close, focus return, and short-screen scrolling;
- semantic heading hierarchy for Project, Publication, People, News, Resources, and Highlights;
- news `datetime` values;
- accessible external-link names and `noopener noreferrer`;
- semantic mobile Vision links without duplicate hidden hotspots;
- Canvas role/description and live visitor-stat status;
- reduced-motion-aware CSS, router scrolling, Vision effects, and Globe animation;
- decorative SVG remains hidden from assistive technology.

## 21. SEO changes

- improved title and description based only on repository facts;
- canonical root URL;
- Open Graph and basic Twitter Card metadata without a fabricated image;
- route-specific document titles and descriptions;
- `robots.txt` and conservative root-only `sitemap.xml` for hash routing;
- minimal Organization JSON-LD using existing name, URL, email, GitHub, and affiliation.

JSON-LD parsing, canonical presence, sitemap linkage, and generated asset references pass. A real approved 1200 × 630 social image remains optional manual content.

## 22. Performance changes

- eliminated confirmed parallel Globe animation loops;
- capped the expensive Canvas texture path to approximately 24 fps;
- reused the output ImageData buffer;
- paused the Globe offscreen and in hidden tabs;
- deferred the Earth texture until near the Footer;
- added lazy loading/async decoding for non-critical project/research images;
- retained deterministic Vision effects and their requestAnimationFrame cleanup;
- preserved core image clarity and all original assets.

Final Vite output:

```text
dist/index.html                                  2.32 kB (gzip 0.77 kB)
dist/assets/index-D7ycUEfD.css                  43.27 kB (gzip 9.32 kB)
dist/assets/index-U77lvPdr.js                  173.19 kB (gzip 59.69 kB)
dist/assets/kgmaf-framework-BJ0QsL7h.svg       745.87 kB
dist/assets/tracecoder-workflow-B487rq_x.svg   752.70 kB
```

The protected Vision SVG and two figure assets remain comparatively large. They were not recompressed or replaced because clarity and asset preservation take priority; further optimization should be separately visually approved.

## 23. Build command and result

Commands actually run:

```bash
npm ci
npm run build
npm run preview -- --host 127.0.0.1
```

Results:

- `npm ci`: pass; final installed tree reported zero vulnerabilities;
- `npm run build`: pass with Vite 7.3.6, 60 modules transformed;
- production preview: pass; `GET http://127.0.0.1:4173/` returned HTTP 200;
- final `dist/` file inventory checked;
- internal `work/homepage-audit/` content absent from `dist/`;
- production bundle contains the expected visitor API URL and establishment timestamp.

## 24. Lint and test results

`package.json` contains no `lint` or `test` script, so neither command was invented or run.

Additional validation:

- `npm audit --json`: pass, 0 total vulnerabilities;
- `git diff --check`: pass;
- GitHub Actions YAML parse: pass;
- changed JavaScript `node --check`: pass;
- all 22 Vue SFC parse/script/template compile checks: pass;
- Worker CORS unit check without D1: pass;
- JSON-LD parse and generated-asset reference check: pass;
- canonical data byte-preservation check: pass;
- cross-reference and ID uniqueness check: pass.

## 25. Unresolved issues

1. Worker source is fixed locally but not deployed; production CORS/D1/real marker behavior remains a manual check.
2. Cloudflare rate limiting/bot protection is not configured in repository code; CORS is not authentication.
3. D1 pseudonymous geolocation retention/minimization policy and aggregate atomicity need a deliberate owner decision.
4. The TraceCoder DOI resolver and Mingyue Zhang profile returned HTTP 404 during the 2026-09-04 external read-only spot-check; the stored URLs were preserved pending authoritative correction.
5. The two pre-establishment News phrasings need owner review.
6. Formal publication lifecycle status/date claims and the reported TraceCoder improvement figure should be checked against authoritative records.
7. GitHub Pages source setting, Actions Variable state, Cloudflare bindings, and secret presence cannot be proven solely from the repository.
8. No approved social preview image exists.
9. The compatible-range lockfile refresh was broader than two packages; it passes audit/build, but reviewers should inspect it as a supply-chain change.
10. Globe CPU use should be profiled on representative lower-power hardware despite the scheduler improvement.

## 26. Retirement candidates

See `work/homepage-audit/2026-09-04_Module_Retirement_Candidates.md`.

Candidates include the Homepage Highlights instance, inactive Contact/Join Us views, `researchAreas copy.js`, legacy config, IDE metadata, tracked `dist/`, unused declared UI dependencies, a public icon sprite, duplicate/source Vision assets, alternate figures, and unreferenced image material. None was deleted, moved, archived, or removed from history.

## 27. Required human follow-up

1. Review the full Git diff, especially `package-lock.json`, Workflow, Worker, Home, Globe, and Research Areas.
2. Confirm the two pre-establishment News phrasings.
3. Verify publication status/date/metric claims and the two currently failing external URLs from authoritative sources.
4. Review and deploy the Worker only when ready; then perform official-Origin OPTIONS and read-only GET checks before allowing a browser POST.
5. Confirm the real D1 binding, `ALLOWED_ORIGIN`, private hash salt configuration, rate limiting, and retention policy without exposing values.
6. Confirm GitHub Pages uses GitHub Actions and optionally set `VITE_VISITOR_API_BASE`; the workflow now has the same public fallback.
7. Decide whether to provide a real social preview image.
8. Decide separately whether any retirement candidate should be archived or removed.
9. Perform a final owner visual review on a physical laptop, tablet, and phone and optionally run Lighthouse/Performance profiling.
10. Commit and push manually only after review.

## Final integrity statement

- Vue 3 + Vite + JavaScript + native CSS retained.
- No framework migration or new UI framework.
- No declared dependency added or removed.
- No canonical project/publication/member/news/site/visitor data changed.
- No ID, field name, route path, or public anchor removed or renamed.
- No module or media asset deleted.
- No fake visitor data introduced.
- Establishment time remains exactly `2026-05-19 05:19`.
- No secret was read, printed, committed, or placed in the client bundle.
- No commit, push, merge, site deployment, Worker deployment, remote schema operation, or D1 write was performed.

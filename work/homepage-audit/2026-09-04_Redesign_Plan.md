# CSMA Homepage High-Confidence Redesign Plan

Date: 2026-09-04

## Objective

Strengthen the current Vue/Vite site as a professional research-group homepage without replacing the framework, rewriting stable interactions, deleting content, inventing facts, changing IDs, or deploying remote systems.

Visual thesis: a restrained, evidence-led academic site in which a clear cognitive-intelligence core organizes software, robotics, collaboration, and grounded applications. The protected Interactive Research Vision remains the memorable visual system; surrounding layout and typography should clarify, not compete with it.

## Guardrails

- Preserve Vue 3, Vite, JavaScript, native CSS, hash routing, Worker/D1 code, and GitHub Pages Actions.
- Preserve every existing data record, field, empty array, placeholder, ID, route, hash, external URL, and media file unless an explicitly documented high-confidence value correction uses an already verified repository value.
- Do not delete retirement candidates.
- Do not change publication titles, authors, venues, status, DOI, or dates.
- Do not rewrite ambiguous News facts.
- Do not deploy the Worker or site, execute D1 schema, read secrets, commit, push, or merge.
- Keep work reports outside `public/` and verify they do not enter `dist/`.

## Phase 1 — Engineering and security corrections

1. Patch the locked transitive `postcss` and `nanoid` versions within existing compatible ranges; do not add or remove declared dependencies.
2. Change GitHub Actions installation from `npm install` to `npm ci`.
3. Give the Actions visitor API variable a known public fallback matching `.env.production`.
4. Preserve hash routing and correct only the old `/contact` redirect target to `/about#contact`.
5. Add route metadata and update document title/description after navigation.
6. Add a skip link and main landmark target.
7. Add canonical, Open Graph core metadata, robots, sitemap, and organization structured data without inventing a social image or account.

## Phase 2 — Visitor statistics hardening

1. Refactor the Globe to one guarded animation loop.
2. Reuse the pixel buffer and cap the expensive texture render cadence.
3. Pause continuous animation while offscreen or while the tab is hidden; render a static frame for reduced motion.
4. Keep all existing visual layers, texture, markers, tooltip, UTC chip, and aggregate labels.
5. Fall back from failed POST tracking to the existing read-only GET stats endpoint.
6. Add an 8-second fetch timeout so Loading cannot persist indefinitely.
7. Preserve request field names while reducing `referrer` to its origin.
8. Add the confirmed official GitHub Pages origin to the Worker default CORS allowlist and explicitly reject disallowed browser origins before route handling.
9. Activate the official origin in `wrangler.toml.example`; do not edit secrets or deploy.
10. Import the canonical local founding timestamp into the Globe and About; reject any API timestamp that differs from the required value for display purposes.

## Phase 3 — Homepage information architecture

Implement this section order:

1. Header
2. Hero / Group Identity
3. Research Vision copy
4. full-width Interactive Research Vision
5. Research Areas framework
6. Featured Projects
7. Selected Publications
8. People Preview
9. Latest News
10. Resources Preview
11. About / Contact / Join Us
12. Global Visitors Footer

Specific changes:

- reduce Hero to two purposeful actions and use the existing Cognitive and Collaborative Intelligence slogan;
- move, not duplicate or redesign, the Vision instance;
- hide the duplicate Research Highlights instance only on Home while retaining the data and Research-page version;
- add previews from `featuredPublications`, internal people sections, and `resourceGroups`;
- keep missing resource links as non-clickable statuses;
- broaden Latest News heading so future non-conference news remains semantically correct.

## Phase 4 — Research narrative

Add a small, centralized presentation map keyed by existing Research Area IDs. Do not modify stored IDs or data fields.

Presentation hierarchy:

```text
Cognitive Intelligence — core
→ Intelligent Software Engineering + Intelligent Robotics — carriers
→ Application Scenarios — grounding
↔ Multi-Agent and Collaborative Intelligence — collaboration mechanism
↔ Knowledge and Human Feedback — cross-cutting support
```

Use the presentation labels in Home, Research cards, and Interactive tooltip while retaining all legacy hashes, including `#artificial-intelligence`.

The homepage connector system remains a single SVG overlay measured from live DOM card rectangles. It will connect core → carriers → grounding and disappear at tablet/mobile single-column widths.

The Research page will expose the currently hidden `keyTopics` field and add real Project/Publication links to Highlights using their existing IDs.

## Phase 5 — Page-level content clarity

- Publications: render each record once; keep anchors and highlight styling.
- People: keep all four groups and the alumni placeholder; strengthen Join Us with concise material guidance already present in the inactive source.
- Resources: synchronize the existing TraceCoder URL from the same verified value already used by Projects/Publications; introduce no new URL.
- About: surface affiliation, address, GitHub, contact guidance, and the canonical founding timestamp; keep Join Us under About/People, not primary navigation.
- Footer: correct “Cognitive and Collaborative Intelligence,” make Home-to-top work on the current route, and remove fixed clipping constraints.

## Phase 6 — Accessibility and responsive refinement

- add global `:focus-visible` styles;
- add `aria-controls` and Escape handling to mobile navigation;
- add `datetime` to news dates;
- add `noopener noreferrer` to external links;
- respect reduced motion for global smooth scrolling and transitions;
- use tablet single-column Research Areas and hide connectors at 820 px;
- ensure main paragraph justification returns to left alignment on narrow screens;
- keep body text at readable sizes and raise important footer text from 11 px where feasible;
- preserve button/link semantics and Interactive hotspot keyboard access.

## Phase 7 — Documentation

Update README without removing existing guidance and add:

- `docs/site-maintenance.md`
- `docs/deployment.md`
- `docs/visitor-stats.md`

Document Node/npm, structured data update paths, Vision hotspot maintenance, Globe behavior, GitHub Pages variables, Worker/D1/CORS/privacy, safe cache cleanup, and manual Git workflow.

## Phase 8 — Validation

Run only real project scripts:

```bash
npm ci
npm run build
```

There are no lint/test scripts; record them as unavailable rather than inventing commands.

Additional checks:

- `npm audit --omit=dev`
- `git diff --check`
- inspect every `dist` file and confirm no `work/homepage-audit` content is included;
- validate YAML parsing;
- validate Worker module syntax and local OPTIONS behavior without D1 writes;
- re-run ID and cross-reference checks;
- inspect production bundle for the API URL and founding timestamp;
- start local preview with visitor API disabled to avoid modifying production statistics;
- browser-test Home and all eight primary routes;
- test 1440×900, 1280×800, 1024×768, 768×1024, and 390×844;
- test four Vision targets, primary nav, old redirects, internal anchors, Footer, and horizontal overflow;
- record any unavailable or inconclusive checks truthfully.

## Explicitly deferred decisions

- wording of pre-founding News entries;
- invalid-looking DOI/profile URLs;
- official publication lifecycle status/date review;
- primary Gmail versus institutional email;
- removal of unused dependencies, tracked dist, old views, duplicate data, IDE metadata, or media;
- Worker deployment, D1 migration, rate limiting, bot protection, and data-retention policy;
- social preview image creation.

# Site Maintenance Guide

## Scope and architecture

This is the official CSMA Research Group website. It uses Vue 3, Vite, JavaScript, native CSS, and `vue-router` hash history. Keep the site focused on Cognitive and Collaborative Intelligence and preserve this relationship:

1. Cognitive Intelligence is the core.
2. Intelligent Software Engineering and Intelligent Robotics are the primary carriers.
3. Application Scenarios ground and validate the work.
4. Knowledge and Human Feedback provide cross-cutting support.

Do not migrate frameworks or add a large UI system for routine maintenance. Reuse the existing design tokens in `src/style.css` and preserve stable IDs, routes, anchors, and data fields.

## Local setup and commands

Use npm because `package-lock.json` is the repository lockfile.

```bash
npm ci
npm run dev
```

Create and preview a production build with:

```bash
npm run build
npm run preview -- --host 127.0.0.1
```

The package currently has no `lint` or `test` script. Do not assume those commands exist; inspect `package.json` before running project scripts.

## Structured content sources

All public content should remain in the existing structured files:

- `src/data/site.js`: identity, research vision, affiliation, contact information, and primary navigation.
- `src/data/researchAreas.js`: complete research-area records and paper-driven highlights.
- `src/data/researchPresentation.js`: display-only research titles, roles, and homepage ordering.
- `src/data/projects.js`: projects and ongoing research directions.
- `src/data/publications.js`: publication metadata and links.
- `src/data/people.js`: members, students, collaborators, and alumni placeholders.
- `src/data/news.js`: dated verified news.
- `src/data/resources.js`: code, data, tools, courses/documents, demos, and repositories.
- `src/data/visitorStats.js`: canonical public founding timestamp used by the Globe and About page.

Never rename or reuse an existing ID. Before changing an ID-like value, search every reference with `rg`. Keep empty arrays and blank optional link fields; they communicate that data is not yet confirmed.

## Updating Research

Edit `src/data/researchAreas.js` for canonical content. Keep each direction distinct:

- Cognitive Intelligence: reasoning, planning, memory, reflection, metacognition, and adaptation.
- Multi-Agent and Collaborative Intelligence: role specialization, shared artifacts/evidence, coordination, communication, recovery, and control.
- Intelligent Software Engineering: requirements → code → tests → runtime traces → debugging/repair and repository-level agents.
- Intelligent Robotics: perception, task grounding, planning, control, execution feedback, and human-robot collaboration.
- Application Scenarios: prototypes, practical workflows, validation, deployment, reproducibility, and transfer.
- Knowledge and Human Feedback: domain knowledge, standards, review, quality checks, accountability, and traceable evidence.

Use `src/data/researchPresentation.js` when a shorter public label or a homepage ordering change is needed. This avoids changing canonical IDs or component interfaces.

## Updating Projects

Edit `src/data/projects.js`. Preserve each `id`, `relatedPublicationIds`, and existing fields. Verify status and every Project, Paper, Code, DOI, or Demo link before publishing. If a link is not public, leave the link blank and keep a clear `linkPlaceholders` entry instead of inventing a URL.

The homepage derives featured projects from the same file; set `featured` only for a confirmed project that should be summarized there.

## Updating Publications

Edit `src/data/publications.js`. Confirm the title, author order, venue, year, dates, status, DOI, code, project relation, and public PDF rights. Do not turn a submission or internal draft into an accepted/published record. The homepage derives selected papers from the existing `featured` flag; the Publications page renders the complete category archive once.

## Updating People

Edit `src/data/people.js`. Preserve the separation among group members, student researchers, collaborators, and alumni. Do not infer that every coauthor is an internal member. Confirm affiliations, email addresses, homepages, and photographs before publishing. Keep placeholder records until real information is approved.

The People page owns the Join Us section. Join Us is intentionally not a primary navigation item.

## Updating News

Edit `src/data/news.js` and keep entries sorted newest first. Each entry must describe a real event and should link conceptually to a verified paper, project, release, or group activity. Check the event date against the public group timeline before release. The homepage reads the latest records from the same source.

## Updating Resources

Edit `src/data/resources.js`. Use the `type` field to distinguish Code, Data, Tools, Courses, Documents, and Demos. Show a link only when it is confirmed and public; otherwise retain the item with an accurate status such as `Coming soon`. Do not add empty showcase links to make the page look fuller.

## Updating About and contact information

Edit `src/data/site.js` so About, the footer, and other consumers stay consistent. The established time is maintained separately in `src/data/visitorStats.js` and must remain exactly `2026-05-19 05:19`. Contact stays within About and the footer; it is not a primary navigation item.

## Interactive Research Vision

The protected component is `src/components/InteractiveResearchVision.vue`; its base image is `public/figures/csma-research-vision.svg`.

Each object in the local `areas` array contains:

- `targetHash`: an existing Research anchor.
- `flowPath`: the overlay connector path in the `1774 × 887` coordinate system.
- `hotspot`: the clickable area as stable percentages.
- `effect`: the animated overlay region as stable percentages.
- `tooltip`: position, placement, and concise accessible text.

When the base artwork changes, adjust hotspot percentages against the actual visual modules, then test pointer hover, focus, Enter/Space activation, tooltip bounds, and all four target anchors. Keep the seeded visual parameters stable, requestAnimationFrame cleanup intact, reduced-motion behavior intact, and the mobile text links available.

## Global Visitors Globe

See `docs/visitor-stats.md`. Keep country markers derived only from API data. Do not add sample counts or synthetic countries. Preserve the single animation scheduler, visibility/intersection pausing, frame-buffer reuse, resize cleanup, and request timeout/fallback behavior.

## Assets and performance

Use `src/assets/` for imported/bundled assets and `public/` for stable public paths. Do not make public pages depend on internal reports or temporary files. Use descriptive `alt` text for informative images and empty alt text only for decorative images. Add `loading="lazy"` and `decoding="async"` to non-critical raster/figure content when appropriate.

To regenerate dependency and build caches after confirming no uncommitted generated work is needed:

```bash
rm -rf node_modules dist .vite
npm ci
npm run build
```

Never remove source or content files as part of cache cleanup.

## Responsive and accessibility QA

At minimum inspect 1440×900, 1280×800, 1024×768, 768×1024, and 390×844. Check navigation, Hero, Vision tooltips/hotspots, research connectors, cards, About, footer, Globe, focus order, and horizontal overflow. Also test `prefers-reduced-motion: reduce` and keyboard-only navigation.

## Safe submission workflow

Before committing:

```bash
npm ci
npm run build
git diff --check
git status --short --branch
git diff --stat
```

Review every data/link change manually. Do not commit `.env.local`, `workers/visitor-stats/wrangler.toml`, database IDs, salts, tokens, or other secrets. Commit and push only after human review; deployment is triggered separately by the configured GitHub Pages workflow.

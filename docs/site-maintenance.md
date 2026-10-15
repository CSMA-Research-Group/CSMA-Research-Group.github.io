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
npm test
npm run dev
```

Create and preview a production build with:

```bash
npm run build
npm run preview -- --host 127.0.0.1
```

The package has a dependency-free Node test suite for the visitor Worker, world clocks, globe lighting and meteors, and research-vision motion. It does not currently have a lint script; inspect `package.json` before running additional project commands.

## Structured content sources

All public content should remain in the existing structured files:

- `src/data/site.js`: identity, research vision, affiliation, contact information, and primary navigation.
- `src/data/researchAreas.js`: complete research-area records and paper-driven highlights.
- `src/data/researchPresentation.js`: display-only research titles, roles, and homepage ordering.
- `src/data/projects.js`: retained system prototype records.
- `src/data/proposalProjects.js`: ongoing research projects shown on the homepage and Projects page.
- `src/data/systems.js`: supporting system introductions and optional resource previews.
- `src/data/publications.js`: publication metadata and links.
- `src/data/people.js`: confirmed profiles and retained collaborator/alumni records.
- `src/data/peopleHierarchy.js`: one Members directory, confirmed portraits with a default fallback, and homepage selection.
- `src/data/news.js`: dated verified news.
- `src/data/resources.js`: supplementary repository links and retained resource records.
- `src/data/researchInsights.js`: Research Insights articles, group perspectives, and primary sources.
- `src/data/visitorStats.js`: canonical public founding date used by the Globe and About page.

Never rename or reuse an existing ID. Before changing an ID-like value, search every reference with `rg`. Keep empty arrays and blank optional link fields; they communicate that data is not yet confirmed.

## Updating Research

Edit `src/data/researchAreas.js` for canonical content. Keep each direction distinct:

- Cognitive and Collaborative Intelligence: reasoning, planning, memory, and coordination among agents, supported by knowledge and human feedback.
- Intelligent Software Engineering: requirements → code → tests → runtime traces → debugging/repair and repository-level agents.
- Intelligent Robotics: perception, task grounding, planning, control, execution feedback, and human-robot collaboration.
- Application Scenarios: prototypes, practical workflows, validation, deployment, reproducibility, and transfer.

Knowledge and human feedback support these four directions rather than forming a separate homepage direction.

Use `src/data/researchPresentation.js` when a shorter public label or a homepage ordering change is needed. This avoids changing canonical IDs or component interfaces.

## Updating Projects

Edit `src/data/proposalProjects.js` for ongoing projects and `src/data/systems.js` for supporting systems. Some systems reuse confirmed records from `src/data/projects.js`. Preserve each `id` and paper relation. Verify every public link; leave unconfirmed URLs blank.

The homepage presents ongoing projects beside selected publications. Their information row contains More, and their title opens the same project entry. Resources presents the paper-supporting systems separately.

## Updating Publications

Edit `src/data/publications.js`. Confirm the title, author order, venue, year, dates, status, DOI, code, project relation, and public PDF rights. Do not turn a submission or internal draft into an accepted/published record. The homepage derives selected papers from the existing `featured` flag; the Publications page renders the complete category archive once.

Each `systemId` must match a supporting system, whose `relatedPublicationIds` must point back to the paper. Titles and More open the individual paper page; DOI, code, and system links belong in the detail content, not below homepage summaries.

## Updating People

Maintain confirmed names and directions in `src/data/people.js`, with a single Members presentation in `src/data/peopleHierarchy.js`. There is no advisor/student split. Hao Chen uses the supplied portrait at `public/people/hao-chen.jpg`; other members, including Jiangping Huang, retain `public/people/default-avatar.svg`. Jiangping Huang's primary displayed direction is Artificial Intelligence; Zhirui Huang is Intelligent Robotics; Shiyu Zhou, Juncheng Lu, Juntong Ou, Yujie Jiang, and Hao Chen are Intelligent Software Engineering. Hao Chen's introduction describes ongoing work on explicit repair history in LLM-based program repair, without a submission venue or claims of established results. Use the full English names explicitly provided by the user. Prior fictional profiles and generated portraits are archived outside the site. Preserve collaborator/alumni records without presenting them as current members; add biographies, contact details, and homepages only when confirmed.

Portraits and names enter individual profiles. Show personal homepage links only inside those introductions and only when provided. The homepage presents the confirmed members in a shared grid, without displaying headcounts.

The People page retains its Join Us section, and the About page provides contact details and joining instructions. Join Us is intentionally not a primary navigation item.

## Updating News

Edit `src/data/news.js` and keep entries sorted newest first. Each entry must describe a real event and should link conceptually to a verified paper, project, release, or group activity. Check the event date against the public group timeline before release. The homepage reads the latest records from the same source.

## Updating Resources

Edit `src/data/systems.js` for the Resources system cards. Names and right-aligned More open system introductions; do not add System overview / Paper / Code link rows. A supplied `previewMedia: { src, alt, width, height }` displays a GIF or animated WebP below its description; leave it null while no media is available. Supplementary repository links come from `src/data/resources.js`. Keep availability statements factual.

Research Insights uses the same heading and card styles as Research Applications. Maintain its articles in `src/data/researchInsights.js`; titles and More open `/resources/insights/:id`. Separate source-reported findings from the group's interpretation, and preserve source links and publication dates.

## Updating About and contact information

Edit `src/data/site.js` so About, the footer, and other consumers stay consistent. The user-confirmed founding date is `2022-07-20` in `src/data/visitorStats.js`; do not append a time. The two homepage About module headers provide Home and How to join. Their bodies contain no hyperlinks; joining/contact details remain on the About page and in the footer.

## Interactive Research Vision

The component is `src/components/InteractiveResearchVision.vue`. Home and Research use `src/assets/figures/csma-home-research-vision.png`; the original `public/figures/csma-research-vision.svg` is retained. `ResearchVisionMotion.vue` supplies slow orbit rings and particles without directional flow arrows. Preserve the image frame, alignment, hotspots, tooltips, reduced-motion behavior, and visibility-based pausing.

Each object in the local `areas` array contains:

- `targetHash`: an existing Research anchor.
- `flowPath`: the overlay connector path in the `1774 × 887` coordinate system.
- `hotspot`: the clickable area as stable percentages.
- `effect`: the animated overlay region as stable percentages.
- `tooltip`: position, placement, and concise accessible text.

When the base artwork changes, adjust hotspot percentages against the actual visual modules, then test pointer hover, focus, Enter/Space activation, tooltip bounds, and all four target anchors. Keep the seeded visual parameters stable, requestAnimationFrame cleanup intact, reduced-motion behavior intact, and the mobile text links available.

## Global Visitors Globe

See `docs/visitor-stats.md`. Keep country markers derived only from API data. Do not add sample counts or synthetic countries. Preserve the single animation scheduler, visibility/intersection pausing, frame-buffer reuse, resize cleanup, and request timeout/fallback behavior.

Keep the current-visitor marker separate from aggregate country markers. It must use only the coarse coordinates returned for the active POST response, follow the globe projection during rotation, disappear on the back of the sphere, and remain labeled as approximate. Keep time formatting outside the animation loop and use the Worker timezone with a device-timezone fallback.

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

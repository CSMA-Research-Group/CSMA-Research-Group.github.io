# CSMA Research Group Website

This repository contains the official website for **CSMA Research Group**, deployed through GitHub Pages.

The site presents CSMA research on **Cognitive and Collaborative Intelligence**. Cognitive intelligence is the core; intelligent software and robotics are the primary carriers; application scenarios provide grounding; knowledge and human feedback form cross-cutting support. Content is maintained through structured data files so publications, projects, people, news, research areas, and resources can be updated without rewriting page templates.

## Tech Stack

- Vue 3
- Vite
- JavaScript
- CSS
- vue-router
- GitHub Pages

## Local Development

Install dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Vite will print a local URL such as `http://localhost:5173/`.

To enable real footer visitor statistics locally, create `.env.local` from `.env.example` and point it at the deployed or local Worker:

```bash
VITE_VISITOR_API_BASE=https://your-worker-name.your-subdomain.workers.dev
```

If `VITE_VISITOR_API_BASE` is not configured or the API is unavailable, the footer globe keeps its visual shell but shows visitor statistics as unavailable and does not display fallback visitor counts or country markers.

## Build

Create a production build:

```bash
npm run build
```

The generated site is written to `dist/`.

Preview the production build locally:

```bash
npm run preview
```

## Deployment to GitHub Pages

This repository is named `CSMA-Research-Group.github.io`, so GitHub Pages can serve it as an organization site.

Recommended deployment flow:

1. Update content in `src/data/`.
2. Place production assets in `src/assets/` or `public/`.
3. Run `npm run build`.
4. Review the generated site locally.
5. Commit and push changes manually after review.
6. Configure GitHub Pages to deploy from the intended branch or GitHub Actions workflow.

The router uses hash history for reliable static hosting on GitHub Pages without requiring a custom 404 fallback.

## Visitor Statistics Worker

The footer visitor globe can use the Cloudflare Worker + D1 backend in `workers/visitor-stats/`.

Worker setup summary:

```bash
cd workers/visitor-stats
cp wrangler.toml.example wrangler.toml
npx wrangler d1 create csma-visitor-stats
npx wrangler d1 execute csma-visitor-stats --remote --file=./schema.sql
npx wrangler secret put VISITOR_HASH_SALT
npx wrangler deploy
```

Set `ALLOWED_ORIGIN` in the Worker config for the production GitHub Pages domain, then set the frontend `VITE_VISITOR_API_BASE` to the deployed Worker URL. Never expose `VISITOR_HASH_SALT` in frontend variables or documentation. See `workers/visitor-stats/README.md` and `docs/visitor-stats.md` for the full API, privacy notes, fallback behavior, and local testing commands.

## Structured Content

Most public website content is stored in `src/data/`:

- `src/data/site.js`: group name, slogan, description, contact, affiliation, and navigation
- `src/data/researchAreas.js`: research directions and research highlights
- `src/data/researchPresentation.js`: presentation-only research titles, roles, and homepage ordering; canonical IDs remain in `researchAreas.js`
- `src/data/projects.js`: project prototypes, status, key ideas, links, figures, and related publications
- `src/data/publications.js`: publication metadata, tags, DOI/code/PDF links, summaries, and contribution highlights
- `src/data/people.js`: group members, student researchers, collaborators, and alumni placeholders
- `src/data/news.js`: dated news entries with venue, location, type, and paper title
- `src/data/resources.js`: software, datasets, teaching materials, and repository links

## Updating Publications

Edit `src/data/publications.js`. Each publication can include:

- `id`
- `title`
- `authors`
- `venue`
- `venueFullName`
- `year`
- `publicationDate`
- `conferenceDate`
- `location`
- `type`
- `doi`
- `pdf`
- `code`
- `tags`
- `abstractSummary`
- `contributionHighlights`
- `relatedProjectId`
- `featured`

Only add verified publications. Do not invent papers, authors, venues, awards, grants, DOI values, code repositories, or PDF links. Leave `pdf` blank unless the group confirms that the PDF can be publicly hosted or linked.

## Updating Projects

Edit `src/data/projects.js`. Projects should include a stable `id`, status, type, description, key ideas, related publication IDs, links, tags, and optional figure metadata.

Use confirmed code, artifact, DOI, and demo links only. If a project link is not confirmed, use `linkPlaceholders` rather than publishing an uncertain URL.

## Updating People

Edit `src/data/people.js`. Keep people grouped as:

- Group Members
- Student Researchers
- Collaborators
- Alumni

Use publication metadata for names, affiliations, and emails. Add homepage links only when the source reliably matches the same person by name, affiliation, email, and research area. Do not assume that every paper author is an internal CSMA member.

## Updating News

Edit `src/data/news.js`. News entries should use confirmed dates, past tense for events that already happened, and structured fields such as `venue`, `location`, `type`, and `paperTitle`.

The homepage displays the latest entries from this data file; the News page displays the full archive.

## Paper PDFs and Overleaf Input

The `tmp/` directory is an input-material directory, not a production asset directory.

Use `tmp/` for newly supplied paper PDFs, Overleaf exports, LaTeX files, BibTeX files, figures, images, and review notes that need to be inspected before website updates. Formal website resources should be moved or redrawn into:

- `src/assets/` for bundled images, SVG diagrams, and Vue-imported assets
- `public/` for files that should be served directly

Do not make production pages depend on `tmp/` paths.

## Figures and Diagrams

Paper figures or diagrams used on public pages should be clean, legible, and free from publisher watermarks or full-page screenshots. If paper figures are only available as PDF and cannot be loaded cleanly by Vue/Vite, redraw them as maintainable SVG assets under `src/assets/figures/`.

## Placeholder Notes

Use placeholders or blank fields for unconfirmed information. In particular, confirm before publishing:

- author homepages
- member photos
- personal biographies
- local paper PDFs
- project code links
- contact emails and office addresses
- school, college, and institutional profile details

## Verification Policy

Publication and people data should be manually checked before release. Do not invent unverified publication, member, collaborator, award, grant, affiliation, news, or result information. The user reviews the final diff and runs the final Git workflow manually.

Do not commit or push automatically from this repository.

## Maintenance Guides

- [`docs/site-maintenance.md`](docs/site-maintenance.md): structured content, Interactive Research Vision, assets, responsive QA, and safe Git workflow
- [`docs/deployment.md`](docs/deployment.md): GitHub Pages build pipeline, Vite base, environment variables, and production checks
- [`docs/visitor-stats.md`](docs/visitor-stats.md): frontend → Worker → D1 data flow, privacy, CORS, API behavior, and Globe maintenance

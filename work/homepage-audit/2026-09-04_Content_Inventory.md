# CSMA Homepage Content Inventory

Audit date: 2026-09-04

## 1. Site identity

Source: `src/data/site.js`

- Name: CSMA Research Group
- Short name: CSMA
- Existing slogan: “Cognitive and collaborative intelligence for software, robotics, and real-world AI.”
- Existing description and full research vision: retained unchanged in the data source
- Existing public contact email, affiliation, address, GitHub organization, and repository URL: retained
- Canonical founding timestamp source: `src/data/visitorStats.js`
- Required timestamp: `2026-05-19 05:19`

No institution, founding date, person, publication, award, grant, project, or link was invented during inventory.

## 2. Navigation and routes

| Order | Label | Route | Status |
|---:|---|---|---|
| 1 | Home | `/` | active |
| 2 | Research | `/research` | active |
| 3 | Projects | `/projects` | active |
| 4 | Publications | `/publications` | active |
| 5 | People | `/people` | active |
| 6 | News | `/news` | active |
| 7 | Resources | `/resources` | active |
| 8 | About | `/about` | active |

Legacy entry paths retained by redirects:

- `/join-us` → `/people#join-us`
- `/contact` → `/about` before modification; should retain the route and target `/about#contact`
- `/highlights` → `/research`
- `/seminars` → `/news`
- `/positions` → `/people#join-us`
- `/gallery` → `/resources`

## 3. Current and target homepage inventory

Current sections:

1. Hero / CSMA identity / Interactive Vision
2. Research Vision copy
3. Featured Research Areas
4. Research Highlights
5. Featured Projects
6. Latest News
7. About CTA
8. global Footer / visitors

Target sections using only existing data:

1. Hero / Group Identity
2. Research Vision copy
3. full-width Interactive Research Vision
4. Research Areas framework
5. Featured Projects
6. Selected Publications
7. People Preview
8. Latest News
9. Resources Preview
10. About / Contact / Join Us
11. global Footer / visitors

The homepage Research Highlights instance is a display-level duplicate of the same two featured projects. Its data and the Research-page rendering must remain.

## 4. Research Areas

Source: `src/data/researchAreas.js`

Count: 6. All IDs are unique and retained.

| ID | Stored title | Intended presentation role | Cross-references |
|---|---|---|---|
| `artificial-intelligence` | Artificial Intelligence | Cognitive Intelligence — core | TraceCoder, KGMAF; 2 papers |
| `intelligent-software-engineering` | Intelligent Software Engineering | primary carrier | 3 projects; 2 papers |
| `intelligent-robotics` | Intelligent Robotics | primary carrier | embodied-intelligence; no paper claimed |
| `application-scenarios` | Application Scenarios | grounding and validation | TraceCoder, KGMAF; 2 papers |
| `multi-agent-cognitive-ai` | Multi-Agent and Cognitive AI | Multi-Agent and Collaborative Intelligence | TraceCoder, KGMAF; 2 papers |
| `knowledge-human-loop-ai` | Knowledge-Guided and Human-in-the-Loop AI | Knowledge and Human Feedback — cross-cutting support | TraceCoder, KGMAF; 2 papers |

All original stored titles, summaries, motivations, topics, questions, methods, representative systems, related IDs, and expected-impact text remain in the original data objects. Presentation labels should be mapped by stable ID instead of renaming an ID or overwriting the stored title.

Currently unrendered but valuable fields:

- `keyTopics`
- highlight `projectId`
- highlight `publicationId`

## 5. Research Highlights

Count: 2

- `tracecoder-highlight` → project `tracecoder` → publication `tracecoder-icse-2026`
- `kgmaf-highlight` → project `kgmaf` → publication `kgmaf-ase-2025`

Both include an existing figure, alt text, caption, summary, and tags. All cross-references resolve.

## 6. Projects

Source: `src/data/projects.js`

Count: 4. Featured: 2. All IDs are unique and retained.

| ID | Name | Stored status | Featured | Link state |
|---|---|---|---:|---|
| `tracecoder` | TraceCoder | Published / Research Prototype | yes | existing GitHub + DOI |
| `kgmaf` | KGMAF / ChatREQ | Published / Prototype | yes | existing DOI; code placeholder retained |
| `repo-level-agents` | Repository-Level Software Agents | Ongoing Direction | no | placeholder retained |
| `embodied-intelligence` | Embodied and Robotic Intelligence | Ongoing Direction | no | placeholder retained |

No ongoing direction is promoted as a released product. Existing empty arrays and placeholder strings remain.

## 7. Publications

Source: `src/data/publications.js`

Count: 2. Featured: 2. Category: Conference Papers.

IDs:

- `tracecoder-icse-2026`
- `kgmaf-ase-2025`

Both records retain title, author list, venue, full venue, year, dates, location, type, DOI, PDF, code, tags, summary, contributions, related project, and featured state. Empty PDF/code values are intentionally preserved where public release is not confirmed.

Display issue: the Publications component renders the same records once in Featured Publications and again in Conference Papers. This should be corrected in rendering only.

External check requiring human follow-up: the TraceCoder DOI resolver returned HTTP 404 to the automated client on 2026-09-04. The stored DOI must not be changed without authoritative confirmation.

## 8. People

Source: `src/data/people.js`

Four sections, nine records total:

- Group Members: 1
- Student Researchers: 1
- Collaborators: 6
- Alumni: 1 explicit placeholder

IDs:

```text
jiangping-huang
wenguang-ye
dongmin-jin
weisong-sun
yang-liu
jian-zhang
mingyue-zhang
zhi-jin
alumni-placeholder
```

All person-to-publication references resolve. Blank homepages and emails remain blank. The alumni placeholder must remain clearly marked as pending rather than being treated as verified alumni data.

External check requiring human follow-up: the current Mingyue Zhang profile URL returned HTTP 404 to the automated client on 2026-09-04. It is retained pending confirmation.

## 9. News

Source: `src/data/news.js`

Count: 2, sorted descending by date.

- `icse-2026-rio` — 2026-04-12
- `ase-2025-seoul` — 2025-11-16

Both paper titles exactly match publication records. No new news is added.

Important factual review: both dates precede the required CSMA founding time `2026-05-19 05:19`, while the text says “CSMA members attended” / “Our group attended.” The events may be true, but retrospective use of the group identity is temporally ambiguous. The records are preserved unchanged and require human wording confirmation.

## 10. Resources

Source: `src/data/resources.js`

Four groups, five items:

- `software`: TraceCoder; ChatREQ
- `datasets`: Requirements and traceability benchmark
- `teaching`: Reading list
- `repositories`: CSMA GitHub organization

Empty resource links are hidden by the template and do not produce fake buttons. One internal inconsistency is confirmed: TraceCoder already has the exact same public GitHub URL in the Project and Publication data but remains “Coming soon” with an empty link in Resources. It can be synchronized using only that existing URL.

Future records should use clear Code, Data, Tools, Courses, Documents, or Demos classifications only when a real resource exists.

## 11. About, Contact, and Join Us

Active About currently includes research vision, email, research interests, and links to People/Email.

Structured fields not yet surfaced on an active page:

- affiliation
- address
- GitHub organization
- repository URL
- contact note
- founding timestamp

The inactive `Contact.vue` and `JoinUs.vue` contain additional affiliation, GitHub, research-fit, application-material, topic, and privacy guidance. Their substantive content remains preserved; `Contact.vue` received only `noopener` link hardening. High-confidence, non-duplicative content was surfaced in active About and People sections while legacy routes continue redirecting.

## 12. Visitor data

The canonical local fallback file contains:

```text
foundedAt = 2026-05-19 05:19
totalVisitors = null
visitorSources = []
```

This is a safe empty state, not fake data. The component currently repeats the founding timestamp as a fallback; About should import the canonical value rather than introduce another literal.

Visitor markers are created exclusively from API `countries[]` records with finite latitude/longitude. No static country marker list is used as visitor data.

## 13. Media and resources

Referenced production assets:

- `/public/figures/csma-research-vision.svg`
- `/public/textures/earth-blue-marble.jpg`
- `/src/assets/figures/kgmaf-framework.svg`
- `/src/assets/figures/tracecoder-workflow.svg`
- `/public/favicon.svg`

Unreferenced material is documented as retirement/archival candidates, not removed. The exact duplicate public/source vision file and original PNG may be source-preservation assets and should be retained.

## 14. Integrity checks

- duplicate IDs: none
- missing Research Area references: none
- missing Highlight references: none
- missing Project references: none
- missing Publication references: none
- missing People references: none
- News descending: yes
- Navigation order: correct
- founding timestamp: correct
- fake visitor markers/counts: none
- invented links during audit: none

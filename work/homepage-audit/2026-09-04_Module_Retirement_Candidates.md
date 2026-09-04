# Module Retirement Candidates

Date: 2026-09-04

No candidate in this report is deleted, moved, archived, or removed from Git history during this task. Recommendations use only the approved disposition labels.

## 1. Homepage Research Highlights instance

- 名称: Homepage Research Highlights instance
- 路径: `src/views/Home.vue` (pre-change lines 80–103)
- 当前功能: renders TraceCoder and KGMAF highlight cards on Home
- 是否被import: yes, through `researchHighlights`
- 是否被router引用: Home route renders it indirectly
- 是否被数据引用: reads the two active `researchHighlights` records
- 是否被外部URL引用: no standalone URL; Research page remains the durable location
- 是否进入生产bundle: yes
- 不再需要的证据: immediately duplicates the same two systems in Featured Projects and duplicates the Research-page highlight block
- 删除风险: deleting the data or Research-page block would lose figure-led paper context; therefore only the Home instance may be hidden
- 推荐处理: **仅从首页隐藏**

## 2. Legacy Contact view

- 名称: standalone Contact view
- 路径: `src/views/Contact.vue`
- 当前功能: retains detailed email, affiliation, address, GitHub, and collaboration copy
- 是否被import: no
- 是否被router引用: component is not routed; `/contact` is a redirect
- 是否被数据引用: reads `siteInfo`; no active component reads it
- 是否被外部URL引用: old `/#/contact` bookmarks may exist
- 是否进入生产bundle: no
- 不再需要的证据: Contact responsibility is assigned to About
- 删除风险: contains useful text not fully present in About and may be useful for history or rollback
- 推荐处理: **停止维护但保留旧URL**

## 3. Legacy Join Us view

- 名称: standalone Join Us view
- 路径: `src/views/JoinUs.vue`
- 当前功能: retains research-fit, suggested-material, topic, and privacy guidance
- 是否被import: no
- 是否被router引用: component is not routed; `/join-us` and `/positions` redirect to People
- 是否被数据引用: reads `siteInfo`; no active component reads it
- 是否被外部URL引用: old `/#/join-us` and `/#/positions` bookmarks may exist
- 是否进入生产bundle: no
- 不再需要的证据: Join Us is intentionally placed in People and About instead of primary navigation
- 删除风险: active pages do not yet contain every useful sentence in this source
- 推荐处理: **停止维护但保留旧URL**

## 4. Research Areas copy

- 名称: alternate/legacy Research Areas data copy
- 路径: `src/data/researchAreas copy.js`
- 当前功能: stores an older, more verbose version of the six Research Areas and two Highlights
- 是否被import: no
- 是否被router引用: no
- 是否被数据引用: no active consumer
- 是否被外部URL引用: no known stable URL
- 是否进入生产bundle: no
- 不再需要的证据: active imports consistently target `src/data/researchAreas.js`; IDs overlap with the active file
- 删除风险: wording differs substantially and may be valuable history or drafting input
- 推荐处理: **等待人工确认后归档**

## 5. Legacy Jekyll-like config

- 名称: legacy site configuration
- 路径: `config.yml`
- 当前功能: declares a Cayman Jekyll theme and old description
- 是否被import: no
- 是否被router引用: no
- 是否被数据引用: no
- 是否被外部URL引用: possible undocumented legacy deployment tooling
- 是否进入生产bundle: no
- 不再需要的证据: current deployment uses Vite + GitHub Actions; standard Jekyll file would be `_config.yml`, not `config.yml`
- 删除风险: may document an older deployment setup
- 推荐处理: **等待人工确认后归档**

## 6. IntelliJ module metadata

- 名称: IDE module metadata
- 路径: `lab-homepage.iml`
- 当前功能: local IDE project settings
- 是否被import: no
- 是否被router引用: no
- 是否被数据引用: no
- 是否被外部URL引用: no
- 是否进入生产bundle: no
- 不再需要的证据: not used by Vue, Vite, npm, Worker, or Actions
- 删除风险: a contributor may rely on the checked-in IDE configuration
- 推荐处理: **等待人工确认后删除**

## 7. Tracked build output

- 名称: generated Vite output
- 路径: `dist/`
- 当前功能: stores a previously generated production build in Git
- 是否被import: no; it is generated from source
- 是否被router引用: contains compiled routes but is not a source dependency
- 是否被数据引用: contains compiled snapshots of data
- 是否被外部URL引用: could be used by a legacy branch-based Pages configuration
- 是否进入生产bundle: it is the bundle
- 不再需要的证据: current Actions workflow runs `npm run build` and uploads a freshly generated `./dist`
- 删除风险: actual GitHub Pages source setting was not changed or conclusively verified; removing tracked output may disrupt a legacy fallback
- 推荐处理: **等待人工确认后删除**

## 8. Public icon sprite

- 名称: public icon sprite
- 路径: `public/icons.svg`
- 当前功能: possible icon definitions or legacy direct asset
- 是否被import: no internal reference found
- 是否被router引用: no
- 是否被数据引用: no
- 是否被外部URL引用: unknown; `/icons.svg` is a stable public URL
- 是否进入生产bundle: yes, because all `public/` files are copied
- 不再需要的证据: repository-wide source search found no consumer
- 删除风险: an external document/bookmark may request the stable URL
- 推荐处理: **等待人工确认后删除**

## 9. Unused declared UI dependencies

- 名称: `@vueuse/core` and `element-plus`
- 路径: `package.json`, `package-lock.json`, `node_modules/`
- 当前功能: installed dependency capacity; no current source import
- 是否被import: no import in `src/`
- 是否被router引用: no
- 是否被数据引用: no
- 是否被外部URL引用: no
- 是否进入生产bundle: no fingerprint found in the current bundle
- 不再需要的证据: source import scan is empty for both packages
- 删除风险: may be reserved for planned modules; removal substantially rewrites the lockfile
- 推荐处理: **等待人工确认后删除**

## 10. Duplicate public/source Vision asset

- 名称: source copy of public Vision SVG
- 路径: `src/assets/figures/csma-research-vision.svg`
- 当前功能: preserves a source-tree copy of the core public visual
- 是否被import: no
- 是否被router引用: no
- 是否被数据引用: no; runtime uses `public/figures/csma-research-vision.svg`
- 是否被外部URL引用: source path is not stable; public twin is stable
- 是否进入生产bundle: no
- 不再需要的证据: SHA-1 is identical to the public file
- 删除风险: it may be the intentional source/master copy for the protected visual
- 推荐处理: **继续保留**

## 11. Vision source PNG

- 名称: source raster for Interactive Research Vision
- 路径: `src/assets/figures/image2.png`
- 当前功能: likely preserves the 1774 × 887 raster embedded in the SVG
- 是否被import: no
- 是否被router引用: no
- 是否被数据引用: no runtime consumer
- 是否被外部URL引用: no stable source URL
- 是否进入生产bundle: no
- 不再需要的证据: raster bytes match the image embedded in the protected SVG
- 删除风险: removal would discard the smaller editable/source representation of a protected core asset
- 推荐处理: **继续保留**

## 12. Alternate lightweight figure files

- 名称: underscore-suffixed alternate figures
- 路径: `src/assets/figures/csma-research-vision_.svg`, `kgmaf-framework_.svg`, `tracecoder-workflow_.svg`
- 当前功能: possible lightweight/redrawn alternatives
- 是否被import: no
- 是否被router引用: no
- 是否被数据引用: no
- 是否被外部URL引用: no stable URL
- 是否进入生产bundle: no
- 不再需要的证据: active data imports the non-underscore figures
- 删除风险: these may be maintainable source/replacement artwork and are very small
- 推荐处理: **继续保留**

## 13. Unreferenced image library

- 名称: unused avatars, logo, generic images, and landscape collection
- 路径: `src/assets/avatar-huang.png`, `src/assets/logos/`, `src/assets/img_*.png`, `src/assets/风景图/`
- 当前功能: candidate profile, institution, hero, and gallery media
- 是否被import: no current source import
- 是否被router引用: no
- 是否被数据引用: no
- 是否被外部URL引用: no stable Vite source URL known
- 是否进入生产bundle: no
- 不再需要的证据: repository-wide source search found no consumer; approximately 16.5 MiB is outside the current bundle
- 删除风险: ownership, intended future use, and provenance are not established; people/gallery work may depend on them later
- 推荐处理: **等待人工确认后归档**

## 14. Static visitor fallback module

- 名称: visitor fallback data
- 路径: `src/data/visitorStats.js`
- 当前功能: stores the protected founding timestamp and explicit empty visitor fallback
- 是否被import: no before this audit; planned as the canonical source for About/Globe
- 是否被router引用: no direct route
- 是否被数据引用: no before modification
- 是否被外部URL引用: no
- 是否进入生产bundle: no before modification
- 不再需要的证据: none; the module protects required truth and prevents fake data
- 删除风险: would remove the canonical local founding time and safe empty fallback
- 推荐处理: **继续保留**

## 15. Ignored `.DS_Store` files

- 名称: macOS filesystem metadata
- 路径: repository root and several `src/` / `workers/` directories
- 当前功能: none for the project
- 是否被import: no
- 是否被router引用: no
- 是否被数据引用: no
- 是否被外部URL引用: no
- 是否进入生产bundle: no
- 不再需要的证据: explicitly ignored; system-generated metadata only
- 删除风险: negligible, but cleanup does not improve the reviewable source diff
- 推荐处理: **等待人工确认后删除**

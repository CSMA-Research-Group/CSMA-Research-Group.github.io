# Visitor Statistics and Globe

## Data flow

The public statistics path is:

```text
Vue frontend
→ src/services/visitorStats.js
→ Cloudflare Worker (workers/visitor-stats/)
→ Cloudflare D1
→ aggregate country data
→ GlobalVisitorsGlobe.vue
```

The frontend endpoint comes from `VITE_VISITOR_API_BASE`. The repository's current public production endpoint is:

```text
https://csma-visitor-stats.hjpwhu.workers.dev
```

## API behavior

- `POST /api/visitor/track` records a visit and returns aggregate statistics.
- `GET /api/visitor/stats` returns aggregate statistics without incrementing counters.

The frontend first attempts POST. If tracking is unavailable or rejected, it performs the read-only GET so existing real statistics can still be shown. Both requests have an eight-second timeout. If both fail or the API base is absent, the UI displays `Unavailable` and renders no country markers or invented counts.

The response fields consumed by the UI are `ok`, `foundedAt`, `uniqueVisitors`, `countriesReached`, `currentVisitorNumber`, and `countries`. Marker coordinates and visit labels come only from `countries` returned by the API.

## Privacy model

The browser stores a random local pseudonymous ID under `csma_visitor_id`. It sends that ID, the hash-route path, and only the origin portion of the referrer. The Worker combines the local ID with the User-Agent and a private `VISITOR_HASH_SALT`, then stores the resulting SHA-256 hash. The current D1 schema keeps pseudonymous per-visitor country, region, city, latitude, longitude, first-seen, and last-seen metadata in addition to country and global aggregates.

The implementation does not store the full IP address, but the retained hash and geolocation fields must still be treated as pseudonymous data rather than fully anonymous data. The repository does not currently define a retention period. Data minimization, retention, and deletion policy require an explicit human decision before any schema migration. Never log, publish, commit, or expose `VISITOR_HASH_SALT`. Do not put it in `.env.production`, `.env.local`, a `VITE_` variable, GitHub Actions Variables, or documentation.

## CORS

The Worker code permits these safe defaults:

```text
https://csma-research-group.github.io
http://localhost:5173
http://localhost:4173
```

`ALLOWED_ORIGIN` in `wrangler.toml` can add comma-separated origins. Browser requests with any other Origin are rejected. `workers/visitor-stats/wrangler.toml.example` documents the expected production/local configuration; the real `wrangler.toml` is ignored because it contains deployment-specific identifiers.

Changes to Worker source do not affect the deployed endpoint until a human reviews and deploys them. Before deployment, test an OPTIONS request from the official origin and confirm that `Access-Control-Allow-Origin` matches it.

## Canonical established time

The public established time is:

```text
2026-05-19 05:19
```

It is present in `src/data/visitorStats.js`, the Worker default, and D1 schema. The UI deliberately uses the canonical frontend value so an unexpected API value cannot silently change the public timeline.

## Globe rendering and performance

`src/components/GlobalVisitorsGlobe.vue` uses a Canvas globe with the local Blue Marble texture at `public/textures/earth-blue-marble.jpg`.

The component:

- uses one guarded requestAnimationFrame scheduler at 24 fps;
- reuses its pixel frame buffer;
- pauses when outside the viewport or when the document is hidden;
- defers texture decoding until near the viewport;
- renders a static frame for reduced-motion users;
- disconnects ResizeObserver/IntersectionObserver and listeners on unmount;
- clamps pointer tooltips within the canvas.

Do not create additional animation loops by calling requestAnimationFrame from texture, stats, or resize callbacks. Those callbacks should call the shared `requestRender()` scheduler.

## Local testing without production writes

Use a local Worker endpoint or a deliberately unavailable localhost port when testing visual fallback. Do not point local automated browser checks at the production POST endpoint unless recording a visit has been explicitly authorized.

Example fallback-only frontend session:

```bash
VITE_VISITOR_API_BASE=http://127.0.0.1:9 npm run dev -- --host 127.0.0.1
```

For a local Worker, copy the example configuration, use a local D1 database, and run:

```bash
npx wrangler dev
```

Remote schema execution and `wrangler deploy` mutate external state. Confirm the exact D1 target and obtain human approval before running either command.

## Production verification

After an authorized Worker deployment:

1. send an OPTIONS request with `Origin: https://csma-research-group.github.io`;
2. issue a read-only GET to `/api/visitor/stats`;
3. validate field types and ensure country coordinates are real API output;
4. load the site and confirm no browser CORS error;
5. check that the Globe shows `Unavailable` rather than synthetic values when the API is blocked;
6. confirm no secret or full IP value appears in source, logs, or the frontend bundle.

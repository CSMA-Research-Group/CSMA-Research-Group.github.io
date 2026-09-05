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

The frontend first attempts POST. If tracking is unavailable or rejected, it performs the read-only GET so existing real aggregate statistics can still be shown. Both requests have an eight-second timeout. A transient failure is retried with bounded backoff, and returning to an unavailable tab triggers a fresh attempt; successful aggregate data remains visible while current-visitor tracking recovers. The UI distinguishes three states:

- `tracked`: totals, the current browser profile's visitor number, approximate current region, and visitor-local time are available;
- `aggregate`: totals and country markers are available, but current-visitor details are not;
- `unavailable`: neither request succeeded, so the UI displays `Unavailable` and never invents counts or locations.

The response fields consumed by the UI are `ok`, `foundedAt`, `uniqueVisitors`, `countriesReached`, `currentVisitorNumber`, `currentVisitor`, and `countries`. A successful POST returns `currentVisitor.lat`, `currentVisitor.lng`, `currentVisitor.timezone`, and `accuracy: "region"`. The GET endpoint deliberately returns no current-visitor context. `countriesReached` counts every reached country, while the public `countries` marker list includes only countries with at least three unique visitors.

## Privacy model

The browser stores a random local pseudonymous ID under `csma_visitor_id` and sends only that ID in the request body. The Worker combines the local ID with the User-Agent and a private `VISITOR_HASH_SALT`, then stores the resulting SHA-256 hash. A visitor number is stable while that browser ID and User-Agent remain unchanged; clearing site storage or changing the User-Agent can create a new pseudonymous profile. The D1 schema still contains a legacy `city` column, but new tracking writes clear it; the active API contract returns country, administrative region, coarse coordinates, and timezone instead of a city label.

The implementation does not store the full IP address, but the retained hash and geolocation fields must still be treated as pseudonymous data rather than fully anonymous data. New coordinates are rounded to the nearest half degree before storage and the active visitor's own display. Each country keeps one representative point rather than following the latest visit. Public aggregate markers require at least three unique visitors and are rounded again to a two-degree grid. The interface labels the result as approximate. The repository does not currently define a retention period. Data minimization, retention, and deletion policy require an explicit human decision before any schema migration. Never log, publish, commit, or expose `VISITOR_HASH_SALT`. Do not put it in `.env.production`, `.env.local`, a `VITE_` variable, GitHub Actions Variables, or documentation.

## CORS

The Worker code permits these safe defaults:

```text
https://csma-research-group.github.io
http://localhost:<non-privileged-port>
http://127.0.0.1:<non-privileged-port>
http://[::1]:<non-privileged-port>
```

`ALLOWED_ORIGIN` in `wrangler.toml` can add comma-separated origins. The official site plus HTTP loopback development origins (`localhost`, `127.0.0.1`, and `[::1]` on non-privileged ports) are accepted so Vite remains usable when its preferred port is occupied. Other browser origins are rejected. `workers/visitor-stats/wrangler.toml.example` documents the expected production configuration; the real `wrangler.toml` is ignored because it contains deployment-specific identifiers.

Changes to Worker source do not affect the deployed endpoint until a human reviews and deploys them. Before deployment, test an OPTIONS request from the official origin and confirm that `Access-Control-Allow-Origin` matches it.

### All counters show `Unavailable`

Test both the data path and the browser CORS path. If a GET without an `Origin` header returns real D1 counts, but the same GET with the official site origin omits `Access-Control-Allow-Origin` or the OPTIONS preflight returns `403`, the database is healthy and the deployed Worker/CORS version is stale. A Pages rebuild cannot fix that state; deploy the reviewed Worker separately, then repeat both official-origin checks. A successful v2 deployment returns `apiVersion: 2`.

## Canonical established time

The public established time is:

```text
2026-05-19 05:19
```

It is present in `src/data/visitorStats.js`, the Worker default, and D1 schema. The UI deliberately uses the canonical frontend value so an unexpected API value cannot silently change the public timeline.

## Globe rendering and performance

`src/components/GlobalVisitorsGlobe.vue` uses a Canvas globe with the local Blue Marble texture at `public/textures/earth-blue-marble.jpg`.

The component:

- uses one guarded requestAnimationFrame scheduler capped at 20 fps;
- caps texture rasterization density and reuses row-level projection work;
- reuses its pixel frame buffer;
- pauses when outside the viewport or when the document is hidden;
- defers texture decoding until near the viewport;
- renders a static frame for reduced-motion users;
- disconnects ResizeObserver/IntersectionObserver and listeners on unmount;
- clamps pointer tooltips within the canvas;
- draws aggregate country markers and a separate high-contrast current-visitor marker;
- initially turns the current visitor's region toward the viewer, then keeps the marker attached while the globe rotates;
- formats the clock with the Worker-provided IANA timezone, falling back to the browser's device timezone when necessary.

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
6. confirm no secret or full IP value appears in source, logs, or the frontend bundle;
7. confirm a successful tracked visit returns a positive current visitor number plus coarse `lat`, `lng`, and `timezone` values;
8. confirm the orange `YOU` marker and the visible local-time label agree with the returned region and timezone.

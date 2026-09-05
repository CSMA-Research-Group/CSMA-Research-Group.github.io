# CSMA Visitor Stats Worker

Cloudflare Worker + D1 backend for anonymous visitor statistics used by the footer globe.

## API

- `POST /api/visitor/track`: records one visit and returns the latest aggregate stats.
- `GET /api/visitor/stats`: returns aggregate stats without increasing visit counts.

The frontend calls `POST /api/visitor/track` with only its browser-local pseudonymous ID:

```json
{
  "visitorId": "browser-local-anonymous-id"
}
```

The response shape is:

```json
{
  "ok": true,
  "apiVersion": 2,
  "foundedAt": "2026-05-19 05:19",
  "totalVisits": 123,
  "uniqueVisitors": 45,
  "countriesReached": 8,
  "currentVisitorNumber": 45,
  "currentVisitor": {
    "countryCode": "SG",
    "countryName": "Singapore",
    "region": "Singapore",
    "lat": 1.5,
    "lng": 104,
    "timezone": "Asia/Singapore",
    "accuracy": "region"
  },
  "countries": [
    {
      "countryCode": "SG",
      "countryName": "Singapore",
      "lat": 2,
      "lng": 104,
      "visits": 20,
      "uniqueVisitors": 5
    }
  ]
}
```

## Privacy

This backend does not store full IP addresses or precise personal identity. The browser stores an anonymous `visitorId` in `localStorage` under `csma_visitor_id`; the Worker combines that ID with the User-Agent and `VISITOR_HASH_SALT`, then stores only the SHA-256 `visitor_hash`. The visitor number remains stable while that local ID and User-Agent remain unchanged. Cloudflare GeoIP data is used for country/region statistics and map markers. New coordinates are rounded to the nearest half degree before storage and the active visitor's own response. Each country keeps one representative point rather than following the latest visit. Public country markers appear only after three unique visitors and are rounded to a two-degree grid, so sparse country data does not expose an individual visitor's regional point.

## Setup

Install Wrangler if needed:

```bash
npm install --save-dev wrangler
```

Create the D1 database:

```bash
npx wrangler d1 create csma-visitor-stats
```

Copy the example config and paste the returned `database_id`:

```bash
cp wrangler.toml.example wrangler.toml
```

Apply the schema:

```bash
npx wrangler d1 execute csma-visitor-stats --remote --file=./schema.sql
```

Set the hash salt as a Worker secret:

```bash
npx wrangler secret put VISITOR_HASH_SALT
```

For production CORS, set `ALLOWED_ORIGIN` in `wrangler.toml`:

```toml
[vars]
ALLOWED_ORIGIN = "https://csma-research-group.github.io"
```

The Worker code includes the official GitHub Pages origin and HTTP loopback development origins (`localhost`, `127.0.0.1`, and `[::1]` on non-privileged ports) as safe defaults. This keeps Vite working when its preferred port is occupied. `ALLOWED_ORIGIN` can add permitted origins without removing those defaults. Requests carrying any other browser `Origin` are rejected.

## Local Worker Testing

From this directory:

```bash
npx wrangler dev
```

In another terminal:

```bash
curl -X POST http://localhost:8787/api/visitor/track \
  -H 'Content-Type: application/json' \
  -d '{"visitorId":"local-test"}'
```

## Deploy

From this directory:

```bash
npx wrangler secret list
npx wrangler deploy
```

Confirm that the secret list contains `VISITOR_HASH_SALT` before deployment. Do not print or rotate its value as part of a routine code deploy.

The GitHub Pages workflow deploys only the Vue frontend; it does not deploy this Worker. After changing Worker code or CORS configuration, deploy the Worker separately and verify the public endpoint before publishing the frontend.

Read-only production checks:

```bash
curl -i -X OPTIONS https://your-worker-name.your-subdomain.workers.dev/api/visitor/track \
  -H 'Origin: https://csma-research-group.github.io' \
  -H 'Access-Control-Request-Method: POST' \
  -H 'Access-Control-Request-Headers: content-type'

curl -i https://your-worker-name.your-subdomain.workers.dev/api/visitor/stats \
  -H 'Origin: https://csma-research-group.github.io'
```

Both responses must include `Access-Control-Allow-Origin: https://csma-research-group.github.io`; the preflight must return `204`, and the GET payload must include `"apiVersion": 2`.

After deployment, set the frontend environment variable:

```bash
VITE_VISITOR_API_BASE=https://your-worker-name.your-subdomain.workers.dev
```

Deployment and remote schema commands mutate external state. Run them only after reviewing the diff, confirming the D1 target, and checking the production origin. The website maintenance workflow does not deploy the Worker automatically.

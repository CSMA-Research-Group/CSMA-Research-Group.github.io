# CSMA Visitor Stats Worker

Cloudflare Worker + D1 backend for anonymous visitor statistics used by the footer globe.

## API

- `POST /api/visitor/track`: records one visit and returns the latest aggregate stats.
- `GET /api/visitor/stats`: returns aggregate stats without increasing visit counts.

The frontend calls `POST /api/visitor/track` with:

```json
{
  "visitorId": "browser-local-anonymous-id",
  "path": "/",
  "referrer": ""
}
```

The response shape is:

```json
{
  "ok": true,
  "foundedAt": "2026-05-19 05:19",
  "totalVisits": 123,
  "uniqueVisitors": 45,
  "countriesReached": 8,
  "currentVisitorNumber": 45,
  "currentVisitor": {
    "countryCode": "SG",
    "countryName": "Singapore",
    "city": "Singapore",
    "region": "Singapore"
  },
  "countries": [
    {
      "countryCode": "SG",
      "countryName": "Singapore",
      "lat": 1.3521,
      "lng": 103.8198,
      "visits": 20,
      "uniqueVisitors": 5
    }
  ]
}
```

## Privacy

This backend does not store full IP addresses or precise personal identity. The browser stores an anonymous `visitorId` in `localStorage` under `csma_visitor_id`; the Worker combines that ID with the User-Agent and `VISITOR_HASH_SALT`, then stores only the SHA-256 `visitor_hash`. Cloudflare GeoIP data is used for aggregate country/region/city statistics and map markers.

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

If `ALLOWED_ORIGIN` is not configured, local development origins `http://localhost:5173` and `http://localhost:4173` are allowed.

## Local Worker Testing

From this directory:

```bash
npx wrangler dev
```

In another terminal:

```bash
curl -X POST http://localhost:8787/api/visitor/track \
  -H 'Content-Type: application/json' \
  -d '{"visitorId":"local-test","path":"/","referrer":""}'
```

## Deploy

From this directory:

```bash
npx wrangler deploy
```

After deployment, set the frontend environment variable:

```bash
VITE_VISITOR_API_BASE=https://your-worker-name.your-subdomain.workers.dev
```

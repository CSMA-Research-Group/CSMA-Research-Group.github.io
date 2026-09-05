const DEFAULT_ALLOWED_ORIGINS = new Set([
  'https://csma-research-group.github.io',
  'http://localhost:5173',
  'http://localhost:4173',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:4173',
])

const DEFAULT_FOUNDED_AT = '2026-05-19 05:19'
const PUBLIC_COUNTRY_MARKER_MIN_VISITORS = 3
const PUBLIC_COUNTRY_COORDINATE_STEP = 2
const LOCAL_DEVELOPMENT_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]'])
let trackingSchemaReady = false

const jsonResponse = (request, env, payload, status = 200) => {
  const headers = new Headers(corsHeaders(request, env))
  headers.set('Content-Type', 'application/json; charset=utf-8')
  headers.set('Cache-Control', 'no-store')

  return new Response(JSON.stringify(payload), {
    status,
    headers,
  })
}

const corsHeaders = (request, env) => {
  const headers = new Headers({
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  })

  const allowedOrigin = resolveAllowedOrigin(request, env)
  if (allowedOrigin) headers.set('Access-Control-Allow-Origin', allowedOrigin)

  return headers
}

const resolveAllowedOrigin = (request, env) => {
  const origin = request.headers.get('Origin')
  if (!origin) return '*'

  const configuredOrigins = String(env.ALLOWED_ORIGIN || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  if (configuredOrigins.includes('*')) return '*'
  if (
    configuredOrigins.includes(origin)
    || DEFAULT_ALLOWED_ORIGINS.has(origin)
    || isLocalDevelopmentOrigin(origin)
  ) return origin

  return ''
}

const isLocalDevelopmentOrigin = (origin) => {
  try {
    const url = new URL(origin)
    const port = Number(url.port)
    return url.protocol === 'http:'
      && LOCAL_DEVELOPMENT_HOSTS.has(url.hostname)
      && Number.isInteger(port)
      && port >= 1024
      && port <= 65535
  } catch {
    return false
  }
}

const handleOptions = (request, env) => {
  const headers = corsHeaders(request, env)
  return new Response(null, {
    status: headers.has('Access-Control-Allow-Origin') ? 204 : 403,
    headers,
  })
}

const sanitizeText = (value, maxLength = 512) => (
  typeof value === 'string' ? value.slice(0, maxLength) : ''
)

const sanitizeCountryCode = (value) => {
  const code = sanitizeText(value, 2).toUpperCase()
  return /^[A-Z]{2}$/.test(code) ? code : 'XX'
}

const toFiniteCoordinate = (value, min, max) => {
  if (value === null || value === undefined) return null
  if (typeof value === 'boolean') return null
  if (typeof value === 'string' && !value.trim()) return null
  const number = Number(value)
  return Number.isFinite(number) && number >= min && number <= max ? number : null
}

const toApproximateCoordinate = (value, min, max) => {
  const coordinate = toFiniteCoordinate(value, min, max)
  return coordinate === null ? null : Math.round(coordinate * 2) / 2
}

const toPublicCountryCoordinate = (value, min, max) => {
  const coordinate = toFiniteCoordinate(value, min, max)
  return coordinate === null
    ? null
    : Math.round(coordinate / PUBLIC_COUNTRY_COORDINATE_STEP) * PUBLIC_COUNTRY_COORDINATE_STEP
}

const sanitizeTimeZone = (value) => {
  const timeZone = sanitizeText(value, 128)
  if (!timeZone) return ''

  try {
    new Intl.DateTimeFormat('en', { timeZone }).format()
    return timeZone
  } catch {
    return ''
  }
}

const toInteger = (value) => {
  const number = Number(value)
  return Number.isFinite(number) ? Math.trunc(number) : 0
}

const countryNameFor = (countryCode) => {
  if (countryCode === 'XX') return 'Unknown'

  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode) || countryCode
  } catch {
    return countryCode
  }
}

const getGeo = (request) => {
  const cf = request.cf || {}
  const countryCode = sanitizeCountryCode(cf.country)
  const latitude = toApproximateCoordinate(cf.latitude, -90, 90)
  const longitude = toApproximateCoordinate(cf.longitude, -180, 180)
  const hasCoordinatePair = latitude !== null && longitude !== null

  return {
    countryCode,
    countryName: countryNameFor(countryCode),
    region: sanitizeText(cf.region || cf.regionCode || '', 128),
    // Keep the legacy schema column blank; city-level labels are unnecessary
    // for a regional, privacy-aware visualization.
    city: '',
    // Cloudflare's IP-derived coordinates are intentionally rounded to a
    // coarse regional location before they are stored or returned.
    latitude: hasCoordinatePair ? latitude : null,
    longitude: hasCoordinatePair ? longitude : null,
    timezone: sanitizeTimeZone(cf.timezone),
  }
}

const hashVisitor = async (visitorId, userAgent, salt) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(`${salt}:${visitorId}:${userAgent}`)
  const digest = await crypto.subtle.digest('SHA-256', data)

  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

const ensureGlobalStats = async (db) => {
  if (trackingSchemaReady) return

  await db.batch([
    db.prepare("INSERT OR IGNORE INTO global_stats (key, value) VALUES ('total_visits', '0')"),
    db.prepare("INSERT OR IGNORE INTO global_stats (key, value) VALUES ('unique_visitors', '0')"),
    db.prepare("INSERT OR IGNORE INTO global_stats (key, value) VALUES ('visitor_sequence', '0')"),
    db.prepare("INSERT OR IGNORE INTO global_stats (key, value) VALUES ('founded_at', ?)").bind(DEFAULT_FOUNDED_AT),
  ])

  trackingSchemaReady = true
}

const incrementGlobalStat = async (db, key) => {
  const row = await db
    .prepare(`
      UPDATE global_stats
      SET value = CAST(CAST(value AS INTEGER) + 1 AS TEXT)
      WHERE key = ?
      RETURNING value
    `)
    .bind(key)
    .first()

  return toInteger(row?.value)
}

const upsertCountryVisit = async (db, geo, now, isNewVisitor) => {
  const uniqueIncrement = isNewVisitor ? 1 : 0

  await db
    .prepare(`
      INSERT INTO country_stats (
        country_code,
        country_name,
        latitude,
        longitude,
        visit_count,
        unique_visitors,
        last_seen
      )
      VALUES (?, ?, ?, ?, 1, ?, ?)
      ON CONFLICT(country_code) DO UPDATE SET
        country_name = excluded.country_name,
        -- A country has one stable representative point. Do not continuously
        -- replace it with the latest visitor's regional coordinates.
        latitude = COALESCE(country_stats.latitude, excluded.latitude),
        longitude = COALESCE(country_stats.longitude, excluded.longitude),
        visit_count = country_stats.visit_count + 1,
        unique_visitors = country_stats.unique_visitors + ?,
        last_seen = excluded.last_seen
    `)
    .bind(
      geo.countryCode,
      geo.countryName,
      geo.latitude,
      geo.longitude,
      uniqueIncrement,
      now,
      uniqueIncrement
    )
    .run()
}

const assignVisitorNumber = async (db, visitorHash) => {
  const nextNumber = await incrementGlobalStat(db, 'visitor_sequence')
  const assignment = await db
    .prepare(`
      UPDATE visitors
      SET visitor_number = ?
      WHERE visitor_hash = ? AND visitor_number IS NULL
    `)
    .bind(nextNumber, visitorHash)
    .run()

  if (assignment.meta?.changes) return nextNumber

  const visitor = await db
    .prepare('SELECT visitor_number FROM visitors WHERE visitor_hash = ?')
    .bind(visitorHash)
    .first()

  return toInteger(visitor?.visitor_number) || null
}

const readRequestBody = async (request) => {
  try {
    return await request.json()
  } catch {
    return {}
  }
}

const handleTrack = async (request, env) => {
  if (!env.DB) {
    return jsonResponse(request, env, { ok: false, error: 'D1 database is not configured.' }, 500)
  }

  if (!env.VISITOR_HASH_SALT) {
    return jsonResponse(request, env, { ok: false, error: 'Visitor statistics unavailable.' }, 500)
  }

  await ensureGlobalStats(env.DB)

  const body = await readRequestBody(request)
  const visitorId = sanitizeText(body.visitorId, 256)

  if (!visitorId) {
    return jsonResponse(request, env, { ok: false, error: 'visitorId is required.' }, 400)
  }

  const now = new Date().toISOString()
  const userAgent = sanitizeText(request.headers.get('User-Agent') || '', 512)
  const visitorHash = await hashVisitor(visitorId, userAgent, env.VISITOR_HASH_SALT)
  const geo = getGeo(request)

  await incrementGlobalStat(env.DB, 'total_visits')

  const insertResult = await env.DB
    .prepare(`
      INSERT OR IGNORE INTO visitors (
        visitor_hash,
        country_code,
        country_name,
        region,
        city,
        latitude,
        longitude,
        first_seen,
        last_seen,
        visit_count,
        visitor_number
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, NULL)
    `)
    .bind(
      visitorHash,
      geo.countryCode,
      geo.countryName,
      geo.region,
      geo.city,
      geo.latitude,
      geo.longitude,
      now,
      now
    )
    .run()

  const isNewVisitor = Boolean(insertResult.meta?.changes)
  let visitorNumber = null

  if (isNewVisitor) {
    visitorNumber = await assignVisitorNumber(env.DB, visitorHash)
  } else {
    const visitor = await env.DB
      .prepare('SELECT visitor_number FROM visitors WHERE visitor_hash = ?')
      .bind(visitorHash)
      .first()

    visitorNumber = toInteger(visitor?.visitor_number) || null

    if (!visitorNumber) {
      visitorNumber = await assignVisitorNumber(env.DB, visitorHash)
    }

    await env.DB
      .prepare(`
        UPDATE visitors
        SET
          country_code = ?,
          country_name = ?,
          region = ?,
          city = ?,
          latitude = ?,
          longitude = ?,
          last_seen = ?,
          visit_count = visit_count + 1
        WHERE visitor_hash = ?
      `)
      .bind(
        geo.countryCode,
        geo.countryName,
        geo.region,
        geo.city,
        geo.latitude,
        geo.longitude,
        now,
        visitorHash
      )
      .run()
  }

  await upsertCountryVisit(env.DB, geo, now, isNewVisitor)

  return jsonResponse(request, env, await readStats(env.DB, {
    currentVisitorNumber: visitorNumber,
    currentVisitor: {
      countryCode: geo.countryCode,
      countryName: geo.countryName,
      region: geo.region,
      lat: geo.latitude,
      lng: geo.longitude,
      timezone: geo.timezone,
      accuracy: geo.latitude !== null && geo.longitude !== null ? 'region' : null,
    },
  }))
}

const readGlobalStats = async (db) => {
  const rows = await db.prepare('SELECT key, value FROM global_stats').all()
  const stats = {}

  for (const row of rows.results || []) {
    stats[row.key] = row.value
  }

  return stats
}

const readCountries = async (db) => {
  const rows = await db
    .prepare(`
      SELECT
        country_code AS countryCode,
        country_name AS countryName,
        latitude AS lat,
        longitude AS lng,
        visit_count AS visits,
        unique_visitors AS uniqueVisitors
      FROM country_stats
      WHERE
        country_code <> 'XX'
        AND unique_visitors >= ?
        AND latitude IS NOT NULL
        AND longitude IS NOT NULL
      ORDER BY unique_visitors DESC, visit_count DESC, country_name ASC
      LIMIT 80
    `)
    .bind(PUBLIC_COUNTRY_MARKER_MIN_VISITORS)
    .all()

  return (rows.results || []).map((row) => ({
    countryCode: row.countryCode,
    countryName: row.countryName,
    // Public country markers require a small cohort and use a broader grid;
    // the active visitor's own coarse marker is returned only to that POST.
    lat: toPublicCountryCoordinate(row.lat, -90, 90),
    lng: toPublicCountryCoordinate(row.lng, -180, 180),
    visits: toInteger(row.visits),
    uniqueVisitors: toInteger(row.uniqueVisitors),
  }))
}

const readCountriesReached = async (db) => {
  const row = await db
    .prepare(`
      SELECT COUNT(*) AS count
      FROM country_stats
      WHERE country_code <> 'XX' AND visit_count > 0
    `)
    .first()

  return toInteger(row?.count)
}

const readUniqueVisitors = async (db) => {
  const row = await db
    .prepare('SELECT COUNT(*) AS count FROM visitors')
    .first()

  return toInteger(row?.count)
}

const readStats = async (db, context = {}) => {
  const [globalStats, uniqueVisitors, countries, countriesReached] = await Promise.all([
    readGlobalStats(db),
    readUniqueVisitors(db),
    readCountries(db),
    readCountriesReached(db),
  ])

  return {
    ok: true,
    apiVersion: 2,
    foundedAt: globalStats.founded_at || DEFAULT_FOUNDED_AT,
    totalVisits: toInteger(globalStats.total_visits),
    uniqueVisitors,
    countriesReached,
    currentVisitorNumber: context.currentVisitorNumber ?? null,
    currentVisitor: context.currentVisitor || null,
    countries,
  }
}

const handleStats = async (request, env) => {
  if (!env.DB) {
    return jsonResponse(request, env, { ok: false, error: 'D1 database is not configured.' }, 500)
  }

  return jsonResponse(request, env, await readStats(env.DB))
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return handleOptions(request, env)

    const requestOrigin = request.headers.get('Origin')
    if (requestOrigin && !resolveAllowedOrigin(request, env)) {
      return jsonResponse(request, env, { ok: false, error: 'Origin not allowed.' }, 403)
    }

    const url = new URL(request.url)

    try {
      if (url.pathname === '/api/visitor/track' && request.method === 'POST') {
        return await handleTrack(request, env)
      }

      if (url.pathname === '/api/visitor/stats' && request.method === 'GET') {
        return await handleStats(request, env)
      }

      return jsonResponse(request, env, { ok: false, error: 'Not found.' }, 404)
    } catch (error) {
      return jsonResponse(request, env, {
        ok: false,
        error: 'Visitor statistics unavailable.',
      }, 500)
    }
  },
}

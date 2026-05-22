const LOCAL_ALLOWED_ORIGINS = new Set([
  'http://localhost:5173',
  'http://localhost:4173',
])

const DEFAULT_FOUNDED_AT = '2026-05-19 05:19'

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
  if (configuredOrigins.includes(origin)) return origin
  if (!configuredOrigins.length && LOCAL_ALLOWED_ORIGINS.has(origin)) return origin

  return ''
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
  const number = Number(value)
  return Number.isFinite(number) && number >= min && number <= max ? number : null
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

  return {
    countryCode,
    countryName: countryNameFor(countryCode),
    region: sanitizeText(cf.region || cf.regionCode || '', 128),
    city: sanitizeText(cf.city || '', 128),
    latitude: toFiniteCoordinate(cf.latitude, -90, 90),
    longitude: toFiniteCoordinate(cf.longitude, -180, 180),
    timezone: sanitizeText(cf.timezone || '', 128),
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
  await db.batch([
    db.prepare("INSERT OR IGNORE INTO global_stats (key, value) VALUES ('total_visits', '0')"),
    db.prepare("INSERT OR IGNORE INTO global_stats (key, value) VALUES ('unique_visitors', '0')"),
    db.prepare("INSERT OR IGNORE INTO global_stats (key, value) VALUES ('visitor_sequence', '0')"),
    db.prepare("INSERT OR IGNORE INTO global_stats (key, value) VALUES ('founded_at', ?)").bind(DEFAULT_FOUNDED_AT),
  ])
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
        latitude = COALESCE(excluded.latitude, country_stats.latitude),
        longitude = COALESCE(excluded.longitude, country_stats.longitude),
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
  const path = sanitizeText(body.path, 2048)
  const referrer = sanitizeText(body.referrer, 2048)

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
    visitorNumber = await incrementGlobalStat(env.DB, 'visitor_sequence')
    await incrementGlobalStat(env.DB, 'unique_visitors')
    await env.DB
      .prepare('UPDATE visitors SET visitor_number = ? WHERE visitor_hash = ?')
      .bind(visitorNumber, visitorHash)
      .run()
  } else {
    const visitor = await env.DB
      .prepare('SELECT visitor_number FROM visitors WHERE visitor_hash = ?')
      .bind(visitorHash)
      .first()

    visitorNumber = toInteger(visitor?.visitor_number) || null

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
      city: geo.city,
      region: geo.region,
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
        AND unique_visitors > 0
        AND latitude IS NOT NULL
        AND longitude IS NOT NULL
      ORDER BY unique_visitors DESC, visit_count DESC, country_name ASC
      LIMIT 80
    `)
    .all()

  return (rows.results || []).map((row) => ({
    countryCode: row.countryCode,
    countryName: row.countryName,
    lat: Number(row.lat),
    lng: Number(row.lng),
    visits: toInteger(row.visits),
    uniqueVisitors: toInteger(row.uniqueVisitors),
  }))
}

const readCountriesReached = async (db) => {
  const row = await db
    .prepare(`
      SELECT COUNT(*) AS count
      FROM country_stats
      WHERE country_code <> 'XX' AND unique_visitors > 0
    `)
    .first()

  return toInteger(row?.count)
}

const readStats = async (db, context = {}) => {
  const [globalStats, countries, countriesReached] = await Promise.all([
    readGlobalStats(db),
    readCountries(db),
    readCountriesReached(db),
  ])

  return {
    ok: true,
    foundedAt: globalStats.founded_at || DEFAULT_FOUNDED_AT,
    totalVisits: toInteger(globalStats.total_visits),
    uniqueVisitors: toInteger(globalStats.unique_visitors),
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

  await ensureGlobalStats(env.DB)

  return jsonResponse(request, env, await readStats(env.DB))
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return handleOptions(request, env)

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

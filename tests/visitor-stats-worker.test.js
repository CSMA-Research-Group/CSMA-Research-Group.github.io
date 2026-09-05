import assert from 'node:assert/strict'
import test from 'node:test'
import visitorWorker from '../workers/visitor-stats/src/index.js'

const OFFICIAL_ORIGIN = 'https://csma-research-group.github.io'
const API_URL = 'https://visitor.example/api/visitor'

class FakeStatement {
  constructor(database, sql) {
    this.database = database
    this.sql = sql
    this.normalizedSql = sql.replace(/\s+/g, ' ').trim()
    this.values = []
  }

  bind(...values) {
    this.values = values
    return this
  }

  async run() {
    if (this.normalizedSql.includes('INSERT OR IGNORE INTO visitors')) {
      const [visitorHash, countryCode, countryName, region, city, latitude, longitude] = this.values
      if (this.database.visitors.has(visitorHash)) return { meta: { changes: 0 } }

      this.database.visitors.set(visitorHash, {
        visitorHash,
        countryCode,
        countryName,
        region,
        city,
        latitude,
        longitude,
        visitorNumber: null,
      })
      return { meta: { changes: 1 } }
    }

    if (this.normalizedSql.includes('UPDATE visitors SET visitor_number')) {
      const [visitorNumber, visitorHash] = this.values
      const visitor = this.database.visitors.get(visitorHash)
      if (!visitor || visitor.visitorNumber !== null) return { meta: { changes: 0 } }
      visitor.visitorNumber = visitorNumber
      return { meta: { changes: 1 } }
    }

    if (this.normalizedSql.includes('INSERT INTO country_stats')) {
      const [countryCode, countryName, latitude, longitude, uniqueIncrement] = this.values
      const existing = this.database.countries.get(countryCode)
      this.database.countries.set(countryCode, {
        countryCode,
        countryName,
        lat: existing?.lat ?? latitude,
        lng: existing?.lng ?? longitude,
        visits: (existing?.visits || 0) + 1,
        uniqueVisitors: (existing?.uniqueVisitors || 0) + uniqueIncrement,
      })
      return { meta: { changes: 1 } }
    }

    return { meta: { changes: 0 } }
  }

  async first() {
    if (this.normalizedSql.includes('UPDATE global_stats')) {
      const key = this.values[0]
      const nextValue = Number(this.database.globalStats.get(key) || 0) + 1
      this.database.globalStats.set(key, String(nextValue))
      return { value: String(nextValue) }
    }

    if (this.normalizedSql.includes('SELECT visitor_number FROM visitors')) {
      const visitor = this.database.visitors.get(this.values[0])
      return visitor ? { visitor_number: visitor.visitorNumber } : null
    }

    if (this.normalizedSql.includes('COUNT(*) AS count FROM visitors')) {
      return { count: this.database.visitors.size }
    }

    if (this.normalizedSql.includes('COUNT(*) AS count')) {
      const count = [...this.database.countries.values()]
        .filter((country) => country.countryCode !== 'XX' && country.visits > 0)
        .length
      return { count }
    }

    return null
  }

  async all() {
    if (this.normalizedSql.includes('FROM global_stats')) {
      return {
        results: [...this.database.globalStats].map(([key, value]) => ({ key, value })),
      }
    }

    if (this.normalizedSql.includes('FROM country_stats')) {
      const minimumVisitors = Number(this.values[0] || 0)
      return {
        results: [...this.database.countries.values()]
          .filter((country) => (
            country.countryCode !== 'XX'
            && country.uniqueVisitors >= minimumVisitors
            && country.lat !== null
            && country.lng !== null
          )),
      }
    }

    return { results: [] }
  }
}

class FakeD1 {
  constructor() {
    this.globalStats = new Map([
      ['total_visits', '0'],
      ['unique_visitors', '0'],
      ['visitor_sequence', '0'],
      ['founded_at', '2026-05-19 05:19'],
    ])
    this.visitors = new Map()
    this.countries = new Map()
  }

  prepare(sql) {
    return new FakeStatement(this, sql)
  }

  async batch() {
    return []
  }
}

const requestWithOrigin = (path, options = {}) => new Request(`${API_URL}${path}`, {
  ...options,
  headers: {
    Origin: OFFICIAL_ORIGIN,
    ...(options.headers || {}),
  },
})

const trackingRequest = (visitorId, cf = {}) => {
  const request = requestWithOrigin('/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'User-Agent': 'worker-test' },
    body: JSON.stringify({ visitorId }),
  })
  Object.defineProperty(request, 'cf', { value: cf })
  return request
}

test('official origin receives a successful CORS preflight', async () => {
  const request = requestWithOrigin('/track', {
    method: 'OPTIONS',
    headers: {
      'Access-Control-Request-Method': 'POST',
      'Access-Control-Request-Headers': 'content-type',
    },
  })
  const response = await visitorWorker.fetch(request, {})

  assert.equal(response.status, 204)
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), OFFICIAL_ORIGIN)
})

test('unknown browser origins are rejected', async () => {
  const request = new Request(`${API_URL}/stats`, {
    headers: { Origin: 'https://untrusted.example' },
  })
  const response = await visitorWorker.fetch(request, { DB: new FakeD1() })

  assert.equal(response.status, 403)
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), null)
})

test('Vite loopback origins remain usable when the preferred port is occupied', async () => {
  for (const origin of ['http://localhost:5175', 'http://127.0.0.1:5188']) {
    const request = new Request(`${API_URL}/track`, {
      method: 'OPTIONS',
      headers: {
        Origin: origin,
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'content-type',
      },
    })
    const response = await visitorWorker.fetch(request, {})

    assert.equal(response.status, 204)
    assert.equal(response.headers.get('Access-Control-Allow-Origin'), origin)
  }
})

test('official-origin aggregate reads expose CORS without current-visitor data', async () => {
  const database = new FakeD1()
  database.countries.set('US', {
    countryCode: 'US',
    countryName: 'United States',
    lat: 34.0614,
    lng: -118.2385,
    visits: 9,
    uniqueVisitors: 8,
  })

  const response = await visitorWorker.fetch(
    requestWithOrigin('/stats'),
    { DB: database }
  )
  const payload = await response.json()

  assert.equal(response.status, 200)
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), OFFICIAL_ORIGIN)
  assert.equal(payload.currentVisitorNumber, null)
  assert.equal(payload.currentVisitor, null)
  assert.equal(payload.countries[0].lat, 34)
  assert.equal(payload.countries[0].lng, -118)
})

test('tracking returns a stable visitor number, coarse region, and local timezone', async () => {
  const database = new FakeD1()
  const createRequest = () => trackingRequest('browser-test-id', {
    country: 'CN',
    region: 'Chongqing',
    city: 'Chongqing',
    latitude: '29.5637',
    longitude: '106.5504',
    timezone: 'Asia/Shanghai',
  })

  const env = { DB: database, VISITOR_HASH_SALT: 'test-only-salt' }
  const firstResponse = await visitorWorker.fetch(createRequest(), env)
  const firstPayload = await firstResponse.json()
  const repeatResponse = await visitorWorker.fetch(createRequest(), env)
  const repeatPayload = await repeatResponse.json()

  assert.equal(firstResponse.status, 200)
  assert.equal(firstResponse.headers.get('Access-Control-Allow-Origin'), OFFICIAL_ORIGIN)
  assert.equal(firstPayload.currentVisitorNumber, 1)
  assert.equal(repeatPayload.currentVisitorNumber, 1)
  assert.equal(repeatPayload.uniqueVisitors, 1)
  assert.equal(repeatPayload.totalVisits, 2)
  assert.deepEqual(repeatPayload.countries, [])
  assert.deepEqual(firstPayload.currentVisitor, {
    countryCode: 'CN',
    countryName: 'China',
    region: 'Chongqing',
    lat: 29.5,
    lng: 106.5,
    timezone: 'Asia/Shanghai',
    accuracy: 'region',
  })
})

test('incomplete or invalid coordinates never create a current visitor marker', async () => {
  const database = new FakeD1()
  const response = await visitorWorker.fetch(
    trackingRequest('coordinate-test-id', {
      country: 'CN',
      region: 'Hubei',
      latitude: false,
      longitude: '114.3',
      timezone: 'Not/A_Timezone',
    }),
    { DB: database, VISITOR_HASH_SALT: 'test-only-salt' }
  )
  const payload = await response.json()

  assert.equal(response.status, 200)
  assert.equal(payload.currentVisitor.lat, null)
  assert.equal(payload.currentVisitor.lng, null)
  assert.equal(payload.currentVisitor.timezone, '')
  assert.equal(payload.currentVisitor.accuracy, null)
})

test('country markers require three visitors and keep one coarse representative point', async () => {
  const database = new FakeD1()
  const env = { DB: database, VISITOR_HASH_SALT: 'test-only-salt' }
  const locations = [
    { visitorId: 'sg-1', latitude: '1.10', longitude: '103.80' },
    { visitorId: 'sg-2', latitude: '1.40', longitude: '104.10' },
    { visitorId: 'sg-3', latitude: '1.20', longitude: '103.90' },
  ]

  for (const [index, location] of locations.entries()) {
    const response = await visitorWorker.fetch(
      trackingRequest(location.visitorId, {
        country: 'SG',
        region: 'Singapore',
        latitude: location.latitude,
        longitude: location.longitude,
        timezone: 'Asia/Singapore',
      }),
      env
    )
    const payload = await response.json()
    assert.equal(payload.countries.length, index === 2 ? 1 : 0)
  }

  const statsResponse = await visitorWorker.fetch(requestWithOrigin('/stats'), env)
  const stats = await statsResponse.json()
  assert.equal(stats.countries.length, 1)
  assert.equal(stats.countries[0].uniqueVisitors, 3)
  assert.equal(stats.countries[0].lat, 2)
  assert.equal(stats.countries[0].lng, 104)
})

test('an existing visitor with a missing number is repaired without changing total visitors', async () => {
  const database = new FakeD1()
  const env = { DB: database, VISITOR_HASH_SALT: 'test-only-salt' }
  const createRequest = () => trackingRequest('repair-test-id', {
    country: 'CN',
    region: 'Hubei',
    latitude: '30.5',
    longitude: '114.3',
    timezone: 'Asia/Shanghai',
  })

  await visitorWorker.fetch(createRequest(), env)
  const [visitor] = database.visitors.values()
  visitor.visitorNumber = null

  const response = await visitorWorker.fetch(createRequest(), env)
  const payload = await response.json()

  assert.equal(payload.currentVisitorNumber, 2)
  assert.equal(payload.uniqueVisitors, 1)
  assert.equal(payload.totalVisits, 2)
})

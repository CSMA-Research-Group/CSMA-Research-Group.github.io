<template>
  <section class="global-visitors" aria-labelledby="visitor-globe-title">
    <div class="globe-panel">
      <div class="globe-heading">
        <p class="globe-kicker">Global Visitors</p>
        <h2 id="visitor-globe-title">Research reach, mapped live</h2>
        <p id="visitor-globe-description">
          Privacy-aware regional statistics from visitors to the CSMA website.
        </p>
      </div>

      <div
        ref="wrapRef"
        class="globe-canvas-wrap"
        @pointermove="handlePointerMove"
        @pointerleave="handlePointerLeave"
      >
        <canvas
          ref="canvasRef"
          class="global-globe-canvas"
          role="img"
          :aria-label="globeAriaLabel"
          aria-describedby="visitor-globe-description visitor-marker-summary"
        >Global visitor visualization</canvas>
        <TransitionGroup name="city-clock-swap" tag="div" class="world-clocks" role="group" aria-label="World clocks: four cities rotate every minute">
          <div v-for="clock in worldClocks" :key="clock.id" class="city-clock" :class="`city-clock--${clock.corner}`">
            <span class="city-clock-name">{{ clock.city }}</span>
            <time :datetime="clock.instant" :aria-label="`${clock.city}: ${clock.time}, ${clock.date}, ${clock.offset}`">{{ clock.time }}</time>
            <span class="city-clock-date">{{ clock.date }} <span aria-hidden="true">·</span> {{ clock.offset }}</span>
          </div>
        </TransitionGroup>
        <span ref="localClockRef" class="local-time-chip">
          <small>Your local time</small>
          <strong>{{ visitorTimeLabel }}</strong>
        </span>
        <MeteorNotice v-if="meteorNoticeVisible" @dismiss="meteorNoticeVisible = false" />
        <div
          v-if="tooltip.visible"
          class="globe-tooltip"
          :style="{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }"
          role="status"
        >
          <strong>{{ tooltip.title }}</strong>
          <span>{{ tooltip.detail }}</span>
          <small v-if="tooltip.meta">{{ tooltip.meta }}</small>
        </div>
      </div>
    </div>

    <aside
      class="visitor-stat-panel"
      aria-label="Visitor statistics"
      aria-live="polite"
      :aria-busy="statsStatus === 'loading'"
    >
      <dl>
        <div>
          <dt>Founded</dt>
          <dd>{{ foundedAtLabel }}</dd>
        </div>
        <div>
          <dt>Total Visitors</dt>
          <dd>{{ totalVisitorsLabel }}</dd>
        </div>
        <div>
          <dt>Countries Reached</dt>
          <dd>{{ countriesReachedLabel }}</dd>
        </div>
        <div>
          <dt>Your Visitor No.</dt>
          <dd class="visitor-id">{{ currentVisitorLabel }}</dd>
        </div>
      </dl>
      <div v-if="currentLocationLabel" class="current-visitor-location">
        <span class="current-location-mark" aria-hidden="true"></span>
        <p>
          <strong>Your approximate region</strong>
          <span>{{ currentLocationLabel }}</span>
        </p>
      </div>
      <p id="visitor-marker-summary" class="marker-summary">{{ markerSummaryLabel }}</p>
      <ul v-if="visitorSources.length" class="sr-only" aria-label="Aggregate visitor marker details">
        <li v-for="source in visitorSources" :key="source.countryCode || source.country">
          {{ source.country }}: {{ markerVisitorLabel(source) }}, {{ markerVisitLabel(source) }}.
        </li>
      </ul>
      <p class="analytics-note">{{ analyticsNote }}</p>
    </aside>
  </section>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, reactive, ref } from 'vue'
import MeteorNotice from './MeteorNotice.vue'
import { trackVisitor } from '../services/visitorStats'
import { visitorGlobeInfo } from '../data/visitorStats'
import { worldClockCities, worldClockCorners } from '../data/worldClocks'
import { createCityClockFormatter, createWorldClockRotation, localClockBounds, clampClockPosition, nextClockPosition } from '../utils/globeClocks'
import { getSunPosition, vectorFromLatLng, rotateSunVector, daylightBrightness, createMeteor, meteorFrame, isMeteorVisible } from '../utils/globeSky'
import {
  formatStatCount,
  formatVisitorNumber,
  isValidTimeZone,
  toFiniteCoordinate,
  toFiniteNumber,
} from '../utils/visitorDisplay'

const DEG = Math.PI / 180
const FRAME_INTERVAL = 1000 / 20
const STATS_RETRY_DELAYS = [4000, 12000, 30000]
const foundedAtFallback = visitorGlobeInfo.foundedAt
// Local copy from NASA Earth Observatory, Blue Marble: Next Generation with Topography and Bathymetry.
const EARTH_TEXTURE_URL = `${import.meta.env.BASE_URL}textures/earth-blue-marble.jpg`

const canvasRef = ref(null)
const wrapRef = ref(null)
const localClockRef = ref(null)
const rotateWorldClocks = createWorldClockRotation(worldClockCities, worldClockCorners)
const worldClocks = ref(worldClockCities.slice(0, 4).map((city, index) => ({ ...city, corner: worldClockCorners[index], time: '--:--', date: '', offset: '', instant: undefined })))
const visitorStats = ref(null)
const visitorSources = ref([])
const currentVisitor = ref(null)
const statsStatus = ref('loading')
const visitorTimeLabel = ref('--:--')
const visitorTimeZoneLabel = ref('Local time zone')
const meteorNoticeVisible = ref(false)
const tooltip = reactive({
  visible: false,
  x: 0,
  y: 0,
  title: '',
  detail: '',
  meta: '',
})

let ctx
let width = 0
let height = 0
let centerX = 0
let centerY = 0
let radius = 0
let renderPixelRatio = 1
let animationFrame = 0
let resizeObserver
let intersectionObserver
let motionQuery
let reducedMotion = false
let rotationDegrees = -18
let lastAnimationTime = 0
let lastRenderTime = 0
let isMounted = false
let isGlobeVisible = true
let visibleMarkers = []
let localTimeTimer = 0
let statsRetryTimer = 0
let statsRetryAttempt = 0
let statsRequestInFlight = false
let earthTextureState = 'idle'
let earthTextureData = null
let earthTextureWidth = 0
let earthTextureHeight = 0
let earthFrameCanvas = null
let earthFrameCtx = null
let earthFrameImageData = null
let nightShadeCanvas = null
let nightShadeContext = null
let nightShadeImageData = null
let meteor = null
let nextMeteorAt = 0
let pointerIsActive = false
let pointerX = 0
let pointerY = 0
let clockBounds = null
let clockPosition = null
let clockFlight = null

// Stable decorative stars: no astronomical position or visitor data is implied.
const starField = Array.from({ length: 58 }, (_, index) => ({
  x: (index * 0.61803398875 + 0.17) % 1,
  y: (index * index * 0.07123 + index * 0.131 + 0.23) % 1,
  radius: index % 13 === 0 ? 1.15 : 0.45 + (index % 4) * 0.15,
  phase: index * 2.37,
}))

const placeLocalClock = () => {
  if (!localClockRef.value || !clockPosition) return
  localClockRef.value.style.transform = `translate3d(${clockPosition.x.toFixed(2)}px, ${clockPosition.y.toFixed(2)}px, 0)`
  localClockRef.value.style.visibility = 'visible'
}

const resizeLocalClock = () => {
  const wrap = wrapRef.value
  const chip = localClockRef.value
  if (!wrap || !chip) return
  const corners = [...wrap.querySelectorAll('.city-clock')]
  const cornerHeight = Math.max(0, ...corners.map(clock => clock.offsetHeight))
  clockBounds = localClockBounds(wrap.clientWidth, wrap.clientHeight, chip.offsetWidth, chip.offsetHeight, cornerHeight)
  clockPosition = clampClockPosition(clockPosition || {
    x: (clockBounds.minX + clockBounds.maxX) / 2,
    y: (clockBounds.minY + clockBounds.maxY) / 2,
  }, clockBounds)
  clockFlight = null
  placeLocalClock()
}

const moveLocalClock = (time) => {
  if (!clockBounds || !clockPosition || reducedMotion) return
  if (!clockFlight) {
    clockFlight = {
      from: { ...clockPosition },
      to: nextClockPosition(clockBounds, clockPosition),
      start: time,
      duration: 9000 + Math.random() * 6000,
    }
  }
  const progress = Math.min(1, (time - clockFlight.start) / clockFlight.duration)
  const eased = (1 - Math.cos(Math.PI * progress)) / 2
  clockPosition = {
    x: clockFlight.from.x + (clockFlight.to.x - clockFlight.from.x) * eased,
    y: clockFlight.from.y + (clockFlight.to.y - clockFlight.from.y) * eased,
  }
  placeLocalClock()
  if (progress === 1) clockFlight = null
}

const continents = [
  [
    [-166, 70],
    [-138, 61],
    [-126, 48],
    [-105, 52],
    [-82, 44],
    [-63, 49],
    [-75, 28],
    [-96, 18],
    [-117, 27],
    [-128, 39],
    [-150, 55],
  ],
  [
    [-79, 12],
    [-62, 8],
    [-48, -5],
    [-40, -23],
    [-55, -53],
    [-70, -43],
    [-76, -15],
  ],
  [
    [-18, 35],
    [8, 54],
    [36, 55],
    [70, 52],
    [105, 62],
    [140, 48],
    [126, 28],
    [96, 18],
    [74, 8],
    [44, 28],
    [18, 34],
  ],
  [
    [-17, 32],
    [12, 34],
    [33, 15],
    [28, -33],
    [8, -35],
    [-10, -10],
  ],
  [
    [113, -12],
    [153, -22],
    [145, -43],
    [116, -36],
    [110, -22],
  ],
]

const cityLights = [
  [116.4, 39.9],
  [121.5, 31.2],
  [103.8, 1.35],
  [127, 37.5],
  [139.7, 35.7],
  [77.2, 28.6],
  [2.35, 48.86],
  [-0.1, 51.5],
  [13.4, 52.5],
  [-74, 40.7],
  [-118.2, 34],
  [-95.3, 29.7],
  [-46.6, -23.5],
  [-43.2, -22.9],
  [31.2, 30],
  [28, -26.2],
]

const loadingOrUnavailableLabel = computed(() => (
  statsStatus.value === 'loading' ? 'Loading...' : 'Unavailable'
))

const hasVisitorStats = computed(() => statsStatus.value === 'available' && visitorStats.value?.ok)

const foundedAtLabel = computed(() => foundedAtFallback)

const totalVisitorsLabel = computed(() => (
  hasVisitorStats.value
    ? formatStatCount(visitorStats.value.uniqueVisitors, loadingOrUnavailableLabel.value)
    : loadingOrUnavailableLabel.value
))

const countriesReachedLabel = computed(() => (
  hasVisitorStats.value
    ? formatStatCount(visitorStats.value.countriesReached, loadingOrUnavailableLabel.value)
    : loadingOrUnavailableLabel.value
))

const currentVisitorLabel = computed(() => {
  if (!hasVisitorStats.value) return loadingOrUnavailableLabel.value

  return formatVisitorNumber(visitorStats.value.currentVisitorNumber)
})

const analyticsNote = computed(() => {
  if (statsStatus.value === 'loading') return 'Loading visitor statistics...'
  if (visitorStats.value?.trackingMode === 'tracked') {
    return 'Live aggregate statistics; location is rounded to an approximate region.'
  }
  if (statsStatus.value === 'available') {
    return 'Aggregate totals loaded; current visitor details are temporarily unavailable.'
  }
  return 'Visitor statistics are temporarily unavailable.'
})

const currentLocationLabel = computed(() => {
  if (!currentVisitor.value) return ''

  const country = currentVisitor.value.country === 'Unknown' ? '' : currentVisitor.value.country
  return [...new Set([currentVisitor.value.region, country].filter(Boolean))].join(', ')
})

const markerSummaryLabel = computed(() => {
  if (statsStatus.value === 'loading') return 'Loading privacy-qualified country markers...'
  if (visitorSources.value.length) {
    return `${visitorSources.value.length} privacy-qualified country markers are shown.`
  }
  if (statsStatus.value === 'available') return 'No country markers meet the public display threshold yet.'
  return 'Country markers are temporarily unavailable.'
})

const markerVisitorLabel = (source) => (
  source.uniqueVisitors !== null
    ? `${Math.trunc(source.uniqueVisitors).toLocaleString()} visitors`
    : 'visitor count unavailable'
)

const markerVisitLabel = (source) => (
  source.visits !== null
    ? `${Math.trunc(source.visits).toLocaleString()} visits`
    : 'visit count unavailable'
)

const hasCurrentMarker = computed(() => (
  currentVisitor.value?.latitude !== null
  && currentVisitor.value?.latitude !== undefined
  && currentVisitor.value?.longitude !== null
  && currentVisitor.value?.longitude !== undefined
))

const globeAriaLabel = computed(() => (
  currentLocationLabel.value && hasCurrentMarker.value
    ? `Globe of aggregate visitor regions. Your approximate region, ${currentLocationLabel.value}, is highlighted.`
    : 'Globe of aggregate visitor regions from live website statistics.'
))

const normalizeVisitorCountries = (countries = []) => (
  countries
    .map((country) => {
      const latitude = toFiniteCoordinate(country.lat ?? country.latitude, -90, 90)
      const longitude = toFiniteCoordinate(country.lng ?? country.longitude, -180, 180)
      const visits = toFiniteNumber(country.visits)
      const uniqueVisitors = toFiniteNumber(country.uniqueVisitors)

      return {
        countryCode: country.countryCode || '',
        country: country.countryName || country.countryCode || 'Unknown',
        latitude,
        longitude,
        visits,
        uniqueVisitors,
      }
    })
    .filter((country) => country.latitude !== null && country.longitude !== null)
)

const normalizeCurrentVisitor = (stats, countries) => {
  const visitor = stats?.currentVisitor
  if (!visitor) return null

  const countryCode = visitor.countryCode || ''
  const aggregateCountry = countries.find((country) => country.countryCode === countryCode)
  const latitude = toFiniteCoordinate(visitor.lat ?? visitor.latitude, -90, 90)
  const longitude = toFiniteCoordinate(visitor.lng ?? visitor.longitude, -180, 180)
  const hasCoordinatePair = latitude !== null && longitude !== null

  return {
    countryCode,
    country: visitor.countryName || aggregateCountry?.country || countryCode || 'Unknown',
    region: visitor.region || '',
    latitude: hasCoordinatePair ? latitude : null,
    longitude: hasCoordinatePair ? longitude : null,
    timezone: visitor.timezone || '',
  }
}

const deviceTimeZone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
  } catch {
    return 'UTC'
  }
}

let activeTimeZone = ''
let localTimeFormatter = null

const clearStatsRetry = () => {
  if (statsRetryTimer) window.clearTimeout(statsRetryTimer)
  statsRetryTimer = 0
}

const scheduleStatsRetry = () => {
  if (
    !isMounted
    || statsRetryTimer
    || statsRetryAttempt >= STATS_RETRY_DELAYS.length
  ) return

  const delay = STATS_RETRY_DELAYS[statsRetryAttempt]
  statsRetryAttempt += 1
  statsRetryTimer = window.setTimeout(() => {
    statsRetryTimer = 0
    void loadVisitorStats()
  }, delay)
}

const updateVisitorTime = () => {
  const now = new Date()
  worldClocks.value = rotateWorldClocks(now)
  void nextTick(resizeLocalClock)
  const apiTimeZone = currentVisitor.value?.timezone
  const usesVisitorTimeZone = isValidTimeZone(apiTimeZone)
  const timeZone = usesVisitorTimeZone ? apiTimeZone : deviceTimeZone()

  if (timeZone !== activeTimeZone || !localTimeFormatter) {
    activeTimeZone = timeZone
    localTimeFormatter = createCityClockFormatter(timeZone)
  }

  const localClock = localTimeFormatter(now)
  visitorTimeLabel.value = localClock.time
  visitorTimeZoneLabel.value = localClock.offset
}

const loadVisitorStats = async () => {
  if (statsRequestInFlight) return

  statsRequestInFlight = true
  if (!visitorStats.value?.ok) statsStatus.value = 'loading'
  const stats = await trackVisitor()
  statsRequestInFlight = false

  if (!isMounted) return

  if (!stats?.ok) {
    visitorStats.value = null
    visitorSources.value = []
    currentVisitor.value = null
    statsStatus.value = 'unavailable'
    updateVisitorTime()
    requestRender()
    scheduleStatsRetry()
    return
  }

  const countries = normalizeVisitorCountries(stats.countries)
  visitorStats.value = stats
  visitorSources.value = countries
  currentVisitor.value = normalizeCurrentVisitor(stats, countries)
  statsStatus.value = 'available'
  updateVisitorTime()

  if (stats.trackingMode === 'tracked') {
    clearStatsRetry()
    statsRetryAttempt = 0
  } else {
    // A read-only fallback keeps aggregate counts visible; retry tracking in
    // the background so the current visitor number and region can recover.
    scheduleStatsRetry()
  }

  if (hasCurrentMarker.value) {
    rotationDegrees = -currentVisitor.value.longitude
    lastAnimationTime = 0
    lastRenderTime = 0
  }

  requestRender()
}

const project = (latitude, longitude, rotation) => {
  const lat = latitude * DEG
  const lng = (longitude + rotation) * DEG
  const x = Math.cos(lat) * Math.sin(lng)
  const y = Math.sin(lat)
  const z = Math.cos(lat) * Math.cos(lng)

  return {
    x: centerX + x * radius,
    y: centerY - y * radius,
    z,
    visible: z > -0.02,
  }
}

const illuminationAt = (latitude, longitude, sunVector) => {
  const point = vectorFromLatLng(latitude, longitude)
  return point.x * sunVector.x + point.y * sunVector.y + point.z * sunVector.z
}

const clampColor = (value) => Math.max(0, Math.min(255, value))
const enhanceContrast = (value) => (value - 96) * 1.04 + 108

const loadEarthTexture = () => {
  if (earthTextureState !== 'idle') return

  earthTextureState = 'loading'
  const image = new Image()
  image.decoding = 'async'
  image.onload = () => {
    if (!isMounted) return

    const textureCanvas = document.createElement('canvas')
    textureCanvas.width = image.naturalWidth || image.width
    textureCanvas.height = image.naturalHeight || image.height

    const textureCtx = textureCanvas.getContext('2d', { willReadFrequently: true })
    textureCtx.drawImage(image, 0, 0, textureCanvas.width, textureCanvas.height)

    earthTextureWidth = textureCanvas.width
    earthTextureHeight = textureCanvas.height
    earthTextureData = textureCtx.getImageData(0, 0, earthTextureWidth, earthTextureHeight).data
    earthTextureState = 'ready'
    requestRender()
  }
  image.onerror = () => {
    if (!isMounted) return
    earthTextureState = 'failed'
    requestRender()
  }
  image.src = EARTH_TEXTURE_URL
}

const resizeCanvas = () => {
  const canvas = canvasRef.value
  const wrap = wrapRef.value
  if (!canvas || !wrap) return false

  const rect = wrap.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
  const nextWidth = Math.max(1, rect.width)
  const nextHeight = Math.max(1, rect.height)
  const nextCanvasWidth = Math.max(1, Math.floor(nextWidth * dpr))
  const nextCanvasHeight = Math.max(1, Math.floor(nextHeight * dpr))
  const sizeChanged = canvas.width !== nextCanvasWidth || canvas.height !== nextCanvasHeight

  renderPixelRatio = dpr
  width = nextWidth
  height = nextHeight
  centerX = width / 2
  centerY = height / 2 + 4
  radius = Math.min(width * 0.36, height * 0.4)

  // CSS owns the canvas layout size. Writing that measured size back as an
  // inline height created a ResizeObserver feedback loop that repeatedly grew
  // the footer and cleared the bitmap before it could be painted.
  if (sizeChanged) {
    canvas.width = nextCanvasWidth
    canvas.height = nextCanvasHeight
  }

  ctx = canvas.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  return sizeChanged
}

const drawVisiblePolyline = (points, rotation, strokeStyle, lineWidth = 1) => {
  ctx.beginPath()
  let drawing = false
  points.forEach(([longitude, latitude]) => {
    const point = project(latitude, longitude, rotation)
    if (!point.visible) {
      drawing = false
      return
    }
    if (!drawing) {
      ctx.moveTo(point.x, point.y)
      drawing = true
      return
    }
    ctx.lineTo(point.x, point.y)
  })
  ctx.strokeStyle = strokeStyle
  ctx.lineWidth = lineWidth
  ctx.stroke()
}

const drawGrid = (rotation) => {
  for (let lat = -60; lat <= 60; lat += 30) {
    const points = []
    for (let lng = -180; lng <= 180; lng += 4) points.push([lng, lat])
    drawVisiblePolyline(points, rotation, 'rgba(113, 221, 255, 0.16)', 0.8)
  }

  for (let lng = -150; lng <= 180; lng += 30) {
    const points = []
    for (let lat = -82; lat <= 82; lat += 4) points.push([lng, lat])
    drawVisiblePolyline(points, rotation, 'rgba(113, 221, 255, 0.12)', 0.8)
  }
}

const drawContinents = (rotation) => {
  continents.forEach((polygon) => {
    const projected = polygon.map(([longitude, latitude]) => project(latitude, longitude, rotation))
    const visible = projected.filter((point) => point.visible)
    if (visible.length < 3) return

    ctx.beginPath()
    visible.forEach((point, index) => {
      if (index === 0) ctx.moveTo(point.x, point.y)
      else ctx.lineTo(point.x, point.y)
    })
    ctx.closePath()
    ctx.fillStyle = 'rgba(61, 171, 158, 0.5)'
    ctx.strokeStyle = 'rgba(156, 235, 219, 0.42)'
    ctx.lineWidth = 1
    ctx.fill()
    ctx.stroke()
  })
}

const drawCityLights = (rotation, sun, time) => {
  cityLights.forEach(([longitude, latitude], index) => {
    const point = project(latitude, longitude, rotation)
    if (!point.visible) return

    const light = illuminationAt(latitude, longitude, sun.vector)
    if (light > 0.08) return

    const pulse = 0.45 + Math.sin(time / 900 + index) * 0.12
    const alpha = Math.min(0.42, (0.1 - light) * 0.85 + pulse * 0.16)
    ctx.beginPath()
    ctx.arc(point.x, point.y, 1.2, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(126, 236, 255, ${alpha})`
    ctx.shadowColor = 'rgba(126, 236, 255, 0.55)'
    ctx.shadowBlur = 8
    ctx.fill()
    ctx.shadowBlur = 0
  })
}

const drawTexturedEarth = (rotation, sun) => {
  if (!earthTextureData || !earthTextureWidth || !earthTextureHeight) return false

  const diameter = Math.max(1, Math.ceil(radius * 2 * renderPixelRatio))
  const sphereRadius = diameter / 2
  if (!earthFrameCanvas) {
    earthFrameCanvas = document.createElement('canvas')
    earthFrameCtx = earthFrameCanvas.getContext('2d')
  }
  if (earthFrameCanvas.width !== diameter || earthFrameCanvas.height !== diameter) {
    earthFrameCanvas.width = diameter
    earthFrameCanvas.height = diameter
    earthFrameImageData = null
    earthFrameCtx.imageSmoothingEnabled = true
    earthFrameCtx.imageSmoothingQuality = 'high'
  }

  if (!earthFrameImageData) {
    earthFrameImageData = earthFrameCtx.createImageData(diameter, diameter)
  }

  const output = earthFrameImageData.data
  const texture = earthTextureData
  const textureStride = earthTextureWidth * 4
  const cameraSun = rotateSunVector(sun.vector, rotation)

  for (let y = 0; y < diameter; y += 1) {
    const sphereY = 1 - (y + 0.5) / sphereRadius
    const latitude = Math.asin(sphereY) / DEG
    const textureV = ((90 - latitude) / 180) * (earthTextureHeight - 1)
    const textureY0 = Math.floor(textureV)
    const textureY1 = Math.min(earthTextureHeight - 1, textureY0 + 1)
    const mixY = textureV - textureY0
    const topWeight = 1 - mixY
    const bottomWeight = mixY

    for (let x = 0; x < diameter; x += 1) {
      const sphereX = (x + 0.5) / sphereRadius - 1
      const distanceSquared = sphereX * sphereX + sphereY * sphereY
      const outputIndex = (y * diameter + x) * 4

      if (distanceSquared > 1) {
        output[outputIndex + 3] = 0
        continue
      }

      const sphereZ = Math.sqrt(1 - distanceSquared)
      const rotatedLongitude = Math.atan2(sphereX, sphereZ) / DEG
      const longitude = rotatedLongitude - rotation
      const wrappedLongitude = ((longitude + 540) % 360) - 180
      const textureU = ((wrappedLongitude + 180) / 360) * (earthTextureWidth - 1)
      const textureX0 = Math.floor(textureU)
      const textureX1 = (textureX0 + 1) % earthTextureWidth
      const mixX = textureU - textureX0
      const topLeftIndex = textureY0 * textureStride + textureX0 * 4
      const topRightIndex = textureY0 * textureStride + textureX1 * 4
      const bottomLeftIndex = textureY1 * textureStride + textureX0 * 4
      const bottomRightIndex = textureY1 * textureStride + textureX1 * 4
      const leftWeight = 1 - mixX
      const rightWeight = mixX
      const red = (
        texture[topLeftIndex] * leftWeight * topWeight
        + texture[topRightIndex] * rightWeight * topWeight
        + texture[bottomLeftIndex] * leftWeight * bottomWeight
        + texture[bottomRightIndex] * rightWeight * bottomWeight
      )
      const green = (
        texture[topLeftIndex + 1] * leftWeight * topWeight
        + texture[topRightIndex + 1] * rightWeight * topWeight
        + texture[bottomLeftIndex + 1] * leftWeight * bottomWeight
        + texture[bottomRightIndex + 1] * rightWeight * bottomWeight
      )
      const blue = (
        texture[topLeftIndex + 2] * leftWeight * topWeight
        + texture[topRightIndex + 2] * rightWeight * topWeight
        + texture[bottomLeftIndex + 2] * leftWeight * bottomWeight
        + texture[bottomRightIndex + 2] * rightWeight * bottomWeight
      )
      const light = (
        sphereX * cameraSun.x
        + sphereY * cameraSun.y
        + sphereZ * cameraSun.z
      )
      const limbShade = 0.66 + sphereZ * 0.38
      const sunShade = daylightBrightness(light)
      const shade = limbShade * sunShade

      output[outputIndex] = clampColor(enhanceContrast(red) * 0.96 * shade + 12)
      output[outputIndex + 1] = clampColor(enhanceContrast(green) * 1.08 * shade + 18)
      output[outputIndex + 2] = clampColor(enhanceContrast(blue) * 1.18 * shade + 28)
      output[outputIndex + 3] = Math.round(255 * Math.min(1, (1 - Math.sqrt(distanceSquared)) * sphereRadius * 2.2))
    }
  }

  earthFrameCtx.putImageData(earthFrameImageData, 0, 0)
  ctx.drawImage(earthFrameCanvas, centerX - radius, centerY - radius, radius * 2, radius * 2)
  return true
}

const drawFallbackNight = (rotation, sun) => {
  const diameter = Math.max(1, Math.ceil(radius * 2 * renderPixelRatio))
  if (!nightShadeCanvas) {
    nightShadeCanvas = document.createElement('canvas')
    nightShadeContext = nightShadeCanvas.getContext('2d')
  }
  if (nightShadeCanvas.width !== diameter || nightShadeCanvas.height !== diameter) {
    nightShadeCanvas.width = diameter
    nightShadeCanvas.height = diameter
    nightShadeImageData = null
  }
  if (!nightShadeImageData) nightShadeImageData = nightShadeContext.createImageData(diameter, diameter)
  const output = nightShadeImageData.data
  const cameraSun = rotateSunVector(sun.vector, rotation)
  for (let y = 0; y < diameter; y += 1) {
    const sy = 1 - (y + 0.5) / (diameter / 2)
    for (let x = 0; x < diameter; x += 1) {
      const sx = (x + 0.5) / (diameter / 2) - 1
      const distance = sx * sx + sy * sy
      const index = (y * diameter + x) * 4
      if (distance > 1) { output[index + 3] = 0; continue }
      const light = sx * cameraSun.x + sy * cameraSun.y + Math.sqrt(1 - distance) * cameraSun.z
      output[index] = 3
      output[index + 1] = 12
      output[index + 2] = 30
      output[index + 3] = Math.round(Math.max(0, 1 - daylightBrightness(light)) * 255)
    }
  }
  nightShadeContext.putImageData(nightShadeImageData, 0, 0)
  ctx.drawImage(nightShadeCanvas, centerX - radius, centerY - radius, radius * 2, radius * 2)
}

const drawVisitorMarkers = (rotation, time) => {
  visibleMarkers = []

  visitorSources.value.forEach((source, index) => {
    const point = project(source.latitude, source.longitude, rotation)
    if (!point.visible || point.z < 0.08) return

    const pulse = 0.5 + Math.sin(time / 650 + index * 1.9) * 0.5
    const ringRadius = 7 + pulse * 8

    ctx.beginPath()
    ctx.arc(point.x, point.y, ringRadius, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(88, 232, 255, ${0.12 + pulse * 0.14})`
    ctx.lineWidth = 1.2
    ctx.stroke()

    const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 7)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)')
    gradient.addColorStop(0.32, 'rgba(97, 242, 211, 0.9)')
    gradient.addColorStop(1, 'rgba(97, 242, 211, 0)')
    ctx.beginPath()
    ctx.arc(point.x, point.y, 6, 0, Math.PI * 2)
    ctx.fillStyle = gradient
    ctx.fill()

    visibleMarkers.push({
      x: point.x,
      y: point.y,
      radius: 14,
      kind: 'aggregate',
      source,
    })
  })
}

const drawCurrentVisitorMarker = (rotation, time) => {
  const visitor = currentVisitor.value
  if (!visitor || !hasCurrentMarker.value) return

  const point = project(visitor.latitude, visitor.longitude, rotation)
  if (!point.visible || point.z < 0.04) return

  const pulse = reducedMotion ? 0.55 : 0.5 + Math.sin(time / 520) * 0.5
  const outerRadius = 12 + pulse * 5

  ctx.save()
  ctx.beginPath()
  ctx.arc(point.x, point.y, outerRadius, 0, Math.PI * 2)
  ctx.strokeStyle = `rgba(255, 177, 92, ${0.46 + pulse * 0.3})`
  ctx.lineWidth = 1.6
  ctx.shadowColor = 'rgba(255, 156, 72, 0.78)'
  ctx.shadowBlur = 13
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(point.x, point.y, 5, 0, Math.PI * 2)
  ctx.fillStyle = '#ffad5c'
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 2
  ctx.fill()
  ctx.stroke()

  ctx.shadowBlur = 0
  ctx.font = '800 10px Inter, ui-sans-serif, system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillStyle = 'rgba(255, 241, 224, 0.96)'
  const labelAbove = point.y - outerRadius - 14 >= 4
  ctx.textBaseline = labelAbove ? 'bottom' : 'top'
  ctx.fillText('YOU', point.x, labelAbove
    ? point.y - outerRadius - 3
    : point.y + outerRadius + 3)
  ctx.restore()

  visibleMarkers.unshift({
    x: point.x,
    y: point.y,
    radius: Math.max(18, outerRadius + 3),
    kind: 'current',
    source: visitor,
  })
}

const showMeteorNoticeIfVisible = (frame) => {
  if (!isMounted || !isGlobeVisible || document.hidden || frame.opacity < 0.3 || !wrapRef.value) return false
  const rect = wrapRef.value.getBoundingClientRect()
  const obstacles = [...wrapRef.value.querySelectorAll('.city-clock, .local-time-chip, .globe-tooltip')].map(element => {
    const bounds = element.getBoundingClientRect()
    return { left: bounds.left - rect.left, right: bounds.right - rect.left, top: bounds.top - rect.top, bottom: bounds.bottom - rect.top }
  })
  const visible = isMeteorVisible(frame, {
    viewport: { left: Math.max(0, -rect.left), top: Math.max(0, -rect.top), right: Math.min(width, window.innerWidth - rect.left), bottom: Math.min(height, window.innerHeight - rect.top) },
    sphere: { x: centerX, y: centerY, radius },
    obstacles,
  })
  if (visible) meteorNoticeVisible.value = true
  return visible
}

const drawMeteor = (time) => {
  if (reducedMotion) return
  if (!nextMeteorAt) nextMeteorAt = time + 6000 + Math.random() * 6000
  if (!meteor && time >= nextMeteorAt) {
    meteor = createMeteor(time, width, height)
    nextMeteorAt = time + 18000 + Math.random() * 18000
  }
  const frame = meteorFrame(meteor, time)
  if (!frame) { meteor = null; return }
  const trail = ctx.createLinearGradient(frame.tailX, frame.tailY, frame.x, frame.y)
  trail.addColorStop(0, 'rgba(140, 206, 255, 0)')
  trail.addColorStop(0.7, `rgba(176, 222, 255, ${frame.opacity * 0.35})`)
  trail.addColorStop(1, `rgba(240, 250, 255, ${frame.opacity})`)
  ctx.save()
  ctx.strokeStyle = trail
  ctx.lineWidth = 1.2
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(frame.tailX, frame.tailY)
  ctx.lineTo(frame.x, frame.y)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(frame.x, frame.y, 1.3, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(244, 251, 255, ${frame.opacity})`
  ctx.shadowColor = 'rgba(159, 218, 255, 0.7)'
  ctx.shadowBlur = 6
  ctx.fill()
  ctx.restore()
  if (!meteor.notified) meteor.notified = showMeteorNoticeIfVisible(frame)
}

const drawSpace = (time) => {
  ctx.save()
  starField.forEach(star => {
    const shimmer = reducedMotion ? 0.65 : 0.65 + Math.sin(time / 2400 + star.phase) * 0.18
    ctx.beginPath()
    ctx.arc(star.x * width, star.y * height, star.radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(208, 232, 255, ${shimmer})`
    ctx.fill()
  })

  // A decorative guiding star, inspired by the visual appearance of Polaris.
  const x = width * 0.86
  const y = height * 0.27
  const glow = ctx.createRadialGradient(x, y, 0, x, y, 19)
  glow.addColorStop(0, 'rgba(237, 249, 255, 0.9)')
  glow.addColorStop(0.12, 'rgba(174, 221, 255, 0.5)')
  glow.addColorStop(1, 'rgba(128, 197, 255, 0)')
  ctx.fillStyle = glow
  ctx.fillRect(x - 19, y - 19, 38, 38)
  ctx.fillStyle = 'rgba(239, 249, 255, 0.95)'
  ctx.beginPath()
  ctx.arc(x, y, 1.7, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
  drawMeteor(time)
}

const drawGlobe = (time = 0) => {
  if (!ctx || !width || !height) return

  const rotation = rotationDegrees
  const sun = getSunPosition()

  ctx.clearRect(0, 0, width, height)
  drawSpace(time)

  const outerGlow = ctx.createRadialGradient(centerX, centerY, radius * 0.7, centerX, centerY, radius * 1.5)
  outerGlow.addColorStop(0, 'rgba(64, 172, 255, 0.2)')
  outerGlow.addColorStop(0.55, 'rgba(77, 170, 255, 0.12)')
  outerGlow.addColorStop(1, 'rgba(37, 185, 255, 0)')
  ctx.fillStyle = outerGlow
  ctx.fillRect(0, 0, width, height)

  ctx.save()
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
  ctx.clip()

  const renderedTexture = earthTextureState === 'ready' && drawTexturedEarth(rotation, sun)

  if (!renderedTexture) {
    const base = ctx.createRadialGradient(centerX - radius * 0.32, centerY - radius * 0.4, radius * 0.1, centerX, centerY, radius)
    base.addColorStop(0, '#347fae')
    base.addColorStop(0.46, '#195780')
    base.addColorStop(1, '#102e50')
    ctx.fillStyle = base
    ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2)

    drawContinents(rotation)
    drawGrid(rotation)
    drawFallbackNight(rotation, sun)
  }

  drawCityLights(rotation, sun, time)

  const atmosphere = ctx.createRadialGradient(centerX, centerY, radius * 0.76, centerX, centerY, radius)
  atmosphere.addColorStop(0, 'rgba(104, 195, 255, 0)')
  atmosphere.addColorStop(0.7, 'rgba(104, 195, 255, 0.04)')
  atmosphere.addColorStop(1, 'rgba(145, 220, 255, 0.28)')
  ctx.fillStyle = atmosphere
  ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2)

  drawVisitorMarkers(rotation, time)

  ctx.restore()

  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(163, 228, 255, 0.68)'
  ctx.lineWidth = 1.2
  ctx.shadowColor = 'rgba(88, 192, 255, 0.46)'
  ctx.shadowBlur = 18
  ctx.stroke()
  ctx.shadowBlur = 0
  // Draw the active visitor after restoring the sphere clip so its label and
  // focus ring remain readable near polar regions and the globe edge.
  drawCurrentVisitorMarker(rotation, time)
  updateTooltipAtPointer()
}

const stopAnimation = () => {
  if (animationFrame) cancelAnimationFrame(animationFrame)
  animationFrame = 0
  lastAnimationTime = 0
  clockFlight = null
  meteor = null
  nextMeteorAt = 0
  meteorNoticeVisible.value = false
}

const runAnimation = (time) => {
  animationFrame = 0
  if (!isMounted || reducedMotion || !isGlobeVisible || document.hidden) return

  if (lastAnimationTime) {
    const elapsedSeconds = Math.min(0.1, (time - lastAnimationTime) / 1000)
    rotationDegrees = (rotationDegrees + elapsedSeconds * 2.1) % 360
  }
  lastAnimationTime = time

  if (!lastRenderTime || time - lastRenderTime >= FRAME_INTERVAL) {
    lastRenderTime = time
    moveLocalClock(time)
    drawGlobe(time)
  }

  animationFrame = requestAnimationFrame(runAnimation)
}

const requestRender = () => {
  if (!isMounted || !ctx || !isGlobeVisible || document.hidden) return

  if (reducedMotion) {
    drawGlobe(performance.now())
    return
  }

  if (!animationFrame) animationFrame = requestAnimationFrame(runAnimation)
}

const updateTooltipAtPointer = () => {
  if (!pointerIsActive) {
    tooltip.visible = false
    return
  }

  const marker = visibleMarkers.find((item) => {
    const distance = Math.hypot(item.x - pointerX, item.y - pointerY)
    return distance <= item.radius
  })

  if (!marker) {
    tooltip.visible = false
    return
  }

  tooltip.visible = true
  tooltip.x = Math.min(width - 170, Math.max(12, marker.x + 14))
  tooltip.y = Math.min(height - 92, Math.max(12, marker.y - 8))

  if (marker.kind === 'current') {
    tooltip.title = 'Your approximate region'
    tooltip.detail = currentLocationLabel.value || marker.source.country
    tooltip.meta = `${visitorTimeLabel.value} · ${visitorTimeZoneLabel.value}`
    return
  }

  tooltip.title = marker.source.country
  tooltip.detail = marker.source.uniqueVisitors !== null
    ? `${Math.trunc(marker.source.uniqueVisitors).toLocaleString()} visitors`
    : 'Visitor count unavailable'
  tooltip.meta = marker.source.visits !== null
    ? `${Math.trunc(marker.source.visits).toLocaleString()} visits`
    : ''
}

const handlePointerMove = (event) => {
  if (!wrapRef.value) return
  const rect = wrapRef.value.getBoundingClientRect()
  pointerIsActive = true
  pointerX = event.clientX - rect.left
  pointerY = event.clientY - rect.top
  updateTooltipAtPointer()
}

const handlePointerLeave = () => {
  pointerIsActive = false
  tooltip.visible = false
}

const scheduleLocalTimeUpdate = () => {
  if (!isMounted) return

  updateVisitorTime()
  updateTooltipAtPointer()
  requestRender()
  if (localTimeTimer) window.clearTimeout(localTimeTimer)
  const nextMinuteDelay = 60000 - (Date.now() % 60000) + 50
  localTimeTimer = window.setTimeout(scheduleLocalTimeUpdate, nextMinuteDelay)
}

const handleMotionChange = () => {
  reducedMotion = Boolean(motionQuery?.matches)
  stopAnimation()
  requestRender()
}

const handleVisibilityChange = () => {
  if (document.hidden) {
    stopAnimation()
    if (localTimeTimer) window.clearTimeout(localTimeTimer)
    localTimeTimer = 0
    return
  }

  scheduleLocalTimeUpdate()
  if (statsStatus.value === 'unavailable') {
    clearStatsRetry()
    statsRetryAttempt = 0
    void loadVisitorStats()
  }
  requestRender()
}

onMounted(() => {
  isMounted = true
  scheduleLocalTimeUpdate()

  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion = Boolean(motionQuery.matches)
  motionQuery.addEventListener?.('change', handleMotionChange)

  resizeCanvas()
  resizeLocalClock()
  resizeObserver = new ResizeObserver(() => {
    const sizeChanged = resizeCanvas()
    resizeLocalClock()
    if (sizeChanged) drawGlobe(performance.now())
    requestRender()
  })
  if (wrapRef.value) resizeObserver.observe(wrapRef.value)
  if (localClockRef.value) resizeObserver.observe(localClockRef.value)

  drawGlobe(performance.now())

  if ('IntersectionObserver' in window && wrapRef.value) {
    intersectionObserver = new IntersectionObserver((entries) => {
      isGlobeVisible = Boolean(entries[0]?.isIntersecting)
      if (!isGlobeVisible) {
        stopAnimation()
        return
      }

      resizeCanvas()
      loadEarthTexture()
      // Paint synchronously when the off-screen footer becomes visible. This
      // prevents a blank frame if a prior resize cleared the backing bitmap.
      drawGlobe(performance.now())
      requestRender()
    }, { rootMargin: '120px' })
    intersectionObserver.observe(wrapRef.value)
  } else {
    loadEarthTexture()
    requestRender()
  }

  document.addEventListener('visibilitychange', handleVisibilityChange)
  void loadVisitorStats()
})

onUnmounted(() => {
  isMounted = false
  stopAnimation()
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  motionQuery?.removeEventListener?.('change', handleMotionChange)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  if (localTimeTimer) window.clearTimeout(localTimeTimer)
  clearStatsRetry()
})
</script>

<style scoped>
.global-visitors {
  display: grid;
  grid-template-columns: minmax(420px, 1.42fr) minmax(240px, 0.72fr);
  gap: 12px;
  align-items: stretch;
  min-height: 288px;
}

.globe-panel,
.visitor-stat-panel {
  border: 1px solid rgba(126, 236, 255, 0.16);
  border-radius: 10px;
  background:
    linear-gradient(135deg, rgba(12, 38, 70, 0.94), rgba(5, 18, 42, 0.9)),
    #06142c;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.025);
}

.globe-panel {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 9px;
  padding: 14px;
  min-height: 288px;
  overflow: hidden;
}

.globe-heading {
  display: grid;
  gap: 4px;
}

.globe-kicker {
  margin: 0;
  color: rgba(126, 236, 255, 0.78);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.globe-heading h2 {
  margin: 0;
  color: #ffffff;
  font-size: 16px;
  line-height: 1.2;
}

.globe-heading p {
  margin: 0;
  color: rgba(216, 235, 255, 0.68);
  font-size: 12px;
  line-height: 1.35;
}

.globe-canvas-wrap {
  position: relative;
  height: 320px;
  min-height: 320px;
  overflow: hidden;
  border: 1px solid rgba(126, 236, 255, 0.1);
  border-radius: 8px;
  background:
    radial-gradient(ellipse at 52% 45%, rgba(55, 116, 185, 0.26), transparent 64%),
    radial-gradient(ellipse at 18% 24%, rgba(109, 124, 204, 0.13), transparent 42%),
    #07172f;
}

.global-globe-canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.world-clocks {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}

.city-clock {
  position: absolute;
  display: grid;
  gap: 2px;
  width: min(112px, calc(50% - 18px));
  padding: 6px 8px;
  border: 1px solid rgba(170, 215, 255, 0.2);
  border-radius: 6px;
  background: rgba(8, 26, 51, 0.7);
  backdrop-filter: blur(4px);
  text-align: left;
}

.city-clock--top-left { top: 10px; left: 10px; }
.city-clock--top-right { top: 10px; right: 10px; }
.city-clock--bottom-left { bottom: 10px; left: 10px; }
.city-clock--bottom-right { bottom: 10px; right: 10px; }
.city-clock-name { color: #cce8ff; font-size: 10px; font-weight: 700; line-height: 1.2; }
.city-clock time { color: #fff; font-size: 18px; font-weight: 700; line-height: 1.2; font-variant-numeric: tabular-nums; }
.city-clock-date { color: #b5cce0; font-size: 9px; line-height: 1.3; white-space: nowrap; }
.city-clock-swap-enter-active, .city-clock-swap-leave-active { transition: opacity 400ms ease; }
.city-clock-swap-enter-from, .city-clock-swap-leave-to { opacity: 0; }
@media (prefers-reduced-motion: reduce) {
  .city-clock-swap-enter-active, .city-clock-swap-leave-active { transition: none; }
}

.local-time-chip {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  visibility: hidden;
  width: max-content;
  max-width: calc(100% - 24px);
  display: grid;
  grid-template-columns: auto auto;
  gap: 7px;
  align-items: baseline;
  padding: 6px 8px;
  border: 1px solid rgba(126, 236, 255, 0.1);
  border-radius: 7px;
  background: rgba(5, 22, 45, 0.24);
  color: rgba(216, 235, 255, 0.72);
  line-height: 1.1;
  white-space: nowrap;
  backdrop-filter: none;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.65);
  pointer-events: none;
  will-change: transform;
}

.local-time-chip small {
  color: rgba(126, 236, 255, 0.68);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.local-time-chip strong {
  color: #ffffff;
  font-size: 13px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}

.globe-tooltip {
  position: absolute;
  z-index: 4;
  width: 158px;
  padding: 9px 10px;
  border: 1px solid rgba(126, 236, 255, 0.24);
  border-radius: 10px;
  background: rgba(3, 11, 29, 0.9);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28), 0 0 18px rgba(88, 232, 255, 0.16);
  color: #ffffff;
  pointer-events: none;
  backdrop-filter: blur(10px);
}

.globe-tooltip strong,
.globe-tooltip span {
  display: block;
}

.globe-tooltip small {
  display: block;
  margin-top: 3px;
  color: rgba(216, 235, 255, 0.58);
  font-size: 10px;
  line-height: 1.35;
}

.globe-tooltip strong {
  color: rgba(126, 236, 255, 0.94);
  font-size: 12px;
  line-height: 1.25;
}

.globe-tooltip span {
  margin-top: 4px;
  color: rgba(216, 235, 255, 0.76);
  font-size: 12px;
  line-height: 1.35;
}

.visitor-stat-panel {
  display: grid;
  align-content: start;
  gap: 12px;
  padding: 14px;
  min-height: 0;
  overflow: hidden;
}

.visitor-stat-panel dl {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  margin: 0;
}

.visitor-stat-panel div {
  display: grid;
  gap: 3px;
  align-content: start;
  min-height: 66px;
  padding: 10px;
  border: 1px solid rgba(126, 236, 255, 0.1);
  border-radius: 7px;
  background: rgba(126, 236, 255, 0.035);
}

.visitor-stat-panel div:last-child {
  padding: 10px;
  border: 1px solid rgba(126, 236, 255, 0.1);
}

.visitor-stat-panel dt {
  color: rgba(126, 236, 255, 0.72);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.visitor-stat-panel dd {
  margin: 0;
  color: #ffffff;
  font-size: 15px;
  font-weight: 760;
  line-height: 1.3;
}

.visitor-id {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px !important;
  color: rgba(216, 235, 255, 0.88) !important;
}

.analytics-note {
  margin: 0;
  color: rgba(216, 235, 255, 0.58);
  font-size: 11px;
  line-height: 1.35;
}

.marker-summary {
  margin: 0;
  color: rgba(216, 235, 255, 0.72);
  font-size: 11px;
  line-height: 1.35;
}

.current-visitor-location {
  display: grid;
  grid-template-columns: 18px minmax(0, 1fr);
  gap: 8px;
  align-items: start;
  padding: 10px;
  border: 1px solid rgba(255, 177, 92, 0.2);
  border-radius: 7px;
  background: rgba(255, 177, 92, 0.07);
}

.current-location-mark {
  width: 10px;
  height: 10px;
  margin: 4px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  background: #ffad5c;
  box-shadow: 0 0 0 4px rgba(255, 173, 92, 0.18);
}

.current-visitor-location p {
  display: grid;
  gap: 3px;
  margin: 0;
}

.current-visitor-location strong {
  color: rgba(255, 227, 198, 0.92);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.current-visitor-location span {
  color: #ffffff;
  font-size: 12px;
  line-height: 1.35;
}

@media (max-width: 1000px) {
  .global-visitors {
    grid-template-columns: 1fr;
    min-height: 0;
  }

  .globe-panel {
    min-height: 0;
  }

  .globe-canvas-wrap {
    height: 340px;
    min-height: 340px;
  }
}

@media (max-width: 560px) {
  .globe-panel,
  .visitor-stat-panel {
    padding: 15px;
  }

  .globe-canvas-wrap {
    height: 340px;
    min-height: 340px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .local-time-chip { will-change: auto; }
}
</style>

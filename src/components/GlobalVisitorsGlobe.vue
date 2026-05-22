<template>
  <section class="global-visitors" aria-label="Global visitors globe">
    <div class="globe-panel">
      <div class="globe-heading">
        <p class="globe-kicker">Global Visitors</p>
        <h2>Research Reach Around the World</h2>
        <p>
          This globe visualizes anonymous visitor statistics and the global reach of CSMA Research Group.
        </p>
      </div>

      <div
        ref="wrapRef"
        class="globe-canvas-wrap"
        @pointermove="handlePointerMove"
        @pointerleave="hideTooltip"
      >
        <canvas
          ref="canvasRef"
          class="global-globe-canvas"
          aria-label="Animated global visitors globe"
        ></canvas>
        <span class="utc-chip">{{ utcLabel }}</span>
        <div
          v-if="tooltip.visible"
          class="globe-tooltip"
          :style="{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }"
          role="status"
        >
          <strong>{{ tooltip.country }}</strong>
          <span>{{ tooltip.visits }}</span>
        </div>
      </div>
    </div>

    <aside class="visitor-stat-panel" aria-label="Visitor statistics">
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
          <dt>Current Visitor #</dt>
          <dd class="visitor-id">{{ currentVisitorLabel }}</dd>
        </div>
      </dl>
      <p class="analytics-note">{{ analyticsNote }}</p>
    </aside>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { trackVisitor } from '../services/visitorStats'

const DEG = Math.PI / 180
const foundedAtFallback = '2026-05-19 05:19'
// Local copy from NASA Earth Observatory, Blue Marble: Next Generation with Topography and Bathymetry.
const EARTH_TEXTURE_URL = `${import.meta.env.BASE_URL}textures/earth-blue-marble.jpg`

const canvasRef = ref(null)
const wrapRef = ref(null)
const visitorStats = ref(null)
const visitorSources = ref([])
const statsStatus = ref('loading')
const utcLabel = ref('UTC --:--')
const tooltip = reactive({
  visible: false,
  x: 0,
  y: 0,
  country: '',
  visits: '',
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
let motionQuery
let reducedMotion = false
let startTime = 0
let visibleMarkers = []
let utcTimer = 0
let earthTextureState = 'idle'
let earthTextureData = null
let earthTextureWidth = 0
let earthTextureHeight = 0
let earthFrameCanvas = null
let earthFrameCtx = null

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

const foundedAtLabel = computed(() => (
  hasVisitorStats.value && visitorStats.value.foundedAt
    ? visitorStats.value.foundedAt
    : foundedAtFallback
))

const formatStatCount = (value) => {
  const count = Number(value)
  return Number.isFinite(count) ? count.toLocaleString() : loadingOrUnavailableLabel.value
}

const totalVisitorsLabel = computed(() => (
  hasVisitorStats.value
    ? formatStatCount(visitorStats.value.uniqueVisitors)
    : loadingOrUnavailableLabel.value
))

const countriesReachedLabel = computed(() => (
  hasVisitorStats.value
    ? formatStatCount(visitorStats.value.countriesReached)
    : loadingOrUnavailableLabel.value
))

const currentVisitorLabel = computed(() => {
  if (!hasVisitorStats.value) return loadingOrUnavailableLabel.value

  const visitorNumber = Number(visitorStats.value.currentVisitorNumber)
  return Number.isFinite(visitorNumber) ? `#${visitorNumber.toLocaleString()}` : 'Unavailable'
})

const analyticsNote = computed(() => {
  if (statsStatus.value === 'loading') return 'Loading visitor statistics...'
  if (statsStatus.value === 'available') return 'Anonymous visitor statistics are updated in real time.'
  return 'Visitor statistics unavailable'
})

const normalizeVisitorCountries = (countries = []) => (
  countries
    .map((country) => {
      const latitude = Number(country.lat ?? country.latitude)
      const longitude = Number(country.lng ?? country.longitude)
      const visits = Number(country.visits)
      const uniqueVisitors = Number(country.uniqueVisitors)

      return {
        country: country.countryName || country.countryCode || 'Unknown',
        latitude,
        longitude,
        visits: Number.isFinite(visits) ? visits : null,
        uniqueVisitors: Number.isFinite(uniqueVisitors) ? uniqueVisitors : null,
      }
    })
    .filter((country) => Number.isFinite(country.latitude) && Number.isFinite(country.longitude))
)

const loadVisitorStats = async () => {
  statsStatus.value = 'loading'
  const stats = await trackVisitor()

  if (!stats?.ok) {
    visitorStats.value = null
    visitorSources.value = []
    statsStatus.value = 'unavailable'
    drawGlobe(performance.now())
    return
  }

  visitorStats.value = stats
  visitorSources.value = normalizeVisitorCountries(stats.countries)
  statsStatus.value = 'available'
  drawGlobe(performance.now())
}

const updateUtcLabel = () => {
  const now = new Date()
  utcLabel.value = `UTC ${now.toISOString().slice(11, 16)}`
}

const vectorFromLatLng = (latitude, longitude) => {
  const lat = latitude * DEG
  const lng = longitude * DEG
  return {
    x: Math.cos(lat) * Math.sin(lng),
    y: Math.sin(lat),
    z: Math.cos(lat) * Math.cos(lng),
  }
}

const getSunPosition = () => {
  const now = new Date()
  const start = Date.UTC(now.getUTCFullYear(), 0, 0)
  const dayOfYear = (now.getTime() - start) / 86400000
  const utcHours = now.getUTCHours() + now.getUTCMinutes() / 60 + now.getUTCSeconds() / 3600
  const latitude = 23.44 * Math.sin((2 * Math.PI * (dayOfYear - 80)) / 365.25)
  const longitude = 180 - utcHours * 15

  return {
    latitude,
    longitude,
    vector: vectorFromLatLng(latitude, longitude),
  }
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
const enhanceContrast = (value) => (value - 128) * 1.08 + 128

const loadEarthTexture = () => {
  if (earthTextureState !== 'idle') return

  earthTextureState = 'loading'
  const image = new Image()
  image.decoding = 'async'
  image.onload = () => {
    const textureCanvas = document.createElement('canvas')
    textureCanvas.width = image.naturalWidth || image.width
    textureCanvas.height = image.naturalHeight || image.height

    const textureCtx = textureCanvas.getContext('2d', { willReadFrequently: true })
    textureCtx.drawImage(image, 0, 0, textureCanvas.width, textureCanvas.height)

    earthTextureWidth = textureCanvas.width
    earthTextureHeight = textureCanvas.height
    earthTextureData = textureCtx.getImageData(0, 0, earthTextureWidth, earthTextureHeight).data
    earthTextureState = 'ready'
    drawGlobe(performance.now())
  }
  image.onerror = () => {
    earthTextureState = 'failed'
    drawGlobe(performance.now())
  }
  image.src = EARTH_TEXTURE_URL
}

const resizeCanvas = () => {
  const canvas = canvasRef.value
  const wrap = wrapRef.value
  if (!canvas || !wrap) return

  const rect = wrap.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  renderPixelRatio = dpr
  width = rect.width
  height = rect.height
  centerX = width / 2
  centerY = height / 2 + 4
  radius = Math.min(width, height) * 0.42
  canvas.width = Math.max(1, Math.floor(width * dpr))
  canvas.height = Math.max(1, Math.floor(height * dpr))
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  ctx = canvas.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
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
    ctx.fillStyle = 'rgba(28, 126, 153, 0.22)'
    ctx.strokeStyle = 'rgba(112, 228, 255, 0.22)'
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
    earthFrameCtx.imageSmoothingEnabled = true
    earthFrameCtx.imageSmoothingQuality = 'high'
  }

  const frame = earthFrameCtx.createImageData(diameter, diameter)
  const output = frame.data
  const texture = earthTextureData
  const textureStride = earthTextureWidth * 4

  for (let y = 0; y < diameter; y += 1) {
    const sphereY = 1 - (y + 0.5) / sphereRadius

    for (let x = 0; x < diameter; x += 1) {
      const sphereX = (x + 0.5) / sphereRadius - 1
      const distanceSquared = sphereX * sphereX + sphereY * sphereY
      const outputIndex = (y * diameter + x) * 4

      if (distanceSquared > 1) {
        output[outputIndex + 3] = 0
        continue
      }

      const sphereZ = Math.sqrt(1 - distanceSquared)
      const latitude = Math.asin(sphereY) / DEG
      const rotatedLongitude = Math.atan2(sphereX, sphereZ) / DEG
      const longitude = rotatedLongitude - rotation
      const wrappedLongitude = ((longitude + 540) % 360) - 180
      const textureU = ((wrappedLongitude + 180) / 360) * (earthTextureWidth - 1)
      const textureV = ((90 - latitude) / 180) * (earthTextureHeight - 1)
      const textureX0 = Math.floor(textureU)
      const textureY0 = Math.floor(textureV)
      const textureX1 = (textureX0 + 1) % earthTextureWidth
      const textureY1 = Math.min(earthTextureHeight - 1, textureY0 + 1)
      const mixX = textureU - textureX0
      const mixY = textureV - textureY0
      const topLeftIndex = textureY0 * textureStride + textureX0 * 4
      const topRightIndex = textureY0 * textureStride + textureX1 * 4
      const bottomLeftIndex = textureY1 * textureStride + textureX0 * 4
      const bottomRightIndex = textureY1 * textureStride + textureX1 * 4
      const topWeight = 1 - mixY
      const bottomWeight = mixY
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
      const light = illuminationAt(latitude, wrappedLongitude, sun.vector)
      const limbShade = 0.48 + sphereZ * 0.58
      const sunShade = 0.8 + Math.max(-0.2, Math.min(0.7, light)) * 0.16
      const shade = limbShade * sunShade

      output[outputIndex] = clampColor(enhanceContrast(red) * 0.82 * shade + 8)
      output[outputIndex + 1] = clampColor(enhanceContrast(green) * 0.95 * shade + 8)
      output[outputIndex + 2] = clampColor(enhanceContrast(blue) * 1.06 * shade + 12)
      output[outputIndex + 3] = Math.round(255 * Math.min(1, (1 - Math.sqrt(distanceSquared)) * sphereRadius * 2.2))
    }
  }

  earthFrameCtx.putImageData(frame, 0, 0)
  ctx.drawImage(earthFrameCanvas, centerX - radius, centerY - radius, radius * 2, radius * 2)
  return true
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
      source,
    })
  })
}

const drawGlobe = (time = 0) => {
  if (!ctx || !width || !height) return

  const elapsed = startTime ? (time - startTime) / 1000 : 0
  const rotation = reducedMotion ? -18 : -18 + elapsed * 2.1
  const sun = getSunPosition()
  const sunPoint = project(sun.latitude, sun.longitude, rotation)
  const antiSunPoint = project(-sun.latitude, sun.longitude + 180, rotation)

  ctx.clearRect(0, 0, width, height)

  const outerGlow = ctx.createRadialGradient(centerX, centerY, radius * 0.7, centerX, centerY, radius * 1.5)
  outerGlow.addColorStop(0, 'rgba(37, 185, 255, 0.08)')
  outerGlow.addColorStop(0.55, 'rgba(37, 185, 255, 0.05)')
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
    base.addColorStop(0, '#123f68')
    base.addColorStop(0.46, '#06274a')
    base.addColorStop(1, '#020a1b')
    ctx.fillStyle = base
    ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2)

    const dayGlow = ctx.createRadialGradient(
      sunPoint.visible ? sunPoint.x : centerX + radius * 0.25,
      sunPoint.visible ? sunPoint.y : centerY - radius * 0.15,
      0,
      sunPoint.visible ? sunPoint.x : centerX,
      sunPoint.visible ? sunPoint.y : centerY,
      radius * 1.28
    )
    dayGlow.addColorStop(0, 'rgba(88, 214, 255, 0.34)')
    dayGlow.addColorStop(0.42, 'rgba(37, 122, 202, 0.16)')
    dayGlow.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = dayGlow
    ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2)

    const nightShade = ctx.createRadialGradient(
      antiSunPoint.visible ? antiSunPoint.x : centerX - radius * 0.35,
      antiSunPoint.visible ? antiSunPoint.y : centerY + radius * 0.1,
      radius * 0.12,
      antiSunPoint.visible ? antiSunPoint.x : centerX,
      antiSunPoint.visible ? antiSunPoint.y : centerY,
      radius * 1.18
    )
    nightShade.addColorStop(0, 'rgba(0, 8, 25, 0.56)')
    nightShade.addColorStop(0.58, 'rgba(0, 8, 25, 0.24)')
    nightShade.addColorStop(1, 'rgba(0, 8, 25, 0)')
    ctx.fillStyle = nightShade
    ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2)

    drawContinents(rotation)
    drawGrid(rotation)
    drawCityLights(rotation, sun, time)
  }

  drawVisitorMarkers(rotation, time)

  ctx.restore()

  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(126, 236, 255, 0.45)'
  ctx.lineWidth = 1.2
  ctx.shadowColor = 'rgba(88, 232, 255, 0.3)'
  ctx.shadowBlur = 18
  ctx.stroke()
  ctx.shadowBlur = 0

  if (!reducedMotion) animationFrame = requestAnimationFrame(drawGlobe)
}

const handlePointerMove = (event) => {
  if (!wrapRef.value) return
  const rect = wrapRef.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  const marker = visibleMarkers.find((item) => {
    const distance = Math.hypot(item.x - x, item.y - y)
    return distance <= item.radius
  })

  if (!marker) {
    hideTooltip()
    return
  }

  tooltip.visible = true
  tooltip.x = Math.min(rect.width - 170, Math.max(12, marker.x + 14))
  tooltip.y = Math.min(rect.height - 70, Math.max(12, marker.y - 8))
  tooltip.country = marker.source.country
  tooltip.visits = Number.isFinite(marker.source.visits)
    ? `${marker.source.visits.toLocaleString()} visits`
    : 'Visits pending analytics'
}

const hideTooltip = () => {
  tooltip.visible = false
}

const handleMotionChange = () => {
  reducedMotion = Boolean(motionQuery?.matches)
  if (animationFrame) cancelAnimationFrame(animationFrame)
  animationFrame = 0
  drawGlobe(performance.now())
}

onMounted(() => {
  updateUtcLabel()
  utcTimer = window.setInterval(updateUtcLabel, 60000)

  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion = Boolean(motionQuery.matches)
  motionQuery.addEventListener?.('change', handleMotionChange)

  resizeCanvas()
  resizeObserver = new ResizeObserver(() => {
    resizeCanvas()
    drawGlobe(performance.now())
  })
  if (wrapRef.value) resizeObserver.observe(wrapRef.value)

  startTime = performance.now()
  loadEarthTexture()
  drawGlobe(startTime)
  void loadVisitorStats()
})

onUnmounted(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame)
  resizeObserver?.disconnect()
  motionQuery?.removeEventListener?.('change', handleMotionChange)
  if (utcTimer) window.clearInterval(utcTimer)
})
</script>

<style scoped>
.global-visitors {
  display: grid;
  grid-template-columns: minmax(240px, 1fr) minmax(180px, 0.58fr);
  gap: 16px;
  align-items: stretch;
  height: 260px;
  max-height: 260px;
  min-height: 0;
}

.globe-panel,
.visitor-stat-panel {
  border: 1px solid rgba(126, 236, 255, 0.16);
  border-radius: 18px;
  background:
    linear-gradient(135deg, rgba(12, 38, 70, 0.94), rgba(5, 18, 42, 0.9)),
    #06142c;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.03),
    0 18px 44px rgba(0, 0, 0, 0.22);
}

.globe-panel {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 11px;
  padding: 16px;
  min-height: 0;
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
  font-size: 17px;
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
  min-height: 0;
  height: 100%;
  overflow: hidden;
  border: 1px solid rgba(126, 236, 255, 0.1);
  border-radius: 16px;
  background:
    radial-gradient(circle at 50% 42%, rgba(67, 130, 255, 0.18), transparent 55%),
    radial-gradient(circle at 18% 22%, rgba(126, 236, 255, 0.08), transparent 32%),
    #030b1d;
}

.global-globe-canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.utc-chip {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 5px 9px;
  border: 1px solid rgba(126, 236, 255, 0.16);
  border-radius: 999px;
  background: rgba(3, 11, 29, 0.72);
  color: rgba(216, 235, 255, 0.72);
  font-size: 11px;
  font-weight: 750;
  line-height: 1;
  backdrop-filter: blur(8px);
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
  gap: 10px;
  padding: 16px;
  min-height: 0;
  overflow: hidden;
}

.visitor-stat-panel dl {
  display: grid;
  gap: 10px;
  margin: 0;
}

.visitor-stat-panel div {
  display: grid;
  gap: 3px;
  padding-bottom: 9px;
  border-bottom: 1px solid rgba(126, 236, 255, 0.1);
}

.visitor-stat-panel div:last-child {
  padding-bottom: 0;
  border-bottom: 0;
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

@media (max-width: 980px) {
  .global-visitors {
    grid-template-columns: 1fr;
    height: auto;
    max-height: none;
  }

  .globe-canvas-wrap {
    height: 210px;
  }
}

@media (max-width: 560px) {
  .globe-panel,
  .visitor-stat-panel {
    padding: 15px;
  }

  .globe-canvas-wrap {
    height: 180px;
  }
}
</style>

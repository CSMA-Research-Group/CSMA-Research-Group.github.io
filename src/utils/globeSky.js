const DEG = Math.PI / 180

export const vectorFromLatLng = (latitude, longitude) => {
  const lat = latitude * DEG
  const lng = longitude * DEG
  return { x: Math.cos(lat) * Math.sin(lng), y: Math.sin(lat), z: Math.cos(lat) * Math.cos(lng) }
}

// NOAA's approximate solar declination and equation-of-time equations.
// https://gml.noaa.gov/grad/solcalc/solareqns.PDF
// UTC is used throughout: changing the viewer's time zone must not move the Sun.
export const getSunPosition = (now = new Date()) => {
  const year = now.getUTCFullYear()
  const yearStart = Date.UTC(year, 0, 1)
  const yearDays = (Date.UTC(year + 1, 0, 1) - yearStart) / 86400000
  const day = Math.floor((now.getTime() - yearStart) / 86400000) + 1
  const hour = now.getUTCHours() + now.getUTCMinutes() / 60 + now.getUTCSeconds() / 3600
  const gamma = 2 * Math.PI / yearDays * (day - 1 + (hour - 12) / 24)
  const equationOfTime = 229.18 * (
    0.000075 + 0.001868 * Math.cos(gamma) - 0.032077 * Math.sin(gamma)
    - 0.014615 * Math.cos(2 * gamma) - 0.040849 * Math.sin(2 * gamma)
  )
  const declination = 0.006918 - 0.399912 * Math.cos(gamma) + 0.070257 * Math.sin(gamma)
    - 0.006758 * Math.cos(2 * gamma) + 0.000907 * Math.sin(2 * gamma)
    - 0.002697 * Math.cos(3 * gamma) + 0.00148 * Math.sin(3 * gamma)
  const latitude = declination / DEG
  const longitude = ((180 - hour * 15 - equationOfTime / 4 + 540) % 360) - 180
  return { latitude, longitude, vector: vectorFromLatLng(latitude, longitude) }
}

export const rotateSunVector = (vector, rotationDegrees) => {
  const rotation = rotationDegrees * DEG
  const cosine = Math.cos(rotation)
  const sine = Math.sin(rotation)
  return { x: vector.x * cosine + vector.z * sine, y: vector.y, z: vector.z * cosine - vector.x * sine }
}

// Smooth twilight, with enough ambient light to keep the night hemisphere legible.
export const daylightBrightness = (light) => {
  const t = Math.max(0, Math.min(1, (light + 0.12) / 0.3))
  const daylight = t * t * (3 - 2 * t)
  return 0.38 + 0.62 * daylight + 0.05 * Math.max(0, Math.min(1, light))
}

export const createMeteor = (time, width, height, random = Math.random) => {
  const direction = random() < 0.5 ? 1 : -1
  return {
    start: time,
    duration: 1400 + random() * 700,
    x: width * (direction > 0 ? 0.03 + random() * 0.32 : 0.65 + random() * 0.32),
    y: height * (0.04 + random() * 0.12),
    dx: direction * width * (0.2 + random() * 0.22),
    dy: height * (0.2 + random() * 0.22),
    tail: Math.min(90, width * 0.18),
  }
}

export const meteorFrame = (meteor, time) => {
  if (!meteor || time < meteor.start || time > meteor.start + meteor.duration) return null
  const progress = (time - meteor.start) / meteor.duration
  const distance = Math.hypot(meteor.dx, meteor.dy)
  const x = meteor.x + meteor.dx * progress
  const y = meteor.y + meteor.dy * progress
  return {
    x, y,
    tailX: x - meteor.dx / distance * meteor.tail,
    tailY: y - meteor.dy / distance * meteor.tail,
    opacity: Math.sin(progress * Math.PI) * 0.8,
  }
}

// A visible head or bright trail sample must be on screen and clear of the
// foreground globe and clock cards. This is scene visibility, not gaze tracking.
export const isMeteorVisible = (frame, { viewport, sphere, obstacles = [] }) => {
  if (!frame || frame.opacity < 0.3) return false
  const inside = (x, y, rect) => x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
  return [1, 0.8, 0.6].some(portion => {
    const x = frame.tailX + (frame.x - frame.tailX) * portion
    const y = frame.tailY + (frame.y - frame.tailY) * portion
    return inside(x, y, viewport)
      && Math.hypot(x - sphere.x, y - sphere.y) > sphere.radius + 3
      && !obstacles.some(rect => inside(x, y, rect))
  })
}

export const createCityClockFormatter = (timeZone) => {
  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  })
  const date = new Intl.DateTimeFormat('en-GB', { timeZone, day: '2-digit', month: 'short' })
  const offset = new Intl.DateTimeFormat('en-GB', { timeZone, timeZoneName: 'shortOffset' })

  return (now) => ({
    time: time.format(now),
    date: date.format(now),
    offset: offset.formatToParts(now).find(part => part.type === 'timeZoneName').value
      .replace('GMT', 'UTC').replace(/^UTC[+-]0{1,2}(?::00)?$/, 'UTC'),
    instant: now.toISOString(),
  })
}

// Keep a round-robin queue, deferring cities whose current UTC offset duplicates
// another clock. Repeated calls within a minute refresh time without rotating.
export const createWorldClockRotation = (cities, corners) => {
  const formatters = new Map(cities.map(city => [city.id, createCityClockFormatter(city.timeZone)]))
  let queue = [...cities]
  let selected = []
  let lastMinute = null

  return (now) => {
    const minute = Math.floor(now.getTime() / 60000)
    const values = new Map(cities.map(city => [city.id, formatters.get(city.id)(now)]))
    if (minute !== lastMinute) {
      const previous = new Set(selected.map(city => city.id))
      const candidates = [...queue.filter(city => !previous.has(city.id)), ...queue.filter(city => previous.has(city.id))]
      const offsets = new Set()
      selected = []
      for (const city of candidates) {
        const offset = values.get(city.id).offset
        if (offsets.has(offset)) continue
        selected.push(city)
        offsets.add(offset)
        if (selected.length === corners.length) break
      }
      const chosen = new Set(selected.map(city => city.id))
      queue = [...queue.filter(city => !chosen.has(city.id)), ...queue.filter(city => chosen.has(city.id))]
      lastMinute = minute
    }
    return selected.map((city, index) => ({ ...city, corner: corners[index], ...values.get(city.id) }))
  }
}

// Keep the whole local-time chip in the open band between the corner clocks.
export const localClockBounds = (width, height, chipWidth, chipHeight, cornerHeight, padding = 12) => {
  const inset = cornerHeight + padding * 2
  const minX = Math.min(padding, Math.max(0, width - chipWidth))
  const minY = Math.min(inset, Math.max(0, height - chipHeight))
  return {
    minX,
    maxX: Math.max(minX, width - chipWidth - padding),
    minY,
    maxY: Math.max(minY, height - inset - chipHeight),
  }
}

export const clampClockPosition = (point, bounds) => ({
  x: Math.min(bounds.maxX, Math.max(bounds.minX, point.x)),
  y: Math.min(bounds.maxY, Math.max(bounds.minY, point.y)),
})

export const nextClockPosition = (bounds, current, random = Math.random) => {
  const spanX = bounds.maxX - bounds.minX
  const spanY = bounds.maxY - bounds.minY
  const minDistance = Math.hypot(spanX, spanY) * 0.3
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const point = { x: bounds.minX + random() * spanX, y: bounds.minY + random() * spanY }
    if (Math.hypot(point.x - current.x, point.y - current.y) >= minDistance) return point
  }
  return {
    x: current.x < (bounds.minX + bounds.maxX) / 2 ? bounds.maxX : bounds.minX,
    y: current.y < (bounds.minY + bounds.maxY) / 2 ? bounds.maxY : bounds.minY,
  }
}

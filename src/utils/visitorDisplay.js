export const toFiniteNumber = (value) => {
  if (value === null || value === undefined || value === '') return null
  if (typeof value === 'boolean') return null
  if (typeof value === 'string' && !value.trim()) return null
  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

export const toFiniteCoordinate = (value, min, max) => {
  const coordinate = toFiniteNumber(value)
  return coordinate !== null && coordinate >= min && coordinate <= max
    ? coordinate
    : null
}

export const formatStatCount = (value, fallback = 'Unavailable') => {
  const count = toFiniteNumber(value)
  return count !== null && count >= 0
    ? Math.trunc(count).toLocaleString('en-US')
    : fallback
}

export const formatVisitorNumber = (value, fallback = 'Unavailable') => {
  const visitorNumber = toFiniteNumber(value)
  return visitorNumber !== null && visitorNumber > 0
    ? `#${Math.trunc(visitorNumber).toLocaleString('en-US')}`
    : fallback
}

export const isValidTimeZone = (timeZone) => {
  if (!timeZone) return false

  try {
    new Intl.DateTimeFormat('en', { timeZone }).format()
    return true
  } catch {
    return false
  }
}

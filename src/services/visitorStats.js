const VISITOR_ID_KEY = 'csma_visitor_id'
const REQUEST_TIMEOUT_MS = 8000

const getVisitorApiBase = () => {
  const base = import.meta.env.VITE_VISITOR_API_BASE
  return typeof base === 'string' ? base.replace(/\/+$/, '') : ''
}

const createVisitorId = () => {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID()

  const randomPart = Math.random().toString(36).slice(2)
  const timePart = Date.now().toString(36)
  return `${timePart}-${randomPart}`
}

export const getOrCreateVisitorId = () => {
  if (typeof window === 'undefined') return ''

  try {
    const existing = window.localStorage.getItem(VISITOR_ID_KEY)
    if (existing) return existing

    const visitorId = createVisitorId()
    window.localStorage.setItem(VISITOR_ID_KEY, visitorId)
    return visitorId
  } catch {
    return createVisitorId()
  }
}

const readJson = async (response) => {
  try {
    return await response.json()
  } catch {
    return null
  }
}

const fetchWithTimeout = async (url, options = {}) => {
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    return await fetch(url, {
      ...options,
      credentials: 'omit',
      signal: controller.signal,
    })
  } finally {
    window.clearTimeout(timeoutId)
  }
}

const getReferrerOrigin = () => {
  if (!document.referrer) return ''

  try {
    return new URL(document.referrer).origin
  } catch {
    return ''
  }
}

export const fetchVisitorStats = async () => {
  const apiBase = getVisitorApiBase()
  if (!apiBase) return null

  try {
    const response = await fetchWithTimeout(`${apiBase}/api/visitor/stats`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) return null

    const data = await readJson(response)
    return data?.ok ? data : null
  } catch {
    return null
  }
}

export const trackVisitor = async () => {
  if (typeof window === 'undefined') return null

  const visitorId = getOrCreateVisitorId()
  const apiBase = getVisitorApiBase()
  if (!apiBase) return null

  try {
    const response = await fetchWithTimeout(`${apiBase}/api/visitor/track`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        visitorId,
        path: `${window.location.pathname}${window.location.hash}`,
        referrer: getReferrerOrigin(),
      }),
    })

    if (!response.ok) return fetchVisitorStats()

    const data = await readJson(response)
    return data?.ok ? data : fetchVisitorStats()
  } catch {
    return fetchVisitorStats()
  }
}

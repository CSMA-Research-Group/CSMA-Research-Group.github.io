const VISITOR_ID_KEY = 'csma_visitor_id'

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

export const trackVisitor = async () => {
  if (typeof window === 'undefined') return null

  const visitorId = getOrCreateVisitorId()
  const apiBase = getVisitorApiBase()
  if (!apiBase) return null

  try {
    const response = await fetch(`${apiBase}/api/visitor/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        visitorId,
        path: window.location.pathname,
        referrer: document.referrer || '',
      }),
    })

    if (!response.ok) return null

    const data = await readJson(response)
    return data?.ok ? data : null
  } catch {
    return null
  }
}

export const fetchVisitorStats = async () => {
  const apiBase = getVisitorApiBase()
  if (!apiBase) return null

  try {
    const response = await fetch(`${apiBase}/api/visitor/stats`, {
      method: 'GET',
    })

    if (!response.ok) return null

    const data = await readJson(response)
    return data?.ok ? data : null
  } catch {
    return null
  }
}

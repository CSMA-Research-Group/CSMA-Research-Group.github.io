import { navigationItems } from './site'
import { publications } from './publications'

// The Chinese edition currently has a notice page. Keep the return link local.
const englishPaths = new Set([
  '/',
  ...navigationItems.map(item => item.path),
  ...publications.map(paper => `/publications/${paper.id}`),
  ...publications.filter(paper => paper.systemId).map(paper => `/projects/${paper.systemId}`),
])

export const englishReturnTarget = (value) => {
  if (typeof value !== 'string') return '/'
  const [path, anchor, extra] = value.split('#')
  if (!englishPaths.has(path) || extra !== undefined) return '/'
  if (anchor !== undefined && !/^[a-zA-Z0-9_-]+$/.test(anchor)) return '/'
  return value
}

import { computed, ref } from 'vue'
import { messages } from './messages.js'

// English source copy remains canonical. Only display copy is translated;
// identifiers, publication metadata, links, statuses and filtering stay shared.
export const locale = ref('en')
export const isChinese = computed(() => locale.value === 'zh')
export const preferenceKey = 'csma-language'
export const normalizeText = value => value.replace(/\s+/g, ' ').trim()

export function translate(value, language = locale.value, params = {}) {
  if (typeof value !== 'string') return value
  const key = normalizeText(value)
  let result = language === 'zh' ? messages[key] : undefined
  if (result === undefined) {
    // Lists use the same glossary as their individual tags.
    result = language === 'zh' && value.includes('\n\n')
      ? value.split('\n\n').map(part => translate(part, language)).join('\n\n')
      : language === 'zh' && value.includes(' · ')
      ? value.split(' · ').map(part => translate(part, language)).join(' · ')
      : value
  }
  return result.replace(/\{(\w+)\}/g, (match, name) => params[name] ?? match)
}

export const t = (value, params) => translate(value, locale.value, params)
export const languageFromPath = path => /^\/zh(?:\/|$)/.test(path) ? 'zh' : 'en'
export const unlocalizedPath = path => path.replace(/^\/zh(?=\/|$)/, '') || '/'

export function localizedPath(target, language = locale.value) {
  if (typeof target === 'object') {
    if (target.path) return { ...target, path: localizedPath(target.path, language) }
    if (target.name) return { ...target, name: language === 'zh' ? `zh-${String(target.name).replace(/^zh-/, '')}` : String(target.name).replace(/^zh-/, '') }
    return target
  }
  if (typeof target !== 'string' || !target.startsWith('/') || target.startsWith('//')) return target
  const split = target.search(/[?#]/)
  const path = unlocalizedPath(split < 0 ? target : target.slice(0, split))
  const suffix = split < 0 ? '' : target.slice(split)
  return `${language === 'zh' ? '/zh' + (path === '/' ? '' : path) : path}${suffix}`
}

export function readPreference(storage) {
  try {
    const saved = (storage ?? window.localStorage).getItem(preferenceKey)
    return saved === 'zh' || saved === 'en' ? saved : 'en'
  } catch { return 'en' }
}

export function rememberLanguage(language, storage) {
  try { (storage ?? window.localStorage).setItem(preferenceKey, language) } catch { /* Private browsing may disable storage. */ }
}

export function formatMonth(date) {
  return new Intl.DateTimeFormat(isChinese.value ? 'zh-CN' : 'en', {
    month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(date.length === 7 ? `${date}-01T00:00:00Z` : `${date}T00:00:00Z`))
}

export function regionName(code, fallback) {
  if (!isChinese.value || !/^[A-Z]{2}$/.test(code || '')) return fallback
  try { return new Intl.DisplayNames(['zh-CN'], { type: 'region' }).of(code) || fallback } catch { return fallback }
}

import assert from 'node:assert/strict'
import { before, after, test } from 'node:test'
import { createServer } from 'vite'
import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { createMemoryHistory } from 'vue-router'
import { parse } from '@vue/compiler-dom'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { translate, localizedPath, readPreference, rememberLanguage, preferenceKey } from '../src/i18n/index.js'
import { publications } from '../src/data/publications.js'
import { peopleSections } from '../src/data/people.js'
import { formatPublicationAuthors } from '../src/utils/publicationDisplay.js'

let server
let routes
let createSiteRouter
const rendered = new Map()

function readHTML(html) {
  const texts = [], links = [], images = [], ids = []
  function walk(node) {
    if (node.type === 2 && node.content.trim()) texts.push(node.content.replace(/\s+/g, ' ').trim())
    if (node.type === 1) {
      const attrs = Object.fromEntries(node.props.filter(p => p.type === 6).map(p => [p.name, p.value?.content]))
      for (const key of ['alt', 'aria-label', 'title']) if (attrs[key]) texts.push(attrs[key])
      if (node.tag === 'a') links.push(attrs)
      if (node.tag === 'img') images.push(attrs)
      if (attrs.id) ids.push(attrs.id)
    }
    for (const child of node.children || []) walk(child)
  }
  walk(parse(html))
  return { texts, links, images, ids }
}

before(async () => {
  // Rendering has no network listener and does not mount analytics or timers.
  server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' })
  const { default: App } = await server.ssrLoadModule('/src/App.vue')
  ;({ routes, createSiteRouter } = await server.ssrLoadModule('/src/router/index.js'))
  for (const route of routes.filter(route => route.component)) {
    const router = createSiteRouter(createMemoryHistory())
    await router.push(route.path)
    await router.isReady()
    rendered.set(route.path, readHTML(await renderToString(createSSRApp(App).use(router))))
  }
})

after(async () => { await server?.close() })

test('every English page has a Chinese counterpart with the same content record', () => {
  const english = routes.filter(route => route.component && route.meta.language === 'en')
  assert.equal(english.length, 32)
  for (const route of english) {
    const counterpart = routes.find(item => item.path === localizedPath(route.path, 'zh'))
    assert.equal(counterpart.component, route.component, route.path)
    assert.deepEqual(counterpart.props, route.props, route.path)
    assert.ok(rendered.get(counterpart.path).texts.some(text => /[\u3400-\u9fff]/.test(text)), route.path)
  }
})

test('Chinese navigation stays in Chinese; deep links preserve query and anchor', () => {
  const target = { path: '/publications/semfaith-pricai-2026', query: { ref: 'shared' }, hash: '#overview' }
  const translated = localizedPath(target, 'zh')
  assert.deepEqual(translated, { ...target, path: '/zh/publications/semfaith-pricai-2026' })
  assert.deepEqual(localizedPath(translated, 'en'), target)
  assert.equal(localizedPath('/zh/projects/cmcs?ref=paper#workflow', 'en'), '/projects/cmcs?ref=paper#workflow')
  for (const [path, page] of rendered) {
    if (!path.startsWith('/zh')) continue
    for (const link of page.links) {
      if (link.hreflang || !link.href?.startsWith('/') || link.href.startsWith('/src/assets/')) continue
      assert.match(link.href, /^\/zh(?:\/|#|$)/, `${path}: ${link.href}`)
      const router = createSiteRouter(createMemoryHistory())
      assert.ok(router.resolve(link.href).matched.some(route => !route.path.includes(':pathMatch')), `${path}: broken ${link.href}`)
    }
  }
})

test('all Chinese rendered copy is translated except explicit names and publication metadata', () => {
  const allowed = new Set(['English', 'CSMA', 'GitHub', 'W', 'X', 'X:', '@jiangpinghuang', 'Language / 语言', 'CMCS', 'TraceCoder', 'SemFaith', 'KGMAF', 'ChatREQ', 'CCF A', 'CCF C'])
  for (const section of peopleSections) for (const person of section.people) {
    allowed.add(person.name)
    if (person.email) allowed.add(person.email)
  }
  allowed.add('hjpwhu@gmail.com')
  for (const paper of publications) {
    for (const text of [paper.title, paper.venue, paper.venueFullName, paper.authors.join(', '), formatPublicationAuthors(paper.authors), `${paper.venue} ${paper.year}`, `${paper.venue} · ${paper.rating}`, `· ${paper.venue}`]) allowed.add(text)
  }
  for (const [path, page] of rendered) {
    if (!path.startsWith('/zh')) continue
    const missing = page.texts.filter(text => /[a-zA-Z]/.test(text) && !/[\u3400-\u9fff]/.test(text) && !allowed.has(text))
    assert.deepEqual(missing, [], `${path}: untranslated copy`)
  }
})

test('all Chinese pages link to existing sections with equivalent English destinations', () => {
  const router = createSiteRouter(createMemoryHistory())
  for (const path of [...rendered.keys()].filter(path => path.startsWith('/zh'))) {
    for (const { href } of rendered.get(path).links) {
      if (!href?.startsWith('/zh')) continue
      const destination = router.resolve(href)
      const page = rendered.get(destination.path)
      assert.ok(page, `${path}: missing destination ${href}`)
      if (destination.hash) assert.ok(page.ids.includes(decodeURIComponent(destination.hash.slice(1))), `${path}: missing section ${href}`)
      const englishDestination = router.resolve(localizedPath(href, 'en'))
      const englishPage = rendered.get(englishDestination.path)
      assert.ok(englishPage, `${path}: missing English counterpart ${href}`)
      if (englishDestination.hash) assert.ok(englishPage.ids.includes(decodeURIComponent(englishDestination.hash.slice(1))), `${path}: missing English section ${href}`)
    }
  }
})

test('all rendered local images and downloads exist and page identifiers are unique', () => {
  const root = new URL('../', import.meta.url)
  for (const [path, page] of rendered) {
    assert.equal(new Set(page.ids).size, page.ids.length, `${path}: duplicate page identifiers`)
    for (const image of page.images) assert.notEqual(image.alt, undefined, `${path}: image without alternative text`)
    const assets = [...page.images.map(image => image.src), ...page.links.map(link => link.href).filter(href => /\.(pdf|png|jpe?g|svg|webp)(?:\?|$)/i.test(href || ''))]
    for (const asset of assets) {
      if (!asset?.startsWith('/') || asset.startsWith('//')) continue
      const localPath = decodeURIComponent(asset.split(/[?#]/)[0]).replace(/^\//, '')
      const file = fileURLToPath(new URL(localPath.startsWith('src/') ? localPath : `public/${localPath}`, root))
      assert.ok(existsSync(file), `${path}: missing local asset ${asset}`)
    }
  }
})

test('member email, portrait and publication identity survive language changes', () => {
  for (const person of peopleSections.find(section => section.id === 'group-members').people.filter(person => person.portrait)) {
    const en = rendered.get(`/people/${person.id}`)
    const zh = rendered.get(`/zh/people/${person.id}`)
    assert.ok(zh.texts.includes(person.name))
    assert.deepEqual(zh.images.map(image => image.src), en.images.map(image => image.src), person.id)
    assert.deepEqual(zh.links.filter(link => link.href?.startsWith('mailto:')).map(link => link.href), en.links.filter(link => link.href?.startsWith('mailto:')).map(link => link.href), person.id)
    assert.equal(zh.links.find(link => link.href === `mailto:${person.email}`)['aria-label'], `给 ${person.name} 发送邮件`)
  }
  for (const paper of publications) assert.ok(rendered.get(`/zh/publications/${paper.id}`).texts.includes(paper.title))
  assert.ok(rendered.get('/zh/people/weidong-yuan').texts.includes('· 已录用'))
})

test('language preference works when storage is unavailable and translations keep numeric values', () => {
  const data = new Map()
  const storage = { getItem: key => data.get(key), setItem: (key, value) => data.set(key, value) }
  assert.equal(readPreference(storage), 'en')
  rememberLanguage('zh', storage)
  assert.equal(data.get(preferenceKey), 'zh')
  assert.equal(readPreference(storage), 'zh')
  const blocked = { getItem() { throw Error('blocked') }, setItem() { throw Error('blocked') } }
  assert.equal(readPreference(blocked), 'en')
  assert.doesNotThrow(() => rememberLanguage('zh', blocked))
  assert.equal(translate('{count} visitors', 'zh', { count: '12,345' }), '12,345 位访客')
  assert.equal(translate('Accepted', 'zh'), '已录用')
  assert.equal(translate('Accepted', 'en'), 'Accepted')
  assert.equal(translate('mailto:user@example.com', 'zh'), 'mailto:user@example.com')
})

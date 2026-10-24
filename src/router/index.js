import { createRouter, createWebHashHistory, createMemoryHistory } from 'vue-router'
import { locale, languageFromPath, localizedPath, unlocalizedPath, readPreference, t } from '../i18n'

import Home from '../views/Home.vue'
import Research from '../views/Research.vue'
import Projects from '../views/Projects.vue'
import Publications from '../views/Publications.vue'
import People from '../views/People.vue'
import News from '../views/News.vue'
import NewsArchive from '../views/NewsArchive.vue'
import Alumni from '../views/Alumni.vue'
import Resources from '../views/Resources.vue'
import InsightDetail from '../views/InsightDetail.vue'
import About from '../views/About.vue'
import PublicationDetail from '../views/PublicationDetail.vue'
import SystemDetail from '../views/SystemDetail.vue'
import PersonDetail from '../views/PersonDetail.vue'
import { peopleProfiles } from '../data/peopleHierarchy'
import { publications } from '../data/publications'
import { systemProfiles } from '../data/systems'
import { researchInsights } from '../data/researchInsights'

const defaultDescription =
  'CSMA Research Group studies cognitive and collaborative intelligence for intelligent software, robotics, and grounded applications.'

const canonicalRoutes = [
  ...researchInsights.items.map(article => ({
    path: `/resources/insights/${article.id}`,
    name: `insight-${article.id}`,
    component: InsightDetail,
    props: { article },
    meta: { title: `${article.title} | CSMA Research Group`, description: article.description },
  })),
  ...peopleProfiles.map(person => ({
    path: person.profilePath,
    name: `person-${person.id}`,
    component: PersonDetail,
    props: { person },
    meta: { title: `${person.name} | CSMA Research Group`, description: person.fictional ? 'Fictional profile for layout preview; confirmed information is pending.' : person.placeholder ? 'Profile details awaiting confirmation.' : person.summary },
  })),
  ...publications.map(paper => ({
    path: `/publications/${paper.id}`,
    name: `paper-${paper.id}`,
    component: PublicationDetail,
    props: { paper },
    meta: { title: `${paper.title} | CSMA Research Group`, description: paper.abstractSummary },
  })),
  ...systemProfiles.map(system => ({
    path: `/projects/${system.id}`,
    name: `system-${system.id}`,
    component: SystemDetail,
    props: { system },
    meta: { title: `${system.title} | CSMA Research Group`, description: system.description },
  })),
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { title: 'CSMA Research Group', description: defaultDescription },
  },
  {
    path: '/research',
    name: 'research',
    component: Research,
    meta: {
      title: 'Research | CSMA Research Group',
      description: 'Research on cognitive intelligence, collaborative agents, intelligent software engineering, robotics, and grounded applications.',
    },
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects,
    meta: { title: 'Projects | CSMA Research Group', description: 'Research prototypes and ongoing system directions from CSMA Research Group.' },
  },
  {
    path: '/publications',
    name: 'publications',
    component: Publications,
    meta: { title: 'Publications | CSMA Research Group', description: 'Verified publications from CSMA Research Group and collaborators.' },
  },
  {
    path: '/people',
    name: 'people',
    component: People,
    meta: { title: 'People | CSMA Research Group', description: 'Members studying artificial intelligence, intelligent software engineering, intelligent robotics, and their real-world applications.' },
  },
  {
    path: '/people/alumni',
    name: 'alumni',
    component: Alumni,
    meta: { title: 'Alumni | CSMA Research Group', description: 'Former members of CSMA Research Group and their next steps.' },
  },
  {
    path: '/news',
    name: 'news',
    component: News,
    meta: { title: 'News | CSMA Research Group', description: 'Verified publication, conference, project, and group updates from CSMA.' },
  },
  {
    path: '/news/archive',
    name: 'news-archive',
    component: NewsArchive,
    meta: { title: 'News Archive | CSMA Research Group', description: 'Publication news and research updates from CSMA Research Group, organized by year.' },
  },
  {
    path: '/resources',
    name: 'resources',
    component: Resources,
    meta: { title: 'Resources | CSMA Research Group', description: 'Research applications, technical articles, research perspectives, and public repositories from CSMA Research Group.' },
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: { title: 'About | CSMA Research Group', description: 'About CSMA Research Group, its research focus, vision and mission, contact details, and joining information.' },
  },
  { path: '/join-us', redirect: '/people#join-us' },
  { path: '/contact', redirect: '/about#contact' },
  { path: '/highlights', redirect: '/research' },
  { path: '/seminars', redirect: '/news' },
  { path: '/positions', redirect: '/people#join-us' },
  { path: '/gallery', redirect: '/resources' },
]

export const routes = [
  ...canonicalRoutes.map(route => ({ ...route, meta: { ...route.meta, language: 'en' } })),
  ...canonicalRoutes.map(route => ({
    ...route,
    path: localizedPath(route.path, 'zh'),
    ...(route.name ? { name: `zh-${route.name}` } : {}),
    ...(route.redirect ? { redirect: localizedPath(route.redirect, 'zh') } : {}),
    meta: { ...route.meta, language: 'zh' },
  })),
  { path: '/zh/:pathMatch(.*)*', redirect: '/zh' },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export function createSiteRouter(history) {
  // Capture the original URL before hash history writes its default #/.
  const bareEntry = typeof window !== 'undefined' && !window.location.hash
  const router = createRouter({
    history: history ?? (typeof window === 'undefined' ? createMemoryHistory() : createWebHashHistory()),
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) return savedPosition
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      const path = unlocalizedPath(to.path)
      if (path === '/research' && ['#multi-agent-cognitive-ai', '#knowledge-human-loop-ai'].includes(to.hash)) return { el: '#artificial-intelligence', behavior, top: 96 }
      if (path === '/people') {
        if (to.hash.startsWith('#profile-')) return { el: to.hash.replace('#profile-', '#'), behavior, top: 96 }
        const legacySections = { '#advisors': '#members', '#faculty-advisors': '#members', '#group-members': '#members', '#graduate-students': '#members', '#undergraduate-students': '#members' }
        if (legacySections[to.hash]) return { el: legacySections[to.hash], behavior, top: 96 }
      }
      if (to.hash) return { el: to.hash, behavior, top: 96 }
      return { top: 0 }
    },
  })

  // Only a bare site entry follows a remembered choice. Explicit shared English
  // or Chinese URLs always win, including /#/ for the English homepage.
  router.beforeEach((to, from) => {
    if (bareEntry && !from.matched.length && to.path === '/' && readPreference() === 'zh') {
      return { path: '/zh', query: to.query, hash: to.hash, replace: true }
    }
  })

  router.afterEach((to, from, failure) => {
    if (failure) return
    locale.value = languageFromPath(to.path)
    if (typeof document === 'undefined') return
    document.documentElement.lang = locale.value === 'zh' ? 'zh-CN' : 'en'
    document.title = (to.meta.title || 'CSMA Research Group').split(' | ').map(part => t(part)).join(' | ')
    const description = document.querySelector('meta[name="description"]')
    description?.setAttribute('content', t(to.meta.description || defaultDescription))
  })

  return router
}

export default createSiteRouter()

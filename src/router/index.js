import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Research from '../views/Research.vue'
import Projects from '../views/Projects.vue'
import Publications from '../views/Publications.vue'
import People from '../views/People.vue'
import News from '../views/News.vue'
import Resources from '../views/Resources.vue'
import About from '../views/About.vue'

const defaultDescription =
  'CSMA Research Group studies cognitive and collaborative intelligence for intelligent software, robotics, and grounded applications.'

const routes = [
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
    meta: { title: 'People | CSMA Research Group', description: 'Group members, student researchers, collaborators, alumni, and joining information.' },
  },
  {
    path: '/news',
    name: 'news',
    component: News,
    meta: { title: 'News | CSMA Research Group', description: 'Verified publication, conference, project, and group updates from CSMA.' },
  },
  {
    path: '/resources',
    name: 'resources',
    component: Resources,
    meta: { title: 'Resources | CSMA Research Group', description: 'Public code and repositories from CSMA, with forthcoming datasets, tools, courses, documents, and demos clearly marked.' },
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: { title: 'About | CSMA Research Group', description: 'About CSMA Research Group, its research vision, affiliation, contact details, and joining information.' },
  },
  { path: '/join-us', redirect: '/people#join-us' },
  { path: '/contact', redirect: '/about#contact' },
  { path: '/highlights', redirect: '/research' },
  { path: '/seminars', redirect: '/news' },
  { path: '/positions', redirect: '/people#join-us' },
  { path: '/gallery', redirect: '/resources' },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    if (to.hash) return { el: to.hash, behavior, top: 96 }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title || 'CSMA Research Group'
  const description = document.querySelector('meta[name="description"]')
  description?.setAttribute('content', to.meta.description || defaultDescription)
})

export default router

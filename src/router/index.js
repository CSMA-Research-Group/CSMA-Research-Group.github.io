import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Research from '../views/Research.vue'
import Projects from '../views/Projects.vue'
import Publications from '../views/Publications.vue'
import People from '../views/People.vue'
import News from '../views/News.vue'
import Resources from '../views/Resources.vue'
import About from '../views/About.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/research', name: 'research', component: Research },
  { path: '/projects', name: 'projects', component: Projects },
  { path: '/publications', name: 'publications', component: Publications },
  { path: '/people', name: 'people', component: People },
  { path: '/news', name: 'news', component: News },
  { path: '/resources', name: 'resources', component: Resources },
  { path: '/about', name: 'about', component: About },
  { path: '/join-us', redirect: '/people#join-us' },
  { path: '/contact', redirect: '/about' },
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
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 96 }
    return { top: 0 }
  },
})

export default router

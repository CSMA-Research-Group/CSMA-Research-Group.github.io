import { createRouter, createWebHistory } from 'vue-router'

// 导入所有页面
import Home from '../views/Home.vue'
import Highlights from '../views/Highlights.vue'
import People from '../views/People.vue'
import Publications from '../views/Publications.vue'
import Seminars from '../views/Seminars.vue'
import Positions from '../views/Positions.vue'
import Gallery from '../views/Gallery.vue'
import Contact from '../views/Contact.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/highlights', component: Highlights },
    { path: '/people', component: People },
    { path: '/publications', component: Publications },
    { path: '/seminars', component: Seminars },
    { path: '/positions', component: Positions },
    { path: '/gallery', component: Gallery },
    { path: '/contact', component: Contact },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
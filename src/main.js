import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 1. 引入路由
import router from './router'

const app = createApp(App)
app.use(ElementPlus)
// 2. 使用路由
app.use(router)
app.mount('#app')
import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router'
// store
import { setupStore } from '@/store'

import './permission'

// 本地SVG图标
import 'virtual:svg-icons-register'
import elementIcons from '@/components/SvgIcon/svgicon'
// 国际化
import i18n from '@/lang/index'
// 样式
// import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/index.scss'
import 'uno.css'

const app = createApp(App)

// 全局注册 状态管理(store)
setupStore(app)
app.use(router).use(i18n).use(elementIcons).mount('#app')

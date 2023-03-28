import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


import locale from 'element-plus/es/locale/lang/zh-cn'
import { ElMessage } from 'element-plus'
// 统一导入el-icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import router from './router'
import http from './utils/http.js'
import App from './App.vue'

const app = createApp(App)

// 全局使用封装的axios
app.provide('$http', http)
app.provide('$message', ElMessage)

// router.beforeEach(() => {
//     // ...
//     // 返回 false 以取消导航
//     if (!localStorage.token) {
//         return { name: 'login' }
//     }
// })
  
// 统一注册el-icon图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(ElementPlus, locale).use(router).mount('#app')

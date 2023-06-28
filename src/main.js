import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import '@/styles/common.scss'
// 全局指令注册
import { lazyPlugin } from '@/directives'
// 引入全局组件插件
import { componentPlugin } from '@/components'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)

app.mount('#app')

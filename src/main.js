import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import plugin from '@/utils/plugin'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import '@/mock'

createApp(App).use(store).use(router).use(plugin).use(ElementPlus, {locale}).mount('#app')
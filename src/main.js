import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import plugin from '@/utils/plugin'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import '@/mock'; //引入mock数据，关闭则注释该行
 
createApp(App).use(store).use(router).use(plugin).use(ElementPlus, {locale}).mount('#app')

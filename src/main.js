import {createApp} from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import plugin from '@/utils/plugin'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import '@/mock'

// 商品分类列表数据，方便多处的按分类筛选
store.dispatch('goods/loadClassifyList')

createApp(App).use(store).use(router).use(plugin).use(ElementPlus, {locale}).mount('#app')
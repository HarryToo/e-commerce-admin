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

// vuex结合本地存储网站/APP装修配置数据
// if (sessionStorage.getItem('decoration_config')) {
//     const decoration = JSON.parse(sessionStorage.getItem('decoration_config'))
//     store.replaceState(Object.assign({}, store.state, {decoration}))
// }
// window.addEventListener('beforeunload', (e) => {
//     sessionStorage.setItem('decoration_config', JSON.stringify(store.state.decoration))
// })

createApp(App).use(store).use(router).use(plugin).use(ElementPlus, {locale}).mount('#app')
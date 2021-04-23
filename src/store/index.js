import {createStore} from 'vuex'
import permission from './modules/permission'
import goods from './modules/goods'
import decoration from './modules/decoration'

export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        permission,
        goods,
        decoration
    }
})

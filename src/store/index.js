import {createStore} from 'vuex'
import permission from './modules/permission'
import goods from './modules/goods'

export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        permission,
        goods
    }
})

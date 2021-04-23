import {createStore} from 'vuex'
import permission from './modules/permission'
import good from './modules/personal-good'

export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        permission,
		good,
    }
})

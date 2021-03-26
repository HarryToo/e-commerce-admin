import dynamicRoutes from "@/router/dynamic"

export default {
    namespaced: true,
    state: {
        permission: []
    },
    getters: {
        permissionRoutes(state) {
            return state.permission
        }
    },
    mutations: {
        setPermission(state, data) {
            state.permission = data
        }
    },
    actions: {
        // 获取权限数据并保存sessionStorage
        loadPermission({commit}) {
            commit('setPermission', dynamicRoutes)
        }
    },
    modules: {}
}
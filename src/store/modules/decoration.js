import $api from "@/api"

export default {
    namespaced: true,
    state: {
        website: {
            // 大众版配置数据
            mass: {}
        }
    },
    getters: {},
    mutations: {
        // 设置大众版数据
        setMassData(state, data) {
            state.classifyList = data
        }
    },
    actions: {}
}
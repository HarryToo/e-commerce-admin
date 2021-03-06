import $api from "@/api"

// 平铺列表转树形列表
function arr2Tree(list, pid = 0, asOption) {
    const res = [];
    list.forEach(item => {
        if (item.pid === pid) {
            const children = arr2Tree(list.filter(v => v.pid !== pid), item.id, asOption)
            if (children.length) {
                res.push({...item, children})
            } else {
                res.push({...item})
            }
        }
    })
    if (asOption && res.length) {
        res.unshift({
            id: '',
            name: '全部'
        })
    }
    return res
}

export default {
    namespaced: true,
    state: {
        classifyList: []
    },
    getters: {
        // 树状分类
        classifyTree(state) {
            return arr2Tree(state.classifyList)
        },
        // 树状分类（作为选择器选项，会添加‘全部’）
        classifyOptionTree(state) {
            return arr2Tree(state.classifyList, 0, true)
        }
    },
    mutations: {
        setClassifyList(state, data) {
            state.classifyList = data
        }
    },
    actions: {
        // 获取分类数据
        async loadClassifyList({commit}, searchParams) {
            const {list} = await $api.goodsApi.classify.getList(searchParams)
            commit('setClassifyList', list)
        }
    }
}
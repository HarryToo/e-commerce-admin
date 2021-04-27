import {WebsiteConfigTemplate} from './configTemplate'
import $api from "@/api";
import moment from 'moment'

// 创建新id
function createNewId(list) {
    const ids = list.map((item) => item.id)
    let newId
    // 优先填补已被删除掉的id空隙
    for (let i = 1; i <= list.length; i++) {
        if (!ids.includes(i)) {
            newId = i
        }
    }
    return newId || list.length + 1
}

// 网站装修-机构版
export default {
    namespaced: true,
    state: new WebsiteConfigTemplate(),
    getters: {
        // 统计各楼层类型板块的总数（做删除时限制）
        floorNumsGroupByType(state) {
            const floorList = state.homepage.floor
            const initialNums = floorList.map(() => 0)
            return floorList.reduce((totals, item) => {
                totals[item.type - 1]++
                return totals
            }, initialNums)
        }
    },
    mutations: {
        // 设置网站装修-机构版全部配置数据
        setAllConfigs(state, data) {
            for (const key in state) {
                state[key] = data[key]
            }
        },

        // 更新保存时间
        setUpdateTime(state) {
            state.updateTime =
                state.updateTime = moment().format('YYYY-MM-DD HH:mm:ss')
        },

        // 首页部分
        // 保存logo配置
        saveLogoConfig(state, data) {
            state.homepage.logo = data
        },
        // 保存分类导航配置
        saveClassifyConfig(state, data) {
            state.homepage.classify = data
        },
        // 保存banner配置
        saveBannerConfig(state, data) {
            state.homepage.banner = data
        },
        // 可活动楼层区域板块上移一层
        moveUpFloorLevel(state, index) {
            const floorList = state.homepage.floor
            const delArr = floorList.splice(index, 1)
            floorList.splice(index - 1, 0, delArr[0])
        },
        // 新增楼层板块
        addFloorItem(state, {index, type}) {
            const floorList = state.homepage.floor
            const newFloorItem = new WebsiteConfigTemplate().homepage.floor[type - 1]
            // 为新增楼层创建一个id
            newFloorItem.id = createNewId(floorList)
            floorList.splice(index + 1, 0, newFloorItem)
        },
        // 删除楼层板块
        delFloorItem(state, index) {
            state.homepage.floor.splice(index, 1)
        },
        // 保存可活动楼层区域板块配置
        saveFloorConfig(state, {index, data}) {
            state.homepage.floor[index] = data
        },
        // 保存底部商品列表配置
        saveBaseGoodsListConfig(state, data) {
            state.homepage.baseGoodsList = data
        },

        // 保存专场频道配置
        saveSpecialChannelConfig(state, data) {
            state.specialChannel = data
        },

        // 保存排行榜单配置
        saveLeaderBoardConfig(state, data) {
            state.leaderboard = data
        }
    },
    actions: {
        // 获取网站装修-机构版全部配置数据
        async loadAllConfigs({commit}) {
            const configs = await $api.operationApi.website.organization.getConfigs()
            commit('setAllConfigs', configs)
        },
        // 保存网站装修-机构版全部配置数据
        async saveAllConfigs({commit, state}) {
            commit('setUpdateTime')
            return await $api.operationApi.website.organization.saveConfigs({
                configs: JSON.stringify(state)
            })
        },
        // 发布网站装修-机构版全部配置数据
        async publishAllConfigs({commit, state}) {
            commit('setUpdateTime')
            return await $api.operationApi.website.organization.publishConfigs({
                configs: JSON.stringify(state)
            })
        }
    }
}
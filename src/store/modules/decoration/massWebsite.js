import {website} from './dataTemplate'

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

// 网站装修-大众版
export default {
    namespaced: true,
    state: {
        // 首页
        homePage: {
            logo: '',
            classify: [
                {
                    name: '',
                    classify: {
                        ids: [],
                        tree: []
                    }
                }
            ],
            banner: [
                {
                    img: '',
                    timePeriod: [],
                    link: {
                        type: 1,
                        value: ''
                    }
                }
            ],
            floor: new website.homepage.Floor(),
            baseGoodsList: {
                title: '',
                goodsPresetType: 1,
                goodsIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
            }
        },
        // 专场频道
        specialChannel: {
            bannerImg: '',
            goodsGroups: [
                {
                    title: '',
                    goodsIds: []
                }
            ]
        },
        // 排行榜单
        leaderboard: {}
    },
    getters: {
        // 统计各楼层类型板块的总数（做删除时限制）
        floorNumsGroupByType(state) {
            const floorList = state.homePage.floor
            const initialNums = floorList.map(() => 0)
            return floorList.reduce((totals, item) => {
                totals[item.type - 1]++
                return totals
            }, initialNums)
        }
    },
    mutations: {
        // 设置网站装修-大众版全部配置数据
        setAllConfigs(state, data) {
            state = data
        },

        // 首页部分
        // 保存logo配置
        saveLogoConfig(state, data) {
            state.homePage.logo = data
        },
        // 保存分类导航配置
        saveClassifyConfig(state, data) {
            state.homePage.classify = data
        },
        // 保存banner配置
        saveBannerConfig(state, data) {
            state.homePage.banner = data
        },
        // 可活动楼层区域板块上移一层
        moveUpFloorLevel(state, index) {
            const floorList = state.homePage.floor
            const delArr = floorList.splice(index, 1)
            floorList.splice(index - 1, 0, delArr[0])
        },
        // 新增楼层板块
        addFloorItem(state, {index, type}) {
            const floorList = state.homePage.floor
            const newFloorItem = new website.homepage.Floor()[type - 1]
            // 为新增楼层创建一个id
            newFloorItem.id = createNewId(floorList)
            floorList.splice(index + 1, 0, newFloorItem)
        },
        // 删除楼层板块
        delFloorItem(state, index) {
            state.homePage.floor.splice(index, 1)
        },
        // 保存可活动楼层区域板块配置
        saveFloorConfig(state, {index, data}) {
            state.homePage.floor[index] = data
        },
        // 保存底部商品列表配置
        saveBaseGoodsListConfig(state, data) {
            state.homePage.baseGoodsList = data
        },

        // 保存专场频道配置
        saveSpecialChannelConfig(state, data) {
            state.specialChannel = data
        }
    },
    actions: {}
}
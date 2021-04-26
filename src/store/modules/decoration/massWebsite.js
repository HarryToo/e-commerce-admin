import {website} from '@/store/modules/decoration/dataTemplate'

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
            recommend: []
        }
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
        // 设置首页各模块配置数据
        setHomepageConfigs(state, data) {
            state = data
        },
        // 保存首页-logo配置
        saveLogoConfig(state, data) {
            state.homePage.logo = data
        },
        // 保存首页-分类导航配置
        saveClassifyConfig(state, data) {
            state.homePage.classify = data
        },
        // 保存首页-banner配置
        saveBannerConfig(state, data) {
            state.homePage.banner = data
        },
        // 首页-可活动楼层区域板块上移一层
        moveUpFloorLevel(state, index) {
            const floorList = state.homePage.floor
            const delArr = floorList.splice(index, 1)
            floorList.splice(index - 1, 0, delArr[0])
        },
        // 首页-新增楼层板块
        addFloorItem(state, {index, type}) {
            const floorList = state.homePage.floor
            const newFloorItem = new website.homepage.Floor()[type - 1]
            // 为新增楼层创建一个id
            newFloorItem.id = createNewId(floorList)
            floorList.splice(index + 1, 0, newFloorItem)
        },
        // 首页-删除楼层板块
        delFloorItem(state, index) {
            state.homePage.floor.splice(index, 1)
        },
        // 保存首页-可活动楼层区域板块配置
        saveFloorConfig(state, {index, data}) {
            state.homePage.floor[index] = data
        },
        // 保存首页-为你推荐商品列表配置
        saveRecommendConfig(state, data) {
            state.homePage.recommend = data
        }
    },
    actions: {}
}
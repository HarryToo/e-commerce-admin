import dataTemplate from '@/store/modules/decoration/dataTemplate'

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
            floor: dataTemplate.website.homepage.floor,
            recommend: []
        }
    },
    getters: {},
    mutations: {
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
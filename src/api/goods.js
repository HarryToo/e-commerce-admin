import $http from '@/utils/http'

export default {
    // 商品采集
    collect: {

    },
    // 个人采集库
    personLibrary: {
        // 搜索条件 来源平台
        getPersonLbSourcePlatformData: (data) => $http.get('/goods/PersonLbSourcePlatformData', data),
        // 商品信息
        getPersonLbShopListData: (data) => $http.get('/goods/PersonLbShopListData', data),
    },
    // 平台商品库
    platformLibrary: {
        // 商品列表
        getList: (data) => $http.get('/goods/platform/list', data),
    },
    // 商品分类
    classify: {
        // 分类树
        getList: (data) => $http.get('/goods/classify/list', data),
    },
    // 商品预警
    warning: {

    }
}
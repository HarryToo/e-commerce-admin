import $http from '@/utils/http'

export default {
    // 通过商品链接采集
    collectViaGoods: (data) => $http.post('/collector/collectGoods', data),
    // 通过店铺链接采集
    collectViaStore: (data) => $http.post('/collector/collectStore', data),
    // 采集器配置信息
    getConfigs: (data) => $http.get('/collector/configs', data),
    // 货源平台列表
    getPlatformList: (data) => $http.get('/collector/platformList', data),
    // 保存配置和平台列表
    save: (data) => $http.post('/collector/save', data)
}
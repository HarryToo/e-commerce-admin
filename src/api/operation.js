import $http from '@/utils/http'

export default {
    // 专题
    special: {
        // 专题列表
        getList: (data) => $http.get('/operation/specialList', data),
        // 添加专题
        add: (data) => $http.post('/operation/addSpecial', data),
        // 删除专题
        del: (data) => $http.del('/operation/deleteSpecial', data),
        // 启用专题
        enable: (data) => $http.post('/operation/enableSpecial', data),
        // 禁用专题
        disable: (data) => $http.post('/operation/disableSpecial', data),
        // 编辑专题
        edit: (data) => $http.post('/operation/editSpecial', data),
        // 专题下已添加的商品列表
        getGoodsList: (data) => $http.get('/operation/goodsList', data),
        // 添加商品
        addGoods: (data) => $http.post('/operation/addGoods', data),
        // 移除商品
        removeGoods: (data) => $http.post('/operation/removeGoods', data)
    },
    // 网站装修
    website: {
        // 大众版
        mass: {
            // 获取配置
            getConfigs: (data) => $http.get('/operation/website/mass/configs', data),
            // 保存配置
            saveConfigs: (data) => $http.post('/operation/website/mass/configs', data),
            // 发布配置
            publishConfigs: (data) => $http.post('/operation/website/mass/publishConfigs', data)
        },
        // 机构版
        organization: {
            // 获取配置
            getConfigs: (data) => $http.get('/operation/website/organization/configs', data),
            // 保存配置
            saveConfigs: (data) => $http.post('/operation/website/organization/configs', data),
            // 发布配置
            publishConfigs: (data) => $http.post('/operation/website/organization/publishConfigs', data)
        }
    },
    // APP装修
    app: {}
}
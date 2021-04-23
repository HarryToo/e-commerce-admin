import $http from '@/utils/http'

export default {
    // 个人采集库
    personLibrary: {
        // 搜索条件 来源平台
        getPersonLbSourcePlatformData: (data) => $http.get('/goods/PersonLbSourcePlatformData', data),
        // 商品信息
        getPersonLbShopListData: (data) => $http.get('/goods/PersonLbShopListData', data),
		//商品详细
		getgoodDetailData: (data) => $http.get('/goods/goodDetailData', data),
    },
    // 平台商品库
    platformLibrary: {
        // 商品列表
        getList: (data) => $http.get('/goods/platform/list', data),
    },
    // 商品分类
    classify: {
        // 分类列表
        getList: (data) => $http.get('/goods/classify/list', data),
        // 新增分类
        add: (data) => $http.post('/goods/classify/add', data),
        // 编辑分类
        edit: (data) => $http.post('/goods/classify/edit', data),
        // 禁用分类
        disable: (data) => $http.post('/goods/classify/disable', data),
        // 启用分类
        enable: (data) => $http.post('/goods/classify/enable', data),
        // 删除分类
        del: (data) => $http.del('/goods/classify/del', data)
    },
    // 商品预警
    warning: {
        // 预警商品列表
        getList: (data) => $http.get('/goods/warning/list', data),
        // 当前预警设置
        getSettings: (data) => $http.get('/goods/warning/settings', data),
        // 保存预警设置
        saveSettings: (data) => $http.post('/goods/warning/settings', data)
    }
}
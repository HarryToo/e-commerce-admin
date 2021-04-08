import $http from '@/utils/http'
//个人采集库
export default {
    // 搜索条件 来源平台
    getPersonLbSourcePlatformData: (data) => $http.get('/order/PersonLbSourcePlatformData', data),
    // 商品信息
    getPersonLbShopListData: (data) => $http.get('/order/PersonLbShopListData', data),
	//个人采集库-编辑-选择分类
	getPersonEditClassData: (data) => $http.get('/order/PersonEditClassData', data),
}
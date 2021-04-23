import $http from '@/utils/http'

export default {
    // 文件上传
    upload: (data) => $http.post('/common/fileUpload', data),
    // 概览数据
    getOverviewData: (data) => $http.get('/common/overviewData', data),
    // 快递公司列表
    getCourierCompanyList: (data) => $http.get('/common/courierCompanyList', data),
    // 订单快递信息
    getLogisticsInfo: (data) => $http.get('/common/logisticsInfo', data)
}
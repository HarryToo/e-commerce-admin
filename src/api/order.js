import $http from '@/utils/http'

export default {
    // 订单统计图表数据
    getStatisticsChartData: (data) => $http.get('/order/statisticsChartData', data),
    // 订单比例图表数据
    getProportionChartData: (data) => $http.get('/order/ProportionChartData', data),
    // 代发下单
    dropShipping: {
        // 订单列表
        getList: (data) => $http.get('/order/dropShipping/list', data),
        // 取消订单
        cancelOrder: (data) => $http.post('/order/dropShipping/cancelOrder', data),
        // 删除订单
        deleteOrder: (data) => $http.del('/order/dropShipping/delete', data),
        // 修改收货信息
        editDeliveryInfo: (data) => $http.post('/order/dropShipping/editDeliveryInfo', data),
    }
}
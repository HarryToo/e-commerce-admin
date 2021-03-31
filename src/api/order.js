import $http from '@/utils/http'

export default {
    // 订单统计图表数据
    getStatisticsChartData: (data) => $http.get('/order/statisticsChartData', data),
    // 订单比例图表数据
    getProportionChartData: (data) => $http.get('/order/ProportionChartData', data)
}
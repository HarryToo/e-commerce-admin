import $http from '@/common/http'

export default {
    // 订单统计图表数据
    getStatisticsChartData: (data) => $http.get('/order/statisticsChartData', {params: data}),
}
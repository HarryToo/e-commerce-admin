import $http from '@/utils/http'

export default {
    // 订单统计图表数据
    getStatisticsChartData: (data) => $http.get('/customer/statisticsChartData', data),
    // 机构学员排名
    getOrganizationStudentRanking: (data) => $http.get('/customer/organizationStudentRanking', data),
}
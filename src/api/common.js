import $http from '@/utils/http'

export default {
    // 概览数据
    getOverviewData: (data) => $http.get('/overviewData', data),
}
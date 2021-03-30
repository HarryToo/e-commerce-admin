import $http from '@/common/http'

export default {
    // 概览数据
    getOverviewData: (data) => $http.get('/overviewData', {params: data}),
}
import $http from '@/utils/http'

export default {
    // 文件上传
    upload: (data) => $http.post('/fileUpload', data),
    // 概览数据
    getOverviewData: (data) => $http.get('/overviewData', data)
}
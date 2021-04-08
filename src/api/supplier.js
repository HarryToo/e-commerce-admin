import $http from '@/utils/http'

export default {
    // 供应商列表
    getList: (data) => $http.get('/supplier/list', data),
    // 提交备注
    remark: (data) => $http.post('/supplier/remark', data)
}
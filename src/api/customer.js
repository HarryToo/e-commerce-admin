import $http from '@/utils/http'

export default {
    // 用户统计图表数据
    getStatisticsChartData: (data) => $http.get('/customer/statisticsChartData', data),
    // 机构学员排名
    getOrganizationStudentRanking: (data) => $http.get('/customer/organizationStudentRanking', data),
    // 机构
    organization: {
        // 机构列表
        getList: (data) => $http.get('/customer/organizationList', data),
        // 机构详情
        getDetail: (data) => $http.get('/customer/organizationDetail', data),
        // 添加机构
        add: (data) => $http.post('/customer/addOrganization', data),
        // 编辑机构
        edit: (data) => $http.post('/customer/editOrganization', data),
        // 删除机构
        del: (data) => $http.del('/customer/deleteOrganization', data),
        // 启用机构
        enable: (data) => $http.post('/customer/enableOrganization', data),
        // 禁用机构
        disable: (data) => $http.post('/customer/disableOrganization', data)
    },
    // 个人
    person: {
        // 个人列表
        getList: (data) => $http.get('/customer/personList', data),
        // 启用个人
        enable: (data) => $http.post('/customer/enablePerson', data),
        // 冻结个人
        disable: (data) => $http.post('/customer/disablePerson', data)
    }
}
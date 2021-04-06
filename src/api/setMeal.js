import $http from '@/utils/http'

export default {
    // 机构套餐
    organization: {
        // 套餐列表
        getList: (data) => $http.get('/setMeal/organizationSetMealList', data),
    },
    // 个人套餐
    personal: {
        // 套餐列表
        getList: (data) => $http.get('/setMeal/personalSetMealList', data),
    }
}
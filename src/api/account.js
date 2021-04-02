import $http from '@/utils/http'

export default {
    // 登录
    login: (data) => $http.post('/login', data)
}
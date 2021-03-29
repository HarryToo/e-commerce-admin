import $http from '@/common/http'

export default {
    // 登录
    login: (data) => $http.post('/login', data),
    // 获取用户权限
    getPermission: (data) => $http.get('/permission', data)
}
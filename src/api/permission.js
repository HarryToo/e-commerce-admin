import $http from '@/utils/http'

export default {
    // 获取账户权限
    getAccountPermission: (data) => $http.get('/permission/byAccount', data),
    // 角色列表
    getRoleList: (data) => $http.get('/permission/roleList', data),
    // 当前角色可以分配和管理的权限
    getControllablePermission: (data) => $http.get('/permission/controllable', data)
}
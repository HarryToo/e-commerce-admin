import $http from '@/utils/http'

export default {
    // 获取账户权限
    getAccountPermission: (data) => $http.get('/permission/byAccount', data),
    // 角色
    role: {
        // 角色列表
        getList: (data) => $http.get('/permission/roleList', data),
        // 添加角色时可以分配的权限
        getControllablePermission: (data) => $http.get('/permission/controllable', data),
        // 角色详情
        getDetail: (data) => $http.get('/permission/roleDetail', data),
        // 添加角色
        add: (data) => $http.post('/permission/addRole', data),
        // 编辑角色
        edit: (data) => $http.post('/permission/editRole', data),
        // 删除角色
        del: (data) => $http.del('/permission/deleteRole', data)
    }
}
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
    },
    // 部门
    department: {
        // 部门列表
        getList: (data) => $http.get('/permission/departmentList', data),
        // 部门详情
        getDetail: (data) => $http.get('/permission/departmentDetail', data),
        // 添加部门
        add: (data) => $http.post('/permission/addDepartment', data),
        // 编辑部门
        edit: (data) => $http.post('/permission/editDepartment', data),
        // 删除部门
        del: (data) => $http.del('/permission/deleteDepartment', data)
    },
    // 用户
    user: {
        // 用户列表
        getList: (data) => $http.get('/permission/userList', data),
        // 用户详情
        getDetail: (data) => $http.get('/permission/userDetail', data),
        // 添加用户
        add: (data) => $http.post('/permission/addUser', data),
        // 编辑用户
        edit: (data) => $http.post('/permission/editUser', data),
        // 删除用户
        del: (data) => $http.del('/permission/deleteUser', data)
    },
    // 获取权限相关操作记录
    getLogs: (data) => $http.get('/permission/logs', data)
}
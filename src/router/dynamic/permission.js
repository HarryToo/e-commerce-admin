export default [
    {
        path: 'permission',
        redirect: to => {
            return to.path + '/role'
        },
        meta: {
            title: '权限管理'
        }
    },
    {
        path: 'permission/role',
        name: 'RoleList',
        meta: {
            title: '角色管理'
        },
        component: () => import('@/views/main/permission/role')
    },
    {
        path: 'permission/department',
        name: 'DepartmentList',
        meta: {
            title: '部门管理'
        },
        component: () => import('@/views/main/permission/department')
    },
    {
        path: 'permission/user',
        name: 'UserList',
        meta: {
            title: '用户管理'
        },
        component: () => import('@/views/main/permission/user')
    },
    {
        path: 'permission/permissionLog',
        name: 'PermissionLog',
        meta: {
            title: '操作日志'
        },
        component: () => import('@/views/main/permission/PermissionLog')
    }
]
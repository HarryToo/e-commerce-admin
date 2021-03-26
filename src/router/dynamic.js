const dynamicRoutes = [
    {
        path: 'dataCenter',
        name: 'DataCenter',
        meta: {
            title: '数据概览'
        },
        component: () => import('@/views/main/DataCenter')
    },
    {
        path: 'permission',
        redirect: to => {
            return to.path + '/roleList'
        },
        meta: {
            title: '权限管理'
        }
    },
    {
        path: 'permission/roleList',
        name: 'RoleList',
        meta: {
            title: '角色管理'
        },
        component: () => import('@/views/main/permission/role/RoleList')
    },
    {
        path: 'permission/userList',
        name: 'UserList',
        meta: {
            title: '用户管理'
        },
        component: () => import('@/views/main/permission/user/UserList')
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

export default dynamicRoutes
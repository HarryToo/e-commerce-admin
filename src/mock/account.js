import $mock from '@/utils/mock'

// 登录
$mock.post('/login', {
    code: 200,
    token: '@string("lower", 50)'
})
// 获取用户权限
$mock.get('/permission', [
    {
        name: '数据概览',
        path: 'dataCenter',
        permission: ['view']
    },
    {
        name: '权限管理',
        path: 'permission',
        children: [
            {
                name: '角色管理',
                path: 'permission/roleList',
                permission: ['view', 'edit', 'add', 'delete']
            },
            {
                name: '用户管理',
                path: 'permission/userList',
                permission: ['view', 'edit', 'add', 'delete']
            },
            {
                name: '操作日志',
                path: 'permission/permissionLog',
                permission: ['view', 'edit', 'add', 'delete']
            }
        ]
    }
])
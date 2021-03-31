import $mock from '@/utils/mock'

// 获取用户权限
$mock.get('/permission/byAccount', [
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
                path: 'permission/role',
                permission: ['view', 'edit', 'add', 'delete']
            },
            {
                name: '用户管理',
                path: 'permission/user',
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
// 角色列表
$mock.get('/permission/roleList', {
    'list|10': [
        {
            name: '@cword(4, 6)',
            description: '@cword(10, 30)'
        }
    ],
    total: 30
})
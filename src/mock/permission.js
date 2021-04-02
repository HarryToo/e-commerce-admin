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
    },
    {
        name: '商品列表',
        path: 'goodlist',
        children: [
            {
                name: '个人采集库',
                path: 'goodlist/PersonalCollectionLibrary',
                permission: ['view', 'edit', 'add', 'delete']
            },
            {
                name: '平台商品库',
                path: 'goodlist/PlatformGoodLibrary',
                permission: ['view', 'edit', 'add', 'delete']
            }
        ]
    }
])
// 角色列表
$mock.get('/permission/roleList', {
    'list|10': [
        {
            'id|+1': 1,
            name: '@cword(4, 6)',
            description: '@cword(10, 30)'
        }
    ],
    total: 30
})
// 添加角色时可以分配的权限
$mock.get('/permission/controllable', [
    {
        id: '1',
        label: '数据概览',
    },
    {
        id: '2',
        label: '权限管理',
        children: [
            {
                id: '2-1',
                label: '角色管理',
                children: [
                    {
                        id: '2-1-1',
                        label: '添加角色'
                    },
                    {
                        id: '2-1-2',
                        label: '编辑角色'
                    },
                    {
                        id: '2-1-3',
                        label: '删除角色'
                    }
                ]
            },
            {
                id: '2-2',
                label: '用户管理',
                children: [
                    {
                        id: '2-2-1',
                        label: '添加用户'
                    },
                    {
                        id: '2-2-2',
                        label: '编辑用户'
                    },
                    {
                        id: '2-2-3',
                        label: '删除用户'
                    }
                ]
            },
            {
                id: '2-3',
                label: '操作日志',
                children: [
                    {
                        id: '2-3-1',
                        label: '添加角色'
                    }
                ]
            }
        ]
    },
    {
        id: '3',
        label: '商品列表',
        children: [
            {
                id: '3-1',
                label: '个人采集库',
                children: [
                    {
                        id: '3-1-1',
                        label: '编辑商品'
                    },
                    {
                        id: '3-1-2',
                        label: '删除商品'
                    }
                ]
            },
            {
                id: '3-2',
                label: '平台商品库',
                children: [
                    {
                        id: '3-2-1',
                        label: '编辑商品'
                    },
                    {
                        id: '3-2-2',
                        label: '删除商品'
                    }
                ]
            }
        ]
    }
])
// 角色详情
$mock.get('/permission/roleDetail', {
    id: '@integer(1, 10)',
    name: '@cword(4, 6)',
    description: '@cword(10, 30)',
    permission: {},
    range: '@integer(1, 3)'
})
// 添加角色
$mock.post('/permission/addRole', {
    code: 200
})
// 编辑角色
$mock.post('/permission/editRole', {
    code: 200
})
// 删除角色
$mock.del('/permission/deleteRole', {
    code: 200
})
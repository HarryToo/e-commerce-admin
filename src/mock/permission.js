import $mock from '@/utils/mock'

// 获取用户权限
$mock.get('/permission/byAccount', [
    {
        name: '数据概览',
        path: 'dataCenter'
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
			    name: '编辑',
			    path: 'goodlist/PersonalCollectionLibrary/edit',
			    permission: ['view', 'edit', 'add', 'delete']
			},
            {
                name: '平台商品库',
                path: 'goodlist/PlatformGoodLibrary',
                permission: ['view', 'edit', 'add', 'delete']
            }
        ]
    },
    {
        name: '供应商管理',
        path: 'supplier',
        permission: ['edit']
    },
    {
        name: '运营管理',
        path: 'operation',
        children: [
            {
                name: '专题管理',
                path: 'operation/special',
                permission: ['edit', 'add', 'delete']
            },
            {
                name: '商品管理',
                path: 'operation/special/goods',
                permission: ['view', 'add', 'delete']
            }
        ]
    },
    {
        name: '套餐管理',
        path: 'setMeal',
        children: [
            {
                name: '个人套餐',
                path: 'setMeal/person'
            },
            {
                name: '机构套餐',
                path: 'setMeal/organization'
            }
        ]
    },
    {
        name: '客户管理',
        path: 'customer',
        children: [
            {
                name: '机构客户',
                path: 'customer/organization',
                permission: ['edit', 'delete', 'add', 'view']
            },
            {
                name: '个人客户',
                path: 'customer/person'
            }
        ]
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
                name: '部门管理',
                path: 'permission/department',
                permission: ['edit', 'add', 'delete']
            },
            {
                name: '用户管理',
                path: 'permission/user',
                permission: ['edit', 'add', 'delete']
            },
            {
                name: '操作日志',
                path: 'permission/permissionLog'
            }
        ]
    }
])
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
                label: '部门管理',
                children: [
                    {
                        id: '2-2-1',
                        label: '添加部门'
                    },
                    {
                        id: '2-2-2',
                        label: '编辑部门'
                    },
                    {
                        id: '2-2-3',
                        label: '删除部门'
                    }
                ]
            },
            {
                id: '2-3',
                label: '用户管理',
                children: [
                    {
                        id: '2-3-1',
                        label: '添加用户'
                    },
                    {
                        id: '2-3-2',
                        label: '编辑用户'
                    },
                    {
                        id: '2-3-3',
                        label: '删除用户'
                    }
                ]
            },
            {
                id: '2-4',
                label: '操作日志'
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
// 角色列表
$mock.get('/permission/roleList', ({url}) => {
    const {pageSize} = $mock.parseQuery(url)
    const data = {
        total: 30
    }
    data[`list|${pageSize}`] = [
        {
            'id|+1': 1,
            name: '@cword(4, 6)',
            description: '@cword(10, 30)'
        }
    ]
    return $mock.mock(data)
})
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
// 部门列表
$mock.get('/permission/departmentList', ({url}) => {
    const {pageSize} = $mock.parseQuery(url)
    const data = {
        total: 30
    }
    data[`list|${pageSize}`] = [
        {
            'id|+1': 1,
            name: '@cword(4, 6)部',
            description: '@cword(10, 30)'
        }
    ]
    return $mock.mock(data)
})
// 部门详情
$mock.get('/permission/departmentDetail', {
    id: '@integer(1, 10)',
    name: '@cword(4, 6)部',
    description: '@cword(10, 30)'
})
// 添加部门
$mock.post('/permission/addDepartment', {
    code: 200
})
// 编辑部门
$mock.post('/permission/editDepartment', {
    code: 200
})
// 删除部门
$mock.del('/permission/deleteDepartment', {
    code: 200
})
// 用户列表
$mock.get('/permission/userList', ({url}) => {
    const {pageSize} = $mock.parseQuery(url)
    const data = {
        total: 30
    }
    data[`list|${pageSize}`] = [
        {
            'id|+1': 1,
            name: '@cword(2, 3)',
            department: '@cword(4, 6)部',
            role: '@cword(4, 6)',
            description: '@cword(10, 30)'
        }
    ]
    return $mock.mock(data)
})
// 用户详情
$mock.get('/permission/userDetail', {
    id: '@integer(1, 10)',
    name: '@cword(2, 3)',
    department: '@cword(4, 6)',
    role: '@cword(4, 6)',
    description: '@cword(10, 30)',
    account: '@string("lower", 1, 15)'
})
// 添加用户
$mock.post('/permission/addUser', {
    code: 200
})
// 编辑用户
$mock.post('/permission/editUser', {
    code: 200
})
// 删除用户
$mock.del('/permission/deleteUser', {
    code: 200
})
// 获取权限相关操作记录
$mock.get('/permission/logs', ({url}) => {
    const {pageSize} = $mock.parseQuery(url)
    const data = {
        total: 30
    }
    data[`list|${pageSize}`] = [
        {
            'id|+1': 1,
            time: '@datetime()',
            description: '@cword(10, 30)'
        }
    ]
    return $mock.mock(data)
})
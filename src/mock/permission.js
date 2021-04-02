import $mock from '@/utils/mock'

// 获取用户权限
$mock.get('/permission/byAccount', [{
		name: '数据概览',
		path: 'dataCenter',
		permission: ['view']
	},
	{
		name: '权限管理',
		path: 'permission',
		children: [{
				name: '角色管理',
				path: 'permission/role',
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
		children: [{		
				name: '个人采集库',
				path: 'goodlist/PersonalCollectionLibrary',
				permission: ['view', 'edit', 'add', 'delete'],
			},
			{
				name: '平台商品库',
				path: 'goodlist/PlatformGoodLibrary',
				permission: ['view', 'edit', 'add', 'delete']
			}
		]
	},
])
// 角色列表
$mock.get('/permission/roleList', {
	'list|10': [{
		name: '@cword(4, 6)',
		description: '@cword(10, 30)'
	}],
	total: 30
})
// 当前角色可以分配和管理的权限
$mock.get('/permission/controllable', [{
	name: '@cword(4, 6)',
	description: '@cword(10, 30)'
}])

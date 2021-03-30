import Mock from 'mockjs'

const apiBaseUrl = process.env.VUE_APP_API_MOCK_URL

function getUrl(url) {
    const fullUrl = apiBaseUrl + url
    return RegExp(fullUrl.replace(/\//g, '\\/') + '.*')
}

// 登录
Mock.mock(apiBaseUrl + '/login', 'post', {
    code: 200,
    token: '@string("lower", 50)'
})
// 获取用户权限
Mock.mock(getUrl('/permission'), 'get', [
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
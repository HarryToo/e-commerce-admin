export default [
    {
        path: 'customer',
        redirect: to => {
            return to.path + '/organization'
        },
        meta: {
            title: '客户管理'
        }
    },
    {
        path: 'customer/organization',
        name: 'OrganizationList',
        meta: {
            title: '机构客户'
        },
        component: () => import('@/views/main/customer/organization')
    },
    {
        path: 'customer/person',
        name: 'PersonList',
        meta: {
            title: '个人客户'
        },
        component: () => import('@/views/main/customer/person')
    }
]
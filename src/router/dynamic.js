const dynamicRoutes = [
    {
        path: '',
        name: 'DataCenter',
        meta: {
            title: '数据概览'
        },
        component: () => import('@/views/main/DataCenter')
    }
]

export default dynamicRoutes
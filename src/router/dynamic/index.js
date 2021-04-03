import shoplistRoutes from './shoplist'//商品列表
import customerRoutes from './customer'
import permissionRoutes from './permission'

const dynamicRoutes = [
    {
        path: 'dataCenter',
        name: 'DataCenter',
        meta: {
            title: '数据概览',
            noBackground: true  // 无背景
        },
        component: () => import('@/views/main/data-center')
    },
    ...shoplistRoutes,
    ...customerRoutes,
    ...permissionRoutes
]

export default dynamicRoutes
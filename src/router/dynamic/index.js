import shoplistRoutes from './shoplist'//商品列表
import operationRoutes from './operation'
import setMealRoutes from './setMeal'
import customerRoutes from './customer'
import permissionRoutes from './permission'

const dynamicRoutes = [
    {
        path: 'dashBoard',
        name: 'DashBoard',
        meta: {
            title: '数据概览',
            noBg: true,  // 无背景
            noNav: true  // 无面包屑导航
        },
        component: () => import('@/views/main/dash-board')
    },
    ...shoplistRoutes,
    {
        path: 'supplier',
        name: 'Supplier',
        meta: {
            title: '供应商管理'
        },
        component: () => import('@/views/main/supplier')
    },
    ...operationRoutes,
    ...setMealRoutes,
    ...customerRoutes,
    ...permissionRoutes
]

export default dynamicRoutes
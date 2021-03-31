import permissionRoutes from './permission'

console.log(permissionRoutes);

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
    ...permissionRoutes
]

export default dynamicRoutes
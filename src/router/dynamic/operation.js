export default [
    {
        path: 'operation',
        redirect: to => {
            return to.path + '/special'
        },
        meta: {
            title: '运营管理'
        }
    },
    {
        path: 'operation/special',
        name: 'SpecialList',
        meta: {
            title: '专题管理'
        },
        component: () => import('@/views/main/operation/special')
    },
    {
        path: 'operation/special/goods',
        name: 'SpecialGoods',
        meta: {
            title: '商品管理'
        },
        component: () => import('@/views/main/operation/special/goods')
    }
]
export default [
    {
        path: 'goodsManage',
        redirect: to => {
            return to.path + '/classify'
        },
        meta: {
            title: '商品管理'
        }
    },
    {
        path: 'goodsManage/classify',
        name: 'GoodsClassify',
        meta: {
            title: '分类管理'
        },
        component: () => import('@/views/main/goods/classify')
    },
    {
        path: 'goodsManage/warning',
        name: 'GoodsWarning',
        meta: {
            title: '预警管理'
        },
        component: () => import('@/views/main/goods/warning')
    }
]
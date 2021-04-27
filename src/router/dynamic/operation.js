import SpecialGoodsList from '@/views/main/operation/special/goods'
import AddGoods from '@/views/main/operation/special/goods/AddGoods'

export default [
    {
        path: 'operation',
        redirect: to => {
            return to.path + '/special-channel'
        },
        meta: {
            title: '运营管理'
        }
    },
    {
        path: 'operation/special-channel',
        name: 'SpecialList',
        meta: {
            title: '专题管理'
        },
        component: () => import('@/views/main/operation/special')
    },
    {
        path: 'operation/special-channel/goods',
        name: 'SpecialGoods',
        meta: {
            title: '商品管理'
        },
        component: SpecialGoodsList
    },
    {
        path: 'operation/special-channel/goods/add',
        name: 'AddSpecialGoods',
        meta: {
            title: '添加商品'
        },
        component: AddGoods
    },
    {
        path: 'operation/website',
        name: 'WebSitDecoration',
        meta: {
            title: '网站装修',
            noBg: true
        },
        component: () => import('@/views/main/operation/website')
    }
]
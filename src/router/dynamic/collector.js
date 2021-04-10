export default [
    {
        path: 'collector',
        redirect: to => {
            return to.path + '/collectGoods'
        },
        meta: {
            title: '商品采集'
        }
    },
    {
        path: 'collector/collectGoods',
        name: 'CollectGoods',
        meta: {
            title: '链接采集'
        },
        component: () => import('@/views/main/collector/CollectGoods')
    },
    {
        path: 'collector/collectStore',
        name: 'CollectStore',
        meta: {
            title: '店铺采集'
        },
        component: () => import('@/views/main/collector/CollectStore')
    },
    {
        path: 'collector/plugin',
        name: 'CollectPlugin',
        meta: {
            title: '插件采集'
        },
        component: () => import('@/views/main/collector/Plugin')
    },
    {
        path: 'collector/config',
        name: 'CollectorConfig',
        meta: {
            title: '采集配置'
        },
        component: () => import('@/views/main/collector/Config')
    }
]
import BatchDeliver from '@/views/main/order/drop-shipping/BatchDeliver'
import Detail from '@/views/main/order/drop-shipping/Detail'

export default [
    {
        path: 'order',
        redirect: to => {
            return to.path + '/dropShipping'
        },
        meta: {
            title: '订单管理'
        }
    },
    {
        path: 'order/dropShipping',
        name: 'DropShippingOrder',
        meta: {
            title: '代发下单'
        },
        component: () => import('@/views/main/order/drop-shipping')
    },
    {
        path: 'order/dropShipping/batchDeliver',
        name: 'BatchDeliver',
        meta: {
            title: '批量发货'
        },
        component: BatchDeliver
    },
    {
        path: 'order/dropShipping/detail/:orderId',
        name: 'DropShippingOrderDetail',
        meta: {
            title: '查看订单',
            noBg: true
        },
        component: Detail
    }
]
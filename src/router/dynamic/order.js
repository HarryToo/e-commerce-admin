import BatchDeliver from '@/views/main/order/drop-shipping/BatchDeliver'
import DropShippingOrderDetail from '@/views/main/order/drop-shipping/Detail'
import ReturnedOrderDetail from '@/views/main/order/returned/Detail'
import ExchangeOrderDetail from '@/views/main/order/exchange/Detail'

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
        component: DropShippingOrderDetail
    },
    {
        path: 'order/returned',
        name: 'ReturnedOrder',
        meta: {
            title: '退货订单'
        },
        component: () => import('@/views/main/order/returned')
    },
    {
        path: 'order/returned/detail/:orderId',
        name: 'ReturnedOrderDetail',
        meta: {
            title: '查看订单',
            noBg: true
        },
        component: ReturnedOrderDetail
    },
    {
        path: 'order/exchange',
        name: 'ExchangeOrder',
        meta: {
            title: '换货订单'
        },
        component: () => import('@/views/main/order/exchange')
    },
    {
        path: 'order/exchange/detail/:orderId',
        name: 'ExchangeOrderDetail',
        meta: {
            title: '查看订单',
            noBg: true
        },
        component: ExchangeOrderDetail
    }
]
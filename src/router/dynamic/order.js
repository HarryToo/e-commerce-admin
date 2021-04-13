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
    }
]
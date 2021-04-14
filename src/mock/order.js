import $mock from '@/utils/mock'

// 订单统计图表数据
$mock.get('/order/statisticsChartData', {
    normal: [
        ['2021/3/30 0:00', '@integer(1, 10)'],
        ['2021/3/30 4:00', '@integer(1, 10)'],
        ['2021/3/30 8:00', '@integer(1, 10)'],
        ['2021/3/30 12:00', '@integer(1, 10)'],
        ['2021/3/30 16:00', '@integer(1, 10)'],
        ['2021/3/30 20:00', '@integer(1, 10)'],
        ['2021/3/30 24:00', '@integer(1, 10)']
    ],
    afterSale: [
        ['2021/3/30 0:00', '@integer(1, 10)'],
        ['2021/3/30 4:00', '@integer(1, 10)'],
        ['2021/3/30 8:00', '@integer(1, 10)'],
        ['2021/3/30 12:00', '@integer(1, 10)'],
        ['2021/3/30 16:00', '@integer(1, 10)'],
        ['2021/3/30 20:00', '@integer(1, 10)'],
        ['2021/3/30 24:00', '@integer(1, 10)']
    ]
})
// 订单比例图表数据
$mock.get('/order/ProportionChartData', {
    normal: '@integer(1000, 5000)',
    back: '@integer(1000, 5000)',
    exchange: '@integer(1000, 5000)'
})
// 代发下单订单列表
$mock.get('/order/dropShipping/list', ({url}) => {
    const {pageSize} = $mock.parseQuery(url)
    const data = {
        total: 30
    }
    data[`list|${pageSize}`] = [
        {
            'id|+1': 1,
            'orderNum|+1': 10000000000,
            goodsInfo: {
                cover: '@image("80x80", "#F9612E")',
                name: '@cword(30, 50)',
                classify: '@cword(15, 30)',
                origin: {
                    platform: {
                        name: '@cword(2, 4)',
                        href: 'https://www.baidu.com'
                    },
                    id: {
                        'name|+1': 100000,
                        href: 'https://www.baidu.com'
                    }
                }
            },
            price: '@float(1000, 1500, 2, 2)',
            orderSize: 1,
            money: '@price',
            deliveryInfo: {
                name: '@cname()',
                phone: '1@string(number, 10)',
                provinces: '四川省',
                city: '成都市',
                area: '锦江区',
                address: '@cword(2)路@string(number, 2)号2楼'
            },
            status: '@integer(1, 5)',
            placeOrderTime: '@datetime()'
        }
    ]
    return $mock.mock(data)
})
// 取消订单
$mock.post('/order/dropShipping/cancelOrder', {
    code: 200
})
// 删除订单
$mock.del('/order/dropShipping/delete', {
    code: 200
})
// 修改收货信息
$mock.post('/order/dropShipping/editDeliveryInfo', {
    code: 200
})
// 发货
$mock.post('/order/dropShipping/deliverGoods', {
    code: 200
})
// 批量发货
$mock.post('/order/dropShipping/batchDeliverGoods', {
    code: 200
})
// 订单详情
$mock.get('/order/dropShipping/detail', () => {
    return $mock.mock({
        orderNum: '@string(number, 12)',
        status: 1,
        cancelReason: '商品已下架',
        payEndTime: parseInt(new Date().getTime() / 1000) + (30 * 60),
        orderTime: '@datetime()',
        payTime: '',
        deliverGoodsTime: '',
        takeTime: '',
        completeTime: '',
        deliveryInfo: {
            name: '@cname()',
            phone: '1@string(number, 10)',
            provinces: '四川省',
            city: '成都市',
            area: '锦江区',
            address: '@cword(2)路@string(number, 2)号2楼'
        },
        goodsMoney: '@float(1000, 1500, 2, 2)',
        freightMoney: '@float(10, 20, 2, 2)',
        skuNum: '@string(number, 10)',
        goodsInfo: {
            cover: '@image("80x80", "#F9612E")',
            name: '@cword(30, 50)',
            classify: '@cword(15, 30)',
            origin: {
                platform: {
                    name: '@cword(2, 4)',
                    href: 'https://www.baidu.com'
                },
                id: {
                    'name|+1': 100000,
                    href: 'https://www.baidu.com'
                }
            }
        },
        goodsPrice: '@float(1000, 1500, 2, 2)',
        goodsNum: 1,
        'operationLogs|3': [
            {
                status: '@integer(1, 5)',
                content: '提交订单',
                operatorRole: '下单用户',
                operatorName: '@cname()',
                operatorPhone: '1@string(number, 10)',
                time: '@datetime()'
            }
        ]
    })
})
import $mock from '@/utils/mock'

// 换货订单
// 订单列表
$mock.get('/order/exchange/list', ({url}) => {
    const {pageSize} = $mock.parseQuery(url)
    const data = {
        total: 30
    }
    data[`list|${pageSize}`] = [
        {
            'id|+1': 1,
            'orderNum|+1': 10000000000,
            'exchangeNum|+1': 10000000000,
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
            actuallyMoney: '@price',
            reason: '商品损坏',
            status: '@integer(1, 6)',
            applyTime: '@datetime()',
            deliveryInfo: {
                name: '@cname()',
                phone: '1@string(number, 10)',
                provinces: '四川省',
                city: '成都市',
                area: '锦江区',
                address: '@cword(2)路@string(number, 2)号2楼'
            },
            logisticsName: '@cword(2)快递',
            logisticsNum: '@string(upper, 2)@string(number, 10)',
            logisticsCode: '@string(upper, 4)'
        }
    ]
    return $mock.mock(data)
})
// 确认收货
$mock.post('/order/exchange/received', {
    code: 200
})
// 发货
$mock.post('/order/exchange/deliverGoods', {
    code: 200
})
// 批量发货
$mock.post('/order/exchange/batchDeliverGoods', {
    code: 200
})
// 删除订单
$mock.del('/order/exchange/delete', {
    code: 200
})
// 订单详情
$mock.get('/order/exchange/detail', () => {
    return $mock.mock({
        orderNum: '@string(number, 12)',
        returnedNum: '@string(number, 12)',
        status: 1,
        applyTime: '@datetime()',
        reviewTime: '',
        receiptTime: '',
        deliveryTime: '',
        completeTime: '',
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
        actualMoney: '@goodsPrice',
        returnedReason: '七天无理由退货',
        returnedDecs: '跟描述不相符，感觉不合适',
        'returnedImages|3': ['@image("120x120", "#F9612E")'],
        logisticsName: '@cword(2)快递',
        logisticsCode: '@string(upper, 4)',
        logisticsNumber: '@string(upper, 2)@string(number, 10)',
        deliveryInfo: {
            name: '@cname()',
            phone: '1@string(number, 10)',
            provinces: '四川省',
            city: '成都市',
            area: '锦江区',
            address: '@cword(2)路@string(number, 2)号2楼'
        },
        returnLogisticsName: '@cword(2)快递',
        returnLogisticsCode: '@string(upper, 4)',
        returnLogisticsNumber: '@string(upper, 2)@string(number, 10)',
        returnDeliveryInfo: {
            name: '@cname()',
            phone: '1@string(number, 10)',
            provinces: '四川省',
            city: '成都市',
            area: '龙泉驿区',
            address: '@cword(2)路@string(number, 2)号16楼'
        },
        remark: '商品已下架'
    })
})
// 审核
$mock.post('/order/exchange/review', {
    code: 200
})
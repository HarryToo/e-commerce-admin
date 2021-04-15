import $mock from '@/utils/mock'
import './dropShipping'
import './returned'
import './exchange'

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
import Mock from 'mockjs'

const apiBaseUrl = process.env.VUE_APP_API_MOCK_URL

function getUrl(url) {
    const fullUrl = apiBaseUrl + url
    return RegExp(fullUrl.replace(/\//g, '\\/') + '.*')
}

// 订单统计图表数据
Mock.mock(getUrl('/order/statisticsChartData'), 'get', {
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

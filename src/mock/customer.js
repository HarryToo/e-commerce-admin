import $mock from '@/utils/mock'

// 订单统计图表数据
$mock.get('/customer/statisticsChartData', {
    official: [
        ['2021/3/30 0:00', '@integer(100, 1000)'],
        ['2021/3/30 4:00', '@integer(100, 1000)'],
        ['2021/3/30 8:00', '@integer(100, 1000)'],
        ['2021/3/30 12:00', '@integer(100, 1000)'],
        ['2021/3/30 16:00', '@integer(100, 1000)'],
        ['2021/3/30 20:00', '@integer(100, 1000)'],
        ['2021/3/30 24:00', '@integer(100, 1000)']
    ],
    trial: [
        ['2021/3/30 0:00', '@integer(100, 1000)'],
        ['2021/3/30 4:00', '@integer(100, 1000)'],
        ['2021/3/30 8:00', '@integer(100, 1000)'],
        ['2021/3/30 12:00', '@integer(100, 1000)'],
        ['2021/3/30 16:00', '@integer(100, 1000)'],
        ['2021/3/30 20:00', '@integer(100, 1000)'],
        ['2021/3/30 24:00', '@integer(100, 1000)']
    ]
})
// 机构学员排名
$mock.get('/customer/organizationStudentRanking', {
    'official|10': [{
        'id|+1': 1,
        name: '机构名称@integer(1, 10)号',
        num: '@integer(50, 15000)'
    }],
    'trial|10': [{
        'id|+1': 1,
        name: '机构名称@integer(1, 10)号',
        num: '@integer(50, 15000)'
    }]
})

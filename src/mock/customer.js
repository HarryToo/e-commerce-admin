import $mock from '@/utils/mock'

// 用户统计图表数据
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
// 机构列表
$mock.get('/customer/organizationList', ({url}) => {
    const {pageSize} = $mock.parseQuery(url)
    const data = {
        total: 30
    }
    data[`list|${pageSize}`] = [
        {
            'id|+1': 1,
            openTime: '@datetime()',
            name: '@cword(4, 6)',
            contact: '@cword(2, 3)',
            phone: '1@string("number", 10)',
            setMealId: '@integer(1, 6)',
            account: '@string("lower", 1, 15)',
            earningTotal: '@float(1000, 10000, 2, 2)',
            seatTotal: '@integer(100, 500)',
            studentTotal: '@integer(100, 500)',
            states: '@integer(0, 2)',
            openPeople: '@cword(2, 3)'
        }
    ]
    return $mock.mock(data)
})
// 机构详情
$mock.get('/customer/organizationDetail', {
    id: '@integer(1, 10)',
    name: '@cword(4, 6)',
    contact: '@cword(2, 3)',
    phone: '1@string("number", 10)',
    account: '@string("lower", 1, 15)',
    setMealId: '@integer(1, 6)',
    openPeople: '@cword(2, 3)'
})
// 添加机构
$mock.post('/customer/addOrganization', {
    code: 200
})
// 编辑机构
$mock.post('/customer/editOrganization', {
    code: 200
})
// 删除机构
$mock.del('/customer/deleteOrganization', {
    code: 200
})
// 启用机构
$mock.post('/customer/enableOrganization', {
    code: 200
})
// 禁用机构
$mock.post('/customer/disableOrganization', {
    code: 200
})
// 个人列表
$mock.get('/customer/personList', ({url}) => {
    const {pageSize} = $mock.parseQuery(url)
    const data = {
        total: 30
    }
    data[`list|${pageSize}`] = [
        {
            'id|+1': 1,
            joinTime: '@datetime()',
            account: '@string("lower", 1, 15)',
            setMealId: '@integer(1, 6)',
            setMealStartDate: '@date()',
            setMealEndDate: '@date()',
            source: '@cword(3, 6)',
            storeNum: {
                shoppe: '@integer(1, 5)',
                pdd: '@integer(1, 5)'
            },
            goodsNum: {
                shoppe: '@integer(1, 100)',
                pdd: '@integer(1, 100)'
            },
            purchaseTotal: '@integer(10, 50)',
            additionalService: {
                picTranslate: '@integer(1, 100)/800',
                textTranslate: '@integer(1, 100)/500'
            },
            earningTotal: {
                order: '@float(1000, 10000, 2, 2)',
                purchase: '@float(1000, 10000, 2, 2)',
                profit: '@float(1000, 10000, 2, 2)'
            },
            states: '@integer(0, 1)'
        }
    ]
    return $mock.mock(data)
})
// 启用个人
$mock.post('/customer/enablePerson', {
    code: 200
})
// 冻结个人
$mock.post('/customer/disablePerson', {
    code: 200
})
import $mock from '@/utils/mock'

// 分类列表
$mock.get('/goods/classify/list', {
    list: [
        {
            id: 1,
            pid: 0,
            name: '服装',
            updateTime: '@datetime()',
            goodsNum: '@integer(100, 1000)',
            status: '@integer(0, 1)',
            updater: '@cword(2, 3)',
            deep: 1
        },
        {
            id: 2,
            pid: 1,
            name: '上装',
            updateTime: '@datetime()',
            goodsNum: '@integer(100, 1000)',
            status: '@integer(0, 1)',
            updater: '@cword(2, 3)',
            deep: 2
        },
        {
            id: 3,
            pid: 1,
            name: '下装',
            updateTime: '@datetime()',
            goodsNum: '@integer(100, 1000)',
            status: '@integer(0, 1)',
            updater: '@cword(2, 3)',
            deep: 2
        },
        {
            id: 4,
            pid: 2,
            name: '外套',
            updateTime: '@datetime()',
            goodsNum: '@integer(100, 1000)',
            status: '@integer(0, 1)',
            updater: '@cword(2, 3)',
            deep: 3
        },
        {
            id: 5,
            pid: 2,
            name: '衬衫',
            updateTime: '@datetime()',
            goodsNum: 0,
            status: '@integer(0, 1)',
            updater: '@cword(2, 3)',
            deep: 3
        },
        {
            id: 6,
            pid: 3,
            name: '长裤',
            updateTime: '@datetime()',
            goodsNum: '@integer(100, 1000)',
            status: '@integer(0, 1)',
            updater: '@cword(2, 3)',
            deep: 3
        },
        {
            id: 7,
            pid: 3,
            name: '裙子',
            updateTime: '@datetime()',
            goodsNum: '@integer(100, 1000)',
            status: '@integer(0, 1)',
            updater: '@cword(2, 3)',
            deep: 3
        },
        {
            id: 8,
            pid: 0,
            name: '数码',
            updateTime: '@datetime()',
            goodsNum: '@integer(100, 1000)',
            status: '@integer(0, 1)',
            updater: '@cword(2, 3)',
            deep: 1
        },
        {
            id: 9,
            pid: 8,
            name: '手机',
            updateTime: '@datetime()',
            goodsNum: '@integer(100, 1000)',
            status: '@integer(0, 1)',
            updater: '@cword(2, 3)',
            deep: 2
        },
        {
            id: 10,
            pid: 8,
            name: '电脑',
            updateTime: '@datetime()',
            goodsNum: '@integer(100, 1000)',
            status: '@integer(0, 1)',
            updater: '@cword(2, 3)',
            deep: 2
        },
        {
            id: 11,
            pid: 9,
            name: '小米',
            updateTime: '@datetime()',
            goodsNum: '@integer(100, 1000)',
            status: '@integer(0, 1)',
            updater: '@cword(2, 3)',
            deep: 3
        },
        {
            id: 12,
            pid: 9,
            name: '苹果',
            updateTime: '@datetime()',
            goodsNum: '@integer(100, 1000)',
            status: '@integer(0, 1)',
            updater: '@cword(2, 3)',
            deep: 3
        },
        {
            id: 13,
            pid: 10,
            name: '联想',
            updateTime: '@datetime()',
            goodsNum: '@integer(100, 1000)',
            status: '@integer(0, 1)',
            updater: '@cword(2, 3)',
            deep: 3
        },
        {
            id: 14,
            pid: 10,
            name: '戴尔',
            updateTime: '@datetime()',
            goodsNum: '@integer(100, 1000)',
            status: '@integer(0, 1)',
            updater: '@cword(2, 3)',
            deep: 3
        }
    ]
})
// 新增分类
$mock.post('/goods/classify/add', {
    code: 200
})
// 编辑分类
$mock.post('/goods/classify/edit', {
    code: 200
})
// 禁用分类
$mock.post('/goods/classify/disable', {
    code: 200
})
// 启用分类
$mock.post('/goods/classify/enable', {
    code: 200
})
// 删除分类
$mock.del('/goods/classify/del', {
    code: 200
})
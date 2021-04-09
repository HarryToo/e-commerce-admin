import $mock from '@/utils/mock'
import $http from "@/utils/http";

// 专题列表
$mock.get('/operation/specialList', ({url}) => {
    const {pageSize} = $mock.parseQuery(url)
    const data = {
        total: 30
    }
    data[`list|${pageSize}`] = [
        {
            'id|+1': 1,
            name: '@cword(4)',
            updateTime: '@datetime()',
            goodsNum: '@integer(100, 1000)',
            status: '@integer(0, 1)',
            updater: '@cword(2, 3)',
            'children|1': [
                [
                    {
                        'id|+1': 666,
                        'pid|+1': 1,
                        name: '@cword(4)',
                        updateTime: '@datetime()',
                        goodsNum: '@integer(100, 1000)',
                        status: '@integer(0, 1)',
                        updater: '@cword(2, 3)',
                    },
                    {
                        'id|+1': 777,
                        'pid|+1': 1,
                        name: '@cword(4)',
                        updateTime: '@datetime()',
                        goodsNum: '@integer(100, 1000)',
                        status: '@integer(0, 1)',
                        updater: '@cword(2, 3)',
                    },
                    {
                        'id|+1': 888,
                        'pid|+1': 1,
                        name: '@cword(4)',
                        updateTime: '@datetime()',
                        goodsNum: '@integer(100, 1000)',
                        status: '@integer(0, 1)',
                        updater: '@cword(2, 3)',
                    }
                ],
                undefined
            ]
        }
    ]
    return $mock.mock(data)
})
// 添加专题
$mock.post('/operation/addSpecial', {
    code: 200
})
// 删除专题
$mock.del('/operation/deleteSpecial', {
    code: 200
})
// 启用专题
$mock.post('/operation/enableSpecial', {
    code: 200
})
// 禁用专题
$mock.post('/operation/disableSpecial', {
    code: 200
})
// 编辑专题
$mock.post('/operation/editSpecial', {
    code: 200
})
// 专题下已添加的商品列表
$mock.get('/operation/goodsList', ({url}) => {
    const {pageSize} = $mock.parseQuery(url)
    const data = {
        total: 30
    }
    data[`list|${pageSize}`] = [
        {
            'id|+1': 1,
            'number|+1': 10000000000,
            info: {
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
            minPrice: '@float(1000, 1500, 2, 2)',
            maxPrice: '@float(2000, 3000, 2, 2)',
            stockNum: '@integer(500, 1000)',
            shopNum: '@integer(500, 1000)',
            purchaseNum: '@integer(100, 500)',
            status: '@integer(0, 1)'
        }
    ]
    return $mock.mock(data)
})
// 添加商品
$mock.post('/operation/addGoods', {
    code: 200
})
// 移除商品
$mock.post('/operation/removeGoods', {
    code: 200
})

import $mock from '@/utils/mock'

// 平台商品库列表
$mock.get('/goods/platform/list', ({url}) => {
    const {pageSize} = $mock.parseQuery(url)
    const data = {
        total: 30
    }
    data[`list|${pageSize}`] = [
        {
            'id|+1': 1,
            'number|+1': 10000000000,
            info: {
                cover: '@image("150x150", "#F9612E")',
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
// 批量获取商品信息
$mock.get('/goods/platform/batchInfo', ({url}) => {
    let {ids} = $mock.parseQuery(url)
    ids = JSON.parse(ids)
    const data = {}
    return $mock.mock({
        list: ids.map((id) => {
            return {
                id,
                cover: '@image("90x90", "#F9612E")',
                name: '@cword(30, 50)',
                price: '@float(1000, 1500, 2, 2)',
                stockNum: '@integer(500, 1000)'
            }
        })
    })
})
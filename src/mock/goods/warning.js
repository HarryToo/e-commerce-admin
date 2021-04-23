import $mock from '@/utils/mock'
import moment from "moment";

// 预警商品列表
$mock.get('/goods/warning/list', ({url}) => {
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
            warningReason: '@cword(4, 5)',
            addTime: '@datetime()',
            status: 0
        }
    ]
    return $mock.mock(data)
})
// 当前预警设置
$mock.get('/goods/warning/settings', {
    time: '00:20:00',
    options: [1, 2],
    minInventory: ''
})
// 保存预警设置
$mock.post('/goods/warning/settings', {
    code: 200
})

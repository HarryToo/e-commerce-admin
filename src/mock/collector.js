import $mock from '@/utils/mock'

// 货源平台列表
$mock.get('/collector/platformList', {
    'list|5': [
        {
            'id|+10': 1,
            logo: '@image(40x40, #F9612E)',
            name: '@cword(2, 4)',
            type: '@integer(1, 2)',
            url: 'https://www.baidu.com'
        }
    ]
})
// 通过商品链接采集
$mock.post('/collector/collectGoods', {
    code: 200
})
// 通过店铺链接采集
$mock.post('/collector/collectStore', {
    code: 200
})
// 采集器配置信息
$mock.get('/collector/configs', {
    supplyPlatformPrice: 1,
    retailPlatformPrice: 1,
    skuInventoryThreshold: '',
    skipOptions: [1, 2, 4],
    skipInventoryThreshold: ''
})
// 保存配置和平台列表
$mock.post('/collector/save', {
    code: 200
})
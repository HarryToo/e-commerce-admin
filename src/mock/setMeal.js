import $mock from '@/utils/mock'

// 机构套餐列表
$mock.get('/setMeal/organizationSetMealList', {
    'list|6': [
        {
            'id|+1': 1,
            name: '@cword(2)版套餐',
            price: '@integer(100, 1000)',
            funcIds: [3, 4, 5, 6],
            rate: '@integer(1, 10)'
        }
    ]
})
// 个人套餐列表
$mock.get('/setMeal/personalSetMealList', {
    'list|6': [
        {
            'id|+1': 1,
            name: '@cword(2)版套餐',
            price: '@integer(100, 1000)',
            funcIds: [3, 4, 5, 6],
            rate: '@integer(1, 10)'
        }
    ]
})
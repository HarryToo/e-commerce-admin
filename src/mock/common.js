import $mock from '@/utils/mock'

// 概览数据
$mock.get('/overviewData', {
    warning_goods_num: '@integer(0, 100)',
    sale_goods_num: '@integer(0, 10000000)',
    order_num: '@integer(0, 10000)',
    organization_num: '@integer(0, 100)',
    student_num: '@integer(0, 100000)'
})

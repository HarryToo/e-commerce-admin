import $mock from '@/utils/mock'

// 文件上传
$mock.post('/common/fileUpload', {
    code: 200,
    url: '@image(40x40, #F9612E)'
})
// 概览数据
$mock.get('/common/overviewData', {
    warning_goods_num: '@integer(0, 100)',
    sale_goods_num: '@integer(0, 10000000)',
    order_num: '@integer(0, 10000)',
    organization_num: '@integer(0, 100)',
    student_num: '@integer(0, 100000)'
})
// 快递公司列表
$mock.get('/common/courierCompanyList', {
    'list|5': [
        {
            'id"+1': 1,
            code: '@string(upper, 4)',
            name: '@cword(2)快递'
        }
    ]
})

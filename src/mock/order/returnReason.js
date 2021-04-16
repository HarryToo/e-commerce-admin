import $mock from '@/utils/mock'

// 退换货原因列表
$mock.get('/order/reason/list', ({url}) => {
    const {pageSize} = $mock.parseQuery(url)
    const data = {
        total: 30
    }
    data[`list|${pageSize}`] = [
        {
            'id|+1': 1,
            reason: '@cword(4, 6)',
            remark: '@cparagraph(1)',
            status: '@integer(0, 1)',
            updateTime: '@datetime()',
            updater: '@cname()'
        }
    ]
    return $mock.mock(data)
})
// 新增
$mock.post('/order/reason/add', {
    code: 200
})
// 编辑
$mock.post('/order/reason/edit', {
    code: 200
})
// 启用
$mock.post('/order/reason/enable', {
    code: 200
})
// 禁用
$mock.post('/order/reason/disable', {
    code: 200
})
// 删除
$mock.del('/order/reason/del', {
    code: 200
})
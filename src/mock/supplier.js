import $mock from '@/utils/mock'

// 供应商列表
$mock.get('/supplier/list', ({url}) => {
    const {pageSize} = $mock.parseQuery(url)
    const data = {
        total: 30
    }
    data[`list|${pageSize}`] = [
        {
            'id|+1': 1,
            time: '@datetime()',
            name: '@cword(4, 6)',
            industry: '@cword(2, 4)业',
            storeType: '@integer(0, 1)',
            contact: '@cword(2, 3)',
            phone: '1@string("number", 10)',
            remark: '@cparagraph(0, 4)'
        }
    ]
    return $mock.mock(data)
})
// 提交备注
$mock.post('/supplier/remark', {
    code: 200
})
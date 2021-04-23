import $mock from '@/utils/mock'

// 常规设置
$mock.get('/order/configs', {
    autoCancelDuration: 30,
    autoReceiveDuration: 5,
    afterSaleDuration: 7
})
// 常规设置
$mock.post('/order/configs', {
    code: 200
})
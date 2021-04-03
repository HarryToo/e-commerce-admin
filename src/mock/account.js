import $mock from '@/utils/mock'

// 登录
$mock.post('/login', {
    code: 200,
    token: '@string("lower", 50)'
})
// 重设密码
$mock.post('/restPassword', {
    code: 200
})
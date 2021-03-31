import $mock from '@/utils/mock'

// 登录
$mock.post('/login', {
    code: 200,
    token: '@string("lower", 50)'
})
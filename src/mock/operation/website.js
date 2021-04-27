import $mock from '@/utils/mock'
import {WebsiteConfigTemplate} from '@/store/modules/decoration/configTemplate'

// 获取大众版配置
$mock.get('/operation/website/mass/configs', {
    ...new WebsiteConfigTemplate(),
    updateTime: '2021-04-27 15:00:00'
})
// 保存大众版配置
$mock.post('/operation/website/mass/configs', {
    code: 200
})
// 发布大众版配置
$mock.post('/operation/website/mass/publishConfigs', {
    code: 200
})
// 获取机构版配置
$mock.get('/operation/website/organization/configs', {
    ...new WebsiteConfigTemplate(),
    updateTime: '2021-04-27 16:00:00'
})
// 保存机构版配置
$mock.post('/operation/website/organization/configs', {
    code: 200
})
// 发布机构版配置
$mock.post('/operation/website/organization/publishConfigs', {
    code: 200
})
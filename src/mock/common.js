import Mock from 'mockjs'

const apiBaseUrl = process.env.VUE_APP_API_MOCK_URL

function getUrl(url) {
    const fullUrl = apiBaseUrl + url
    return RegExp(fullUrl.replace(/\//g, '\\/') + '.*')
}

// 概览数据
Mock.mock(getUrl('/overviewData'), 'get', {
    warning_goods_num: '@integer(0, 100)',
    sale_goods_num: '@integer(0, 10000000)',
    order_num: '@integer(0, 10000)',
    organization_num: '@integer(0, 100)',
    student_num: '@integer(0, 100000)'
})

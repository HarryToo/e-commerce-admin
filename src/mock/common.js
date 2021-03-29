import Mock from 'mockjs'

const apiBaseUrl = process.env.VUE_APP_API_MOCK_URL

// 概览数据
Mock.mock(apiBaseUrl + '/overviewData', 'get', {
    classified_statistic: {
        warning_goods_num: '@integer(0, 100)',
        sale_goods_num: '@integer(0, 10000000)',
        order_num: '@integer(0, 10000)',
        organization_num: '@integer(0, 100)',
        student_num: '@integer(0, 100000)'
    }
})
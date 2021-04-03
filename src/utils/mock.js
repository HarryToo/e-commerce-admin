import Mock from 'mockjs'

const apiMockUrl = process.env.VUE_APP_API_MOCK_URL

function getUrl(url) {
    const fullUrl = apiMockUrl + url
    return RegExp(fullUrl.replace(/\//g, '\\/') + '.*')
}

export default {
    mock: Mock.mock,
    get(url, responseData) {
        Mock.mock(getUrl(url), 'get', responseData)
    },
    post(url, responseData) {
        Mock.mock(apiMockUrl + url, 'post', responseData)
    },
    put(url, responseData) {
        Mock.mock(apiMockUrl + url, 'put', responseData)
    },
    del(url, responseData) {
        Mock.mock(getUrl(url), 'delete', responseData)
    },
    parseQuery(url) {
        const queryArr = url.split('?')[1].split('&')
        const param = {}
        queryArr.forEach((item) => {
            const mapArr = item.split('=')
            param[mapArr[0]] = mapArr[1]
        })
        return param
    }
}
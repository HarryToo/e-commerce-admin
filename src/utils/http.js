import axios from 'axios'
import {ElLoading} from 'element-plus'

const baseURL = process.env.VUE_APP_API_MOCK_URL

const http = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
        'Authorization': sessionStorage.getItem('token')
    }
})

let loadingInstance

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // loading覆盖区域处理
    // 请求参数包含dialogLoading: true自动启用dialog弹窗内loading，默认为主内容窗体
    const params = config.method === 'get' || config.method === 'delete' ? config.params : config.data
    let loadingTarget = '.el-main'
    if (params) {
        const {
            dialogLoading,
            ...realParams
        } = params
        if (dialogLoading) {
            loadingTarget = '.el-dialog__body'
        }
        if (config.method === 'get' || config.method === 'delete') {
            config.params = realParams
        } else {
            config.data = realParams
        }
    }
    // 在发送请求之前做些什么
    if (loadingInstance) {
        loadingInstance.close()
    }
    loadingInstance = ElLoading.service({
        target: loadingTarget,
        text: '让我转一会儿'
    })
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let reqData
    if (response.config.method === 'get' || response.config.method === 'delete') {
        reqData = response.config.params
    } else {
        reqData = typeof response.config.data === 'string' ? JSON.parse(response.config.data) : response.config.data
    }
    loadingInstance.close()
    console.log(response.config.method + '请求：' + response.config.url + '\n', reqData, response.data)
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    loadingInstance.close()
    return Promise.reject(error)
})

export default {
    get(url, params) {
        return http.get(url, {params})
    },
    post(url, params) {
        return http.post(url, params)
    },
    put(url, params) {
        return http.put(url, params)
    },
    del(url, params) {
        return http.delete(url, {params})
    },
    baseURL
}
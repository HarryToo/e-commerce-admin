import axios from 'axios'

const baseURL = process.env.VUE_APP_API_MOCK_URL

const http = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
        'Authorization': sessionStorage.getItem('token')
    }
});

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
})

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    let reqData
    if (response.config.method === 'get') {
        reqData = response.config.params
    } else {
        reqData = typeof response.config.data === 'string' ? JSON.parse(response.config.data) : response.config.data;
    }
    console.log(response.config.method + '请求：' + response.config.url + '\n', reqData, response.data);
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
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
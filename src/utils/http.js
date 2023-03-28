import axios from "axios"
import { ElMessage } from 'element-plus'

const http = axios.create({
    baseURL: "http://127.0.0.1:3000/admin/api",
    timeout: 3000
})

// 请求拦截器
http.interceptors.request.use((config) => {
    // 给头部加上token
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
    }
    return config
}, err => {
    return Promise.reject(err)
})

// 响应拦截器
http.interceptors.response.use((response) => {

    return response
}, err => {
    // 前端处理响应错误
    const $message = ElMessage;
    if (err.response.data.message) {
        $message({
            type: 'error',
            message: err.response.data.message
        })
    }
    return Promise.reject(err)
})

export default http
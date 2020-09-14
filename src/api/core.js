// 核心文件  引入封装axios
import axios from "axios";
import { METHOD } from "./config";
import store from "../store/index"


// 获取当前文件路径
// const baseApi = require("../config/env." + process.env.NODE_ENV);
// // axios创建实例
// const instance = axios.create({
//   baseURL: baseApi,
//   timeout: 60000
// })

const {  baseUrl } = require('../config/env.' + process.env.NODE_ENV);
// const bseUrl='www.test.com'
// const baseUrl='/api'
// create an axios instance
const instance = axios.create({
  baseURL: baseUrl, // url = base api url + request url
  timeout: 50000 // request timeout
})
//添加请求拦截器   （在发送之前要做些什么）
instance.interceptors.request.use((config) => {
  if (store.state.token) {
    config.headers.token = store.state.token
  }
  return config
}, (error) => {  // 请求错误
  return Promise.reject(error)
})

//添加响应拦截器 （数据请求成功后做些什么）
instance.interceptors.response.use((response) => {
  const res = response.data
  if (res.status && res.status !== 200) {
    // 登录超时,重新登录
    if (res.status === 401) {
       n  
      store.dispatch('FedLogOut').then(() => {
        location.reload()
      })
    }
    return Promise.reject(res || 'error')
  } else {
    return Promise.resolve(res)
  }
}, (error) => {  // 响应错误
  return Promise.reject(error)
})

// 抛出去一个函数
export function request(method, url, params) {
  switch (method) {
    case METHOD.GET:
      return GET(url, params);
    case METHOD.POST:
      return POST(url, params);
    case METHOD.PATCH:
      return PATCH(url, params);
  }
}

// get请求  返回值是一个promise对象
function GET(url, params) {
  return instance.get(url, params);
}
// post请求
function POST(url, params) {
  return instance.post(url, params);
}
// patch请求
function PATCH(url, params) {
  return instance.patch(url, params);
}


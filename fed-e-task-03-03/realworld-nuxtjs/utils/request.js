/**
 * 基于 axios 封装的请求模块
 */

import axios from "axios"
const request = axios.create({
  // baseURL: "https://conduit.productionready.io"
  baseURL: "http://realworld.api.fed.lagounews.com"
})

// 请求拦截器
// 任何请求都需要经过拦截器
// 在请求拦截器中做一些公共的业务处理，例如统一设置 token
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.Authorization = `Token Token数据`
  return config;
}, function (error) {
  // Do something with request error
  // 请求失败（未发出时）
  return Promise.reject(error);
})
// 响应拦截器

export default request
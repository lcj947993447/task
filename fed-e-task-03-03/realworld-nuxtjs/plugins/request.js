/**
 * 基于 axios 封装的请求模块
 */

import axios from "axios"

export const request = axios.create({
  // baseURL: "https://conduit.productionready.io"
  baseURL: "http://realworld.api.fed.lagounews.com"
})

// 通过 nuxt 插件机制获取上下文对象（query、params、req、res、app、store......）
// 插件导出必须作为 default 成员
export default ({ store, router }) => {
  // 请求拦截器
  // 任何请求都需要经过拦截器
  // 在请求拦截器中做一些公共的业务处理，例如统一设置 token
  const { user } = store.state
  request.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (user && user.token)
    {
      config.headers.Authorization = `Token ${user.token}`
    }

    return config;
  }, function (error) {
    // Do something with request error
    // 请求失败（未发出时）
    return Promise.reject(error);
  })
  // 响应拦截器
  request.interceptors.response.use(res => {
    if (res.status === 200)
    {
      return res
    } else
    {
      location.href = '/'
    }
  },
    error => {
      alert('请求失败，请稍后重试！')
      return Promise.reject(error)
    }
  )
}

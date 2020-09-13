/**
 * 用户认证相关接口模块
 */

import { request } from '@/plugins/request'

//  注册
export const register = data => {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}
// 登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}

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

// 获取当前用户资料  
export const currentUser = () => {
  return request({
    method: 'GET',
    url: '/api/user'
  })
}

// 修改个人资料 PUT /api/user
export const updateUser = data => {
  return request({
    method: 'PUT',
    url: '/api/user',
    data
  })
}
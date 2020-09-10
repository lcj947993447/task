/**
 * 用户认证相关接口模块
 */

import request from '@/utils/request'

export const register = async (data) => {
  const res = await request({
    method: 'POST',
    url: '/api/users',
    data,
  })

  return res.data
}

export const login = async (data) => {
  const res = await request({
    method: 'POST',
    url: '/users/login',
    data,
  })

  return res.data
}

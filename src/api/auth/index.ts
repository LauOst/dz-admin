import http from '@/utils/request'
import { Login } from './types'

/**
 * 登录API
 *
 * @param data {ReqLogin}
 * @returns
 */
export const loginApiTest = (data: Login.ReqLogin) => {
  return http.post<Login.ResLogin>(`/api/v1/auth/login`, data)
}

export const loginApi = (data: Login.ReqLogin) => {
  const formData = new FormData()
  formData.append('username', data.username!)
  formData.append('password', data.password!)
  formData.append('verifyCodeKey', data.verifyCodeKey || '')
  formData.append('verifyCode', data.verifyCode || '')
  console.log('data', data)
  console.log('formData', formData)
  return http.service({
    url: '/api/v1/auth/login',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

/**
 * 注销API
 */
export const logoutApi = () => {
  return http.delete<Login.ResLogin>(`/api/v1/auth/logout`)
}

/**
 * 获取验证码
 */
export const getCaptchaApi = () => {
  return http.get<any>(`/api/v1/auth/captcha`)
}

import http from '@/utils/request'
import { User } from './types'

/**
 * 登录成功后获取用户信息（昵称、头像、权限集合和角色集合）
 */
export const getUserInfo = () => {
  return http.get<User.UserInfo>(`/api/v1/users/me`)
}

/**
 * 获取用户分页列表
 *
 * @param params
 */
export const getUserPage = (params?: User.ReqUserParams) => {
  return http.get<User.ResUserList>(`/api/v1/users/page`, params)
}

/**
 * 修改用户状态
 *
 * @param id
 * @param status
 */
export const updateUserStatus = ({ id, status }) => {
  return http.service({
    url: `/api/v1/users/${id}/status`,
    method: 'patch',
    params: { status },
  })
}

/**
 * 编辑用户
 *
 * @param data
 */
export const updateUser = (data) => {
  return http.put<any>(`/api/v1/users/${data.id}`, data)
}

/**
 * 删除用户
 *
 * @param ids
 */
export const deleteUsers = ({ ids }) => {
  return http.delete<any>(`/api/v1/users/${ids}`)
}

/**
 * 修改用户密码
 *
 * @param id
 * @param password
 */
export const updateUserPassword = (id: number, password: string) => {
  return http.service({
    url: `/api/v1/users/${id}/password`,
    method: 'patch',
    params: { password },
  })
}

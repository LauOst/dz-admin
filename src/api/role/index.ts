import http from '@/utils/request'
import { Role } from '@/api/role/types'

/**
 * 获取角色分页数据
 *
 * @param params
 */
export const getRolePage = (params?: Role.ReqRoleParams) => {
  return http.get<Role.ResRoleList>(`/api/v1/roles/page`, params)
}

/**
 * 获取角色下拉数据
 */
export const listRoleOptions = () => {
  return http.get<any>(`/api/v1/roles/options`)
}

/**
 * 获取角色的菜单ID集合
 *
 * @param roleId
 */

export const getRoleMenuIds = (roleId: number) => {
  return http.get<number[]>(`/api/v1/roles/${roleId}/menuIds`)
}

/**
 * 分配菜单权限给角色
 *
 * @param data
 */
export const updateRoleMenus = (data) => {
  return http.put(`/api/v1/roles/${data.id}/menus`, data.permissionId)
}

/**
 * 获取角色详情
 *
 * @param id
 */

export const getRoleForm = (id: number) => {
  return http.get<Role.RoleForm>(`/api/v1/roles/${id}/form`)
}

/**
 * 添加角色
 *
 * @param data
 */
export const addRole = (data: Role.RoleForm) => {
  return http.post(`/api/v1/roles`, data)
}

/**
 * 修改角色
 *
 * @param data
 */
export const updateRole = (data: Role.RoleForm) => {
  return http.put(`/api/v1/roles/${data.id}`, data)
}

/**
 * 删除角色
 *
 * @param id 菜单ID
 */
export const deleteRoles = ({ id }) => {
  return http.delete<any>(`/api/v1/roles/${id}`)
}

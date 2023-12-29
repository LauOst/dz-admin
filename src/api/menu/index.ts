import http from '@/utils/request'
import { Menu } from '@/api/menu/types'

/**
 * 获取路由列表
 */
export const listRoutes = () => {
  return http.get(`/api/v1/menus/routes`)
}

/**
 * 获取菜单树形列表
 *
 * @param params
 */
export const listMenus = (params: Menu.ReqMenuParams) => {
  return http.get<Menu.ResMenuList>(`/api/v1/menus`, params)
}

/**
 * 获取菜单下拉树形列表
 */
export const listMenuOptions = () => {
  return http.get<OptionType[]>(`/api/v1/menus/options`)
}

/**
 * 获取菜单表单数据
 *
 * @param id
 */
export const getMenuForm = (id: number) => {
  return http.get<OptionType[]>(`/api/v1/menus/${id}/form`)
}

/**
 * 添加菜单
 *
 * @param data
 */
export const addMenu = (data: Menu.MenuForm) => {
  return http.post(`/api/v1/menus`, data)
}

/**
 * 修改菜单
 *
 * @param data
 */
export const updateMenu = (data: Menu.MenuForm) => {
  return http.put(`/api/v1/menus/${data.id}`, data)
}

/**
 * 删除菜单
 *
 * @param id 菜单ID
 */
export const deleteMenu = ({ id }) => {
  return http.delete<any>(`/api/v1/menus/${id}`)
}

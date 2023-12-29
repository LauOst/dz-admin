// * 用户管理模块
export namespace Role {
  /**
   * 用户分页请求
   */
  export interface ReqRoleParams extends ReqPage {
    keywords?: string | number
  }
  /**
   * 用户分页对象
   */
  export interface ResRoleList {
    /**
     * 角色编码
     */
    code?: string

    /**
     * 角色ID
     */
    id?: number
    /**
     * 角色名称
     */
    name?: string
    /**
     * 排序
     */
    sort?: number
    /**
     * 角色状态
     */
    status?: number
    /**
     * 创建时间
     */
    createTime?: Date
    /**
     * 修改时间
     */
    updateTime?: Date
  }

  /**
   * 角色表单对象
   */
  export interface RoleForm {
    /**
     * 角色ID
     */
    id?: number

    /**
     * 角色编码
     */
    code: string
    /**
     * 数据权限
     */
    dataScope?: number

    /**
     * 角色名称
     */
    name: string
    /**
     * 排序
     */
    sort?: number
    /**
     * 角色状态(1-正常；0-停用)
     */
    status?: number
  }
}

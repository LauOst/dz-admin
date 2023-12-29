// * 用户管理模块
export namespace User {
  /**
   * 登录用户信息
   */
  export interface UserInfo {
    userId: number
    nickname: string
    avatar: string
    roles: string[]
    perms: string[]
  }

  /**
   * 用户分页请求
   */
  export interface ReqUserParams extends ReqPage {
    keywords?: string | number
  }
  /**
   * 用户分页对象
   */
  export interface ResUserList {
    /**
     * 用户头像地址
     */
    avatar?: string
    /**
     * 创建时间
     */
    createTime?: Date
    /**
     * 部门名称
     */
    deptName?: string
    /**
     * 用户邮箱
     */
    email?: string
    /**
     * 性别
     */
    genderLabel?: string
    /**
     * 用户ID
     */
    id?: number
    /**
     * 手机号
     */
    mobile?: string
    /**
     * 用户昵称
     */
    nickname?: string
    /**
     * 角色名称，多个使用英文逗号(,)分割
     */
    roleNames?: string
    /**
     * 用户状态(1:启用;0:禁用)
     */
    status?: number
    /**
     * 用户名
     */
    username?: string
  }
  export interface ResStatus {
    userLabel: string
    userValue: number
  }
  export interface ResGender {
    genderLabel: string
    genderValue: number
  }
  export interface ResDepartment {
    id: string
    name: string
    children?: ResDepartment[]
  }
}

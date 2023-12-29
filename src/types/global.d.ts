declare global {
  // * 请求响应参数(不包含data)
  interface Result {
    code: string
    msg: string
  }
  /**
   * 请求响应参数(包含data)
   */
  interface ResultData<T = any> extends Result {
    data: T
  }
  // * 分页响应参数
  interface ResPage<T> {
    datalist: T[]
    pageNum: number
    pageSize: number
    total: number
  }
  // * 分页请求参数
  interface ReqPage {
    pageNum: number
    pageSize: number
  }
  // * 文件上传模块
  namespace Upload {
    export interface ResFileUrl {
      fileUrl: string
    }
  }

  /**
   * 组件数据源
   */
  interface OptionType {
    /**
     * 值
     */
    value: number
    /**
     * 文本
     */
    label: string
    /**
     * 子列表
     */
    children?: OptionType[]
  }
}
// declare const myAge: string
export {}

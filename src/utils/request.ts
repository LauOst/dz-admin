/**
 * @Description: axios配置
 * @Date: 2023/1/17 1:51 PM
 */
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStoreHook } from '@/store/modules/user'

const config = {
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  // 跨域时候允许携带凭证
  // withCredentials: true,
}

class RequestHttp {
  service: AxiosInstance

  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config)
    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
     */
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const userStore = useUserStoreHook()
        if (userStore.token) {
          config.headers.Authorization = userStore.token
        }
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      },
    )
    /**
     * @description 响应拦截器
     *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { code, msg } = response.data

        if (code === '00000') {
          return response.data
        }

        if (response.data instanceof ArrayBuffer) {
          return response
        }
        ElMessage.error(msg || '系统出错')
        return Promise.reject(new Error(msg || 'Error'))
      },
      async (error: any) => {
        if (error.response.data) {
          const { code, msg } = error.response.data

          // token 过期,重新登录
          if (code === 'A0230') {
            ElMessageBox.confirm('当前页面已失效，请重新登录', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
            }).then(() => {
              localStorage.clear()
              window.location.href = '/'
            })
          } else {
            console.log('msg', msg)
            ElMessage.error(msg || '系统出错')
          }
        }
        return Promise.reject(error.message)
      },
    )
  }

  // * 常用请求方法封装
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object })
  }

  post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object)
  }

  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object)
  }

  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object })
  }
}

export default new RequestHttp(config)

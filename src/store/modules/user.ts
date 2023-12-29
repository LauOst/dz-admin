import { useStorage } from '@vueuse/core'
import { loginApi, logoutApi } from '@/api/auth'
import { getUserInfo } from '@/api/user'
// import { resetRouter } from '@/router'
import { store } from '@/store'

import { Login } from '@/api/auth/types'
import { resetRouter } from '@/router'

export const useUserStore = defineStore('user', () => {
  // state
  const userId = ref()
  const token = useStorage('accessToken', '')
  const nickname = ref('')
  const avatar = ref('')
  const roles = ref<Array<string>>([]) // 用户角色编码集合 → 判断路由权限
  const perms = ref<Array<string>>([]) // 用户权限编码集合 → 判断按钮权限

  /**
   * 登录调用
   *
   * @param {LoginData}
   * @returns
   */
  function login(loginData: Login.ReqLogin) {
    return new Promise<void>((resolve, reject) => {
      loginApi(loginData)
        .then((response) => {
          const { tokenType, accessToken } = response.data
          token.value = `${tokenType} ${accessToken}` // Bearer eyJhbGciOiJIUzI1NiJ9.xxx.xxx
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  // 获取信息(用户昵称、头像、角色集合、权限集合)
  function getInfo() {
    return new Promise<any>((resolve, reject) => {
      getUserInfo()
        // eslint-disable-next-line consistent-return
        .then(({ data }) => {
          if (!data) {
            // eslint-disable-next-line prefer-promise-reject-errors
            return reject('Verification failed, please Login again.')
          }
          if (!data.roles || data.roles.length <= 0) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('getUserInfo: roles must be a non-null array!')
          }
          userId.value = data.userId
          nickname.value = data.nickname
          avatar.value = data.avatar
          roles.value = data.roles
          perms.value = data.perms
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  // 注销
  function logout() {
    return new Promise<void>((resolve, reject) => {
      logoutApi()
        .then(() => {
          resetRouter()
          resetToken()
          // eslint-disable-next-line no-restricted-globals
          location.reload() // 清空路由
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  // 重置
  function resetToken() {
    token.value = ''
    nickname.value = ''
    avatar.value = ''
    roles.value = []
    perms.value = []
  }
  return {
    token,
    nickname,
    avatar,
    roles,
    perms,
    login,
    logout,
    getInfo,
    resetToken,
    /**
     * 当前登录用户ID
     */
    userId,
  }
})

// 非setup
export function useUserStoreHook() {
  return useUserStore(store)
}

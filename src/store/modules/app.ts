import { useStorage } from '@vueuse/core'

// 导入 Element Plus 中英文语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import defaultSettings from '@/settings'

export const useAppStore = defineStore('app', () => {
  // state
  const device = useStorage('device', 'desktop')
  const size = useStorage<any>('size', defaultSettings.size)
  const language = useStorage('language', defaultSettings.language)

  const sidebarStatus = useStorage('sidebarStatus', 'closed')
  const sidebar = reactive({
    opened: sidebarStatus.value !== 'closed',
    withoutAnimation: false,
  })

  /**
   * 根据语言标识读取对应的语言包
   */
  const locale = computed(() => {
    if (language?.value === 'en') {
      return en
    }
    return zhCn
  })

  // actions
  function toggleSidebar(withoutAnimation: boolean) {
    sidebar.opened = !sidebar.opened
    sidebar.withoutAnimation = withoutAnimation
    if (sidebar.opened) {
      sidebarStatus.value = 'opened'
    } else {
      sidebarStatus.value = 'closed'
    }
  }

  function closeSideBar(withoutAnimation: boolean) {
    sidebar.opened = false
    sidebar.withoutAnimation = withoutAnimation
    sidebarStatus.value = 'closed'
  }

  function openSideBar(withoutAnimation: boolean) {
    sidebar.opened = true
    sidebar.withoutAnimation = withoutAnimation
    sidebarStatus.value = 'opened'
  }

  function toggleDevice(val: string) {
    device.value = val
  }

  /**
   * 切换语言
   *
   * @param val
   */
  function changeLanguage(val: string) {
    language.value = val
  }

  return {
    device,
    language,
    locale,
    sidebar,
    size,
    toggleSidebar,
    closeSideBar,
    openSideBar,
    toggleDevice,
    changeLanguage,
  }
})

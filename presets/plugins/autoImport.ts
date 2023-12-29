/**
 * @Description: 按需加载，自动引入
 * @Date: 2022/12/23 10:34 AM
 */
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'

export const createAutoImport = () => {
  return AutoImport({
    dts: 'src/types/auto-imports.d.ts',
    imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
    vueTemplate: true,
    eslintrc: {
      enabled: true, // Default `false`
      filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
      globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
    },
    resolvers: [
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      ElementPlusResolver(),
      // 自动导入图标组件
      IconsResolver({}),
    ],
  })
}

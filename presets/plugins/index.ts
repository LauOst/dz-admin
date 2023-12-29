import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { PluginOption } from 'vite'
import Icons from 'unplugin-icons/vite'
import UnoCSS from 'unocss/vite'
import { createAutoImport } from './autoImport'
import { createComponents } from './component'
import { createSvgIcon } from './svgIcons'
import { createSetupExtend } from './setupExtend'
import { createCompression } from './compress'

export default function createVitePlugins(viteEnv: Record<string, string>, isBuild = false) {
  const vitePlugins: PluginOption[] = [
    vue(),
    // * vite 可以使用 jsx/tsx 语法
    vueJsx(),
    // * 自动安装图标库
    Icons({
      autoInstall: true,
    }),
    UnoCSS({}),
  ]
  // * 自动按需引入依赖
  vitePlugins.push(createAutoImport())
  // * 自动按需引入组件
  vitePlugins.push(createComponents())
  // * name 可以写在 script 标签上
  vitePlugins.push(createSetupExtend())
  // * 使用 svg 图标
  vitePlugins.push(createSvgIcon(isBuild))
  // * 压缩
  isBuild && vitePlugins.push(...createCompression(viteEnv))
  return vitePlugins
}

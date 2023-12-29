/**
 * @Description: 按需加载，自动引入组件
 * @Date: 2022/12/23 10:36 AM
 */
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'

export const createComponents = () => {
  return Components({
    extensions: ['vue'],
    deep: true,
    dts: 'src/types/components.d.ts',
    directoryAsNamespace: false,
    globalNamespaces: [],
    directives: true,
    include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
    resolvers: [
      ElementPlusResolver({ importStyle: false }),
      // 自动注册图标组件
      IconsResolver({
        enabledCollections: ['ep'], // element-plus图标库，其他图标库 https://icon-sets.iconify.design/
      }),
    ],
  })
}

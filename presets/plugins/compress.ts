/**
 * @name ConfigCompressPlugin
 * @description 开启.gz压缩
 */
import { PluginOption } from 'vite'
import viteCompression from 'vite-plugin-compression'

export const createCompression = (env: Record<string, string>) => {
  const { VITE_BUILD_COMPRESS } = env
  const plugin: PluginOption[] = []
  if (VITE_BUILD_COMPRESS) {
    const compressList = VITE_BUILD_COMPRESS.split(',')
    if (compressList.includes('gzip')) {
      // http://doc.ruoyi.vip/ruoyi-vue/other/faq.html#使用gzip解压缩静态文件
      plugin.push(
        viteCompression({
          ext: '.gz',
          deleteOriginFile: false,
        }),
      )
    }
    if (compressList.includes('brotli')) {
      plugin.push(
        viteCompression({
          ext: '.br',
          algorithm: 'brotliCompress',
          deleteOriginFile: false,
        }),
      )
    }
  }
  return plugin
}

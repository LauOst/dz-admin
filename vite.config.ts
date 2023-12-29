import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import createVitePlugins from './presets/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_ENV, VITE_DROP_CONSOLE } = env
  return {
    plugins: createVitePlugins(env, command === 'build'),
    base: VITE_APP_ENV === 'production' ? '/' : '/',
    resolve: {
      alias: {
        // 设置路径
        '~': resolve(__dirname, './'),
        // 设置别名
        '@': resolve(__dirname, './src'),
      },
    },
    css: {
      // CSS 预处理器
      preprocessorOptions: {
        // define global scss variable
        scss: {
          javascriptEnabled: true,
          additionalData: `
            @use "@/styles/variables.scss" as *;
          `,
        },
      },
    },
    server: {
      port: 3080,
      host: true,
      open: true,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        '/dev-api': {
          target: 'http://vapi.youlai.tech',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, ''),
        },
      },
    },
    // * 打包去除 console.log && debugger
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    define: {
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
  }
})

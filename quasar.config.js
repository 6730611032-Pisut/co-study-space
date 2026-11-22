import { resolve } from 'node:path'
import { defineConfig } from '#q-app'

export default defineConfig(() => {
  return {
    boot: ['pinia'],

    css: [
      'app.scss'
    ],

    extras: [
      'roboto-font',
      'material-icons',
    ],

    build: {
      alias: {
        src: resolve(process.cwd(), 'src'),
        pages: resolve(process.cwd(), 'src/pages'),
        layouts: resolve(process.cwd(), 'src/layouts'),
        components: resolve(process.cwd(), 'src/components'),
      },

      target: {
      },

      vueRouterMode: 'hash',

      vitePlugins: [
        ['vite-plugin-checker', {
          eslint: {
            lintCommand: 'eslint -c ./eslint.config.js "./src*/**/*.{js,mjs,cjs,vue}"',
            useFlatConfig: true
          }
        }, { server: false }]
      ]
    },

    devServer: {
      open: true
    },

    framework: {
      config: {},

      plugins: ['Notify']
    },

    animations: [],

    ssr: {
      prodPort: 3000,
      middlewares: [
        "render"
      ],
    },

    ssg: {
    },

    pwa: {
      workboxMode: 'GenerateSW'
    },

    cordova: {},

    capacitor: {
      hideSplashscreen: true
    },

    electron: {
      preloadScripts: [ 'electron-preload' ],
      inspectPort: 5858,

      bundler: 'packager',

      packager: {
      },

      builder: {
        appId: 'co-study-space'
      }
    },

    bex: {
      extraScripts: []
    }
  }
})

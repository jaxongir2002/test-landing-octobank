import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import DefineOptions from 'unplugin-vue-define-options/vite'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    vueJsx(),
    tailwindcss(),
    Pages({
      dirs: ['./src/pages'],

      // ℹ️ We need three routes using single routes so we will ignore generating route for this SFC file
      onRoutesGenerated: routes => [
        // Email filter
        ...routes,
      ],
    }),
    Layouts({
      layoutsDirs: './src/layouts/',
    }),
    AutoImport({

      imports: ['vue', 'vue-router', '@vueuse/core', '@vueuse/math', 'vue-i18n', 'pinia'],
      vueTemplate: true,
    }),
    DefineOptions(),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@images': fileURLToPath(new URL('./src/assets/images/', import.meta.url)),
      '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles/', import.meta.url)),
      '@axios': fileURLToPath(new URL('./src/plugins/axios', import.meta.url)),
      '@validators': fileURLToPath(new URL('./src/utils/validators', import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
  optimizeDeps: {
    entries: [
      './src/**/*.vue',
    ],
  },
})

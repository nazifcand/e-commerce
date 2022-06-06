import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import path from 'path'
import Layouts from 'vite-plugin-vue-layouts';

export default defineConfig({
  plugins: [
    vue(),
    Pages({
      routeStyle: 'nuxt'
    }),
    Layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'default'
    }),
    Components()
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@@': path.resolve(__dirname, './src/assets/scss')
    },
  },
})

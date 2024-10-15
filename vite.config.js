import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks: {
  //         tinymce: ['tinymce']
  //       }
  //     }
  //   }
  // },
  // optimizeDeps: {
  //   include: ['@tinymce/tinymce-react', 'tinymce']
  // }
})

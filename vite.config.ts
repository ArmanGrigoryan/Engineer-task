import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      'process.env': env
    },
    plugins: [react()],
    server: {
      host: "localhost",
      port: 3000,
      hmr: {
        overlay: false
      }
    },
    baseUrl: ".",
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        "comp": path.join(__dirname, "./src/app/components"),
        "store": path.join(__dirname, "./src/store"),
        "utils": path.join(__dirname, "./src/utils"),
      }
    }
  }
})
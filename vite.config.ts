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
    resolve: {
      alias: {
        "comp": path.resolve(__dirname, "./src/app/components"),
        "store": path.resolve(__dirname, "./src/store"),
        "utils": path.resolve(__dirname, "./src/utils"),
      }
    }
  }
})
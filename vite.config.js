import process from "node:process";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    // Keep server dependencies together; function tracing otherwise omits
    // conditional React Router entry points and mixed CJS/ESM exports.
    ssr: { noExternal: true },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: 5173,
      proxy: {
        "/api": {
          target: process.env.VITE_API_URL || env.VITE_API_URL || "http://127.0.0.1:8000",
          rewrite: (path) => path === "/api/blogs" ? "/api/blogs/" : path,
          changeOrigin: true,
        }
      }
    }
  };
})

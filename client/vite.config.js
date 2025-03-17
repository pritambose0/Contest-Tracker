import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": process.env.VITE_API_BASE_URL,
    },
    changeOrigin: true,
    secure: true,
  },
  plugins: [react(), tailwindcss()],
});

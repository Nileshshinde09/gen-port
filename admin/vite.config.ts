import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server:{
    host: "localhost",
    port: 5173,
    proxy:{
      "/api":"http://localhost:8000"
      // "/api":"https://goxy-blogging-platform.onrender.com"
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

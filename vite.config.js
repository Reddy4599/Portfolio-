import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/three/")) return "three-engine";
          if (id.includes("/@react-three/") || id.includes("/three-stdlib/"))
            return "three-scene";
        },
      },
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split vendor libraries into separate chunks for better caching
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-framer": ["framer-motion"],
          "vendor-gsap": ["gsap"],
          "vendor-icons": ["react-icons"],
        },
      },
    },
    // Warn when chunk size exceeds 500kb
    chunkSizeWarningLimit: 500,
  },
});

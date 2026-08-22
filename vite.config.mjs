import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { createPortalFeed } from "./src/lib/portalFeed.ts";

const portalFeed = () => ({
  name: "portal-feed",
  apply: "build",
  generateBundle() {
    this.emitFile({
      type: "asset",
      fileName: "portal-feed.json",
      source: `${JSON.stringify(createPortalFeed(), null, 2)}\n`
    });
  }
});

export default defineConfig({
  plugins: [react(), portalFeed()],
  esbuild: false,
  build: {
    target: "es2020",
    minify: "esbuild",
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          icons: ["lucide-react"]
        }
      }
    }
  }
});

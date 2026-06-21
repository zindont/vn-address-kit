import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  base: "/vn-address-kit/",
  resolve: {
    alias: {
      "vn-address-kit": fileURLToPath(new URL("../src/index.ts", import.meta.url))
    }
  },
  build: {
    target: "esnext",
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true
  }
});

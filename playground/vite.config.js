import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"

export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  publicDir: fileURLToPath(new URL("../resources", import.meta.url)),
  build: {
    outDir: "dist",
    emptyOutDir: true
  }
})
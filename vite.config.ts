import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ isPreview }) => ({
  appType: isPreview ? "mpa" : "spa",
  build: { manifest: true },
  plugins: [react(), tailwindcss()],
}));

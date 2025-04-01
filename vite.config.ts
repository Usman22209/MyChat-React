import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import svgr from "vite-plugin-svgr";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@providers": path.resolve(__dirname, "src/providers"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@configs": path.resolve(__dirname, "src/configs"),
      "@types": path.resolve(__dirname, "src/types"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@services": path.resolve(__dirname, "src/services"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@api": path.resolve(__dirname, "src/api"),
      "@helper": path.resolve(__dirname, "src/helper"),
    },
  },
});

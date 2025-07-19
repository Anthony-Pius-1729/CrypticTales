import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  // .env dosyasını yükle (mode'a göre, örn: development, production)
  const env = loadEnv(mode, process.cwd(), ""); // 3. parametre "" tüm değişkenleri alır

  return {
    plugins: [react(), tailwindcss()],
    define: {
      // Ortam değişkenlerini uygulama içinde erişilebilir hale getirir
      "process.env": Object.entries(env).reduce((prev, [key, val]) => {
        prev[key] = JSON.stringify(val);
        return prev;
      }, {}),
    },
  };
});

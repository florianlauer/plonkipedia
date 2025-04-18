import { defineConfig, loadEnv, type ConfigEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig((configEnv: ConfigEnv) => {
  // Charge les variables d'environnement selon le mode
  const env = loadEnv(configEnv.mode, process.cwd(), "");

  return {
    plugins: [react()],
    // Expose les variables d'environnement
    define: {
      "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(
        env.VITE_SUPABASE_URL
      ),
      "import.meta.env.VITE_SUPABASE_ANON_KEY": JSON.stringify(
        env.VITE_SUPABASE_ANON_KEY
      ),
    },
  };
});

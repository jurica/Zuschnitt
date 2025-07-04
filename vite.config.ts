import tailwindcss from "@tailwindcss/vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { router } from "sv-router/vite-plugin";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [tailwindcss(), svelte(), router()],
  resolve: {
    alias: {
      $src: path.resolve("./src"),
      $lib: path.resolve("./src/lib"),
    },
  },
});

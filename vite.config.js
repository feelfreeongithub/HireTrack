import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom", // a fake browser for tests
    globals: true, // lets Testing Library clean up after each test
    setupFiles: "./src/setupTests.js",
  },
});

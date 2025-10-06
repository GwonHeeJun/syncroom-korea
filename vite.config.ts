import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react(), tsconfigPaths()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React 코어 라이브러리
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],

          // 상태 관리
          'redux-vendor': ['redux', 'react-redux', 'redux-thunk', 'redux-persist'],

          // UI 라이브러리
          'ui-vendor': ['simplebar-react', 'react-transition-group', 'classnames'],

          // 데이터 fetching 및 유틸리티
          'query-vendor': ['@tanstack/react-query', '@zodios/core', '@zodios/react', 'axios', 'zod'],

          // i18n
          'i18n-vendor': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],

          // 기타 유틸리티
          'utils-vendor': ['zustand', 'react-copy-to-clipboard'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});

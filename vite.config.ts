import { defineConfig } from 'vitest/config';
import path from 'path';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: { https: true, host: 'localhost', port: 3010 },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/SetupTests.tsx',
    include: ['src/**/*.test.?(j|t)s?(x)'],
    reporters: ['verbose'],
    css: false,
    deps: {
      optimizer: {
        web: { enabled: true },
      },
    },
  },
});

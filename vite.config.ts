import { defineConfig } from 'vitest/config';
import path from 'path';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: { host: 'localhost', port: 3010 },
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

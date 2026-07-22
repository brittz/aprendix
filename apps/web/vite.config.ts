import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const mapPkg = fileURLToPath(
  new URL('../../packages/react-brazil-map', import.meta.url),
);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@federacao/react-brazil-map/styles.css': `${mapPkg}/src/brazil-map.css`,
      '@federacao/react-brazil-map': `${mapPkg}/src/index.ts`,
    },
    dedupe: ['react', 'react-dom'],
  },
  server: {
    fs: {
      allow: [root, mapPkg],
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});

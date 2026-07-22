import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const packagesRoot = fileURLToPath(new URL('../../packages', import.meta.url));
const mapPkg = `${packagesRoot}/react-brazil-map`;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@federacao/react-brazil-map/styles.css': `${mapPkg}/src/brazil-map.css`,
      '@federacao/react-brazil-map': `${mapPkg}/src/index.ts`,
      '@aprendix/map-engine': `${packagesRoot}/map-engine/src/index.ts`,
      '@aprendix/game-core': `${packagesRoot}/game-core/src/index.ts`,
      '@aprendix/content-geography': `${packagesRoot}/content-geography/src/index.ts`,
      '@aprendix/early-years': `${packagesRoot}/early-years/src/index.ts`,
    },
    dedupe: ['react', 'react-dom'],
  },
  server: {
    fs: {
      allow: [root, packagesRoot],
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});

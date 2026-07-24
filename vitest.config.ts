import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@aprendix/map-engine': path.resolve(
        __dirname,
        'packages/map-engine/src/index.ts',
      ),
      '@aprendix/game-core': path.resolve(
        __dirname,
        'packages/game-core/src/index.ts',
      ),
    },
  },
  test: {
    include: ['packages/*/src/**/*.test.ts'],
  },
});

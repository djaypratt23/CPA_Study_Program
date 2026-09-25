// Scratch test config for the evaluation. Run from repo root:
//   npx vitest run --config eval-scratch/vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    root: '.',
    include: ['eval-scratch/**/*.test.ts'],
  },
})

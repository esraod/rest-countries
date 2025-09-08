import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setupTests.ts'],
    css: false, // we skip CSS in tests
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react',
  },
})

import { fileURLToPath, URL } from 'node:url'
import { configureViteFragment } from '@compose/config-vite-fragment'
import { defineConfig } from 'vite'

export default defineConfig(
  configureViteFragment({
    lib: {
      entry: ['index.ts', 'bin/create.ts'],
      formats: ['cjs'],
    },
    dts: false,
    packageJson: {
      buildTool: 'pnpm',
    },
  }, {
    publicDir: 'src/templates',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    assetsInclude: ['**/*.md'],
    build: {
      assetsInlineLimit: 0,
    },
  }),
)

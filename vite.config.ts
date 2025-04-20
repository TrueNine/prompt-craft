import { fileURLToPath, URL } from 'node:url'
import { configureViteFragment } from '@compose/config-vite-fragment'
import { defineConfig } from 'vite'

export default defineConfig(
  configureViteFragment({
    lib: {
      entry: ['index.ts', 'bin/create.ts'],
      formats: ['cjs'],
    },
    dts: {
      tsconfigPath: './tsconfig.build.json',
    },
    packageJson: {
      buildTool: 'pnpm',
    },
  }, {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }),
)

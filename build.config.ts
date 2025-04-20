import path from 'node:path'
import alias from '@rollup/plugin-alias'
import terser from '@rollup/plugin-terser'
import url from '@rollup/plugin-url'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      input: 'src/bin/create',
      name: 'prompt-craft',
      ext: 'cjs',
      format: 'cjs',
    },
  ],
  declaration: false,
  clean: true,
  failOnWarn: false,
  rollup: {
    emitCJS: true,
  },
  hooks: {
    'rollup:options': async function (_, options) {
      options.plugins ??= []
      options.plugins.push(url({
        include: ['**/*.md'],
        limit: Infinity,
        emitFiles: false,
      }), alias({
        entries: [
          { find: '@', replacement: path.resolve(__dirname, 'src') },
        ],
      }), terser({
        compress: {
          drop_console: false,
          drop_debugger: false,
          passes: 3,
          unsafe: true,
          unsafe_arrows: true,
          unsafe_comps: true,
          unsafe_Function: true,
          unsafe_math: true,
          unsafe_symbols: true,
          unsafe_methods: true,
          unsafe_proto: true,
          unsafe_regexp: true,
          unsafe_undefined: true,
        },
        mangle: {
          toplevel: true,
          properties: {
            regex: /^_/,
          },
        },
        format: {
          comments: false,
        },
        ecma: 2020,
        module: true,
        toplevel: true,
        keep_classnames: false,
        keep_fnames: false,
      }))
    },
    'build:done': async () => {
      const fs = await import('node:fs')
      const path = await import('node:path')
      const distDir = path.resolve(__dirname, 'dist')
      if (fs.existsSync(distDir)) {
        for (const file of fs.readdirSync(distDir)) {
          if (file.endsWith('.mjs')) {
            fs.unlinkSync(path.join(distDir, file))
          }
        }
      }
    },
  },
})

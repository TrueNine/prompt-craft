import path from 'node:path'
import alias from '@rollup/plugin-alias'
import url from '@rollup/plugin-url'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      input: 'src/bin/create',
      name: 'prompt-craft',
      ext: 'cjs',
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
      }))
    },
  },
})

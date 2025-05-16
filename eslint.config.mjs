import eslint9 from '@compose/eslint9-config'

export default eslint9({
  type: 'app',
  ignores: [
    '**/*.md',
  ],
  jsx: false,
  pnpm: true,
  javascript: {
    overrides: {
      'no-console': 'off',
    },
  },
  typescript: {
    strictTypescriptEslint: true,
    tsconfigPath: './tsconfig.json',
  },
})

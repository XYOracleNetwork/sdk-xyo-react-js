// eslint.config.mjs

import { config as xylabsConfig } from '@xylabs/eslint-config-react-flat'

export default [
  {
    ignores: ['.yarn/**', 'jest.config.cjs', '**/dist/**', 'dist', 'build/**', 'node_modules/**', 'public', 'storybook-static', '.storybook'],
  },
  ...xylabsConfig,
  {
    rules: {
      '@typescript-eslint/no-misused-promises': ['off'],
      '@eslint-react/no-array-index-key': ['off'],
    },
  },
]

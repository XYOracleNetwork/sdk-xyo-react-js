// eslint.config.mjs

import plugin from '@stylistic/eslint-plugin'
import {
  typescriptConfig,
  unicornConfig,
  workspacesConfig,
  rulesConfig,
  ignores,
  importConfig,
} from '@xylabs/eslint-config-flat'
import { reactConfig } from '@xylabs/eslint-config-react-flat'

export default [
  { ignores: [...ignores, '.yarn/**', '**/dist', 'dist', 'build/**', 'public', 'storybook-static', 'eslint.config.mjs'] },
  reactConfig,
  unicornConfig,
  workspacesConfig,
  rulesConfig,
  importConfig,
  { rules: { '@eslint-react/no-array-index-key': ['off'] } },
  {
    ...typescriptConfig,
    rules: {
      ...typescriptConfig.rules,
      '@typescript-eslint/no-misused-promises': ['off'],
      '@typescript-eslint/consistent-type-imports': ['warn'],
    },
  }
]

import {
  typescriptConfig,
  unicornConfig,
  workspacesConfig,
  rulesConfig,
  sonarConfig,
  importConfig,
} from '@xylabs/eslint-config-flat'
import { reactConfig } from '@xylabs/eslint-config-react-flat'

export default [
  {ignores: ['.yarn', 'dist', 'docs', '**/packages/*/dist', '**/packages/*/docs', '**/packages/*/node_modules', 'storybook-static', 'eslint.config.mjs', '.storybook']},
  typescriptConfig,
  unicornConfig,
  workspacesConfig,
  rulesConfig,
  sonarConfig,
  importConfig,
  reactConfig,
  {
    rules: {
      '@eslint-react/no-array-index-key': ['off'],
      '@typescript-eslint/no-misused-promises': ['off'],
    },
  },
]

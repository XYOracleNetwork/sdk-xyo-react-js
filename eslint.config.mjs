// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

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
  {ignores: ['.yarn', 'dist', 'build', 'docs', '**/packages/*/dist', '**/packages/*/build', '**/packages/*/docs', '**/packages/*/node_modules', 'storybook-static', 'eslint.config.mjs', '.storybook']},
  typescriptConfig,
  unicornConfig,
  workspacesConfig,
  rulesConfig,
  sonarConfig,
  importConfig,
  reactConfig,
  {
    rules: {
      'react-x/no-create-ref': ['warn'],
      'no-warning-comments': ['warn', { terms: ['note'], location: 'anywhere' }],
      '@typescript-eslint/strict-boolean-expressions': ['off'],
      '@eslint-react/no-array-index-key': ['off'],
      '@typescript-eslint/no-misused-promises': ['off'],
    },
  },
  ...storybook.configs["flat/recommended"]
];

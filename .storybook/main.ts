import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'

import rootViteConfig from './vite.config.ts'

const config: StorybookConfig = {
  stories: ['../**/src/**/*.mdx', '../**/src/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-dark-mode',
  ],
  framework: '@storybook/react-vite',
  viteFinal(config) {
    return mergeConfig(config, rootViteConfig)
  },
}

export default config

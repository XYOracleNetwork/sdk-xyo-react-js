const path = require('path');
const toPath = (filePath) => path.join(process.cwd(), filePath);

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-dark-mode"
  ],
  typescript: {
    check: true,
  },
  // Actual recommended fix from MUI - https://mui.com/guides/migration-v4/#troubleshooting
  webpackFinal: async (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@emotion/core': toPath('node_modules/@emotion/react'),
        'emotion-theming': toPath('node_modules/@emotion/react'),
     },
     // can likely be removed in storybook > 6.4 see - https://github.com/storybookjs/storybook/issues/17458
     fallback: {
       ...config.resolve.fallback,
      'assert': toPath('node_modules/assert')
     }
    },
 })
}
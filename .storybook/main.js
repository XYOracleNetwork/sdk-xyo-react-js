const path = require('path');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: [
    "../packages/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-dark-mode"
  ],
  features: { modernInlineRendering: true },
  typescript: {
    check: true,
  },
}
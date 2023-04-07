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
  framework: {
    name: '@storybook/react-webpack5',
    options: { fastRefresh: true },
  },
  typescript: {
    check: true,
  },
  // Can be removed when upgrading to 7.0
  // see - https://github.com/storybookjs/storybook/issues/17458
  webpackFinal: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      assert: require.resolve('browser-assert')
    }
    return config
  }
}
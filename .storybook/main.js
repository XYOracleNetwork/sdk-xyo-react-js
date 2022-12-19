
module.exports = {
  stories: [
    "../packages/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-dark-mode"
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  typescript: {
    check: true,
  },
  webpackFinal: (config, mode) => {
    config.module.rules[2].use[0].options.presets.push([
      './node_modules/@babel/preset-typescript/lib/index.js',
      { isTSX: true, allExtensions: true}
    ])
    console.log('=================')
    console.log(config.module.rules[2].use[0].options.presets)
    console.log('=================')
    return config
  }
}
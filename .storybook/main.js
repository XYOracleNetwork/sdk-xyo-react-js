module.exports = {
  stories: ["../packages/**/*.stories.@(ts|tsx)"],
  // addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "storybook-dark-mode", "@storybook/addon-mdx-gfm"],
  features: {
    modernInlineRendering: true,
    storyStoreV7: false,
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      fastRefresh: true
    }
  },
  typescript: {
    check: true
  },
  // webpackFinal: config => {
  //   config.plugins.forEach(plugin => {
  //     if('ForkTsCheckerWebpackPlugin' === plugin.constructor.name){
  //       plugin.memoryLimit = 4096;
  //     }
  //   });
  //   return config;
  // },
  docs: {
    autodocs: true
  }
};
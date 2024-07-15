// .storybook/main.ts

// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-webpack5)
import type { StorybookConfig } from '@storybook/react-webpack5';
import { NormalModuleReplacementPlugin } from 'webpack';

const config: StorybookConfig = {
  stories: [
    '../packages/modules/packages/**/src/**/*.stories.@(ts|tsx)',
    '../packages/plugins/packages/**/src/**/*.stories.@(ts|tsx)',
    '../packages/sdk/packages/**/src/**/*.stories.@(ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-dark-mode',
    '@storybook/addon-interactions',
  ],
  typescript: {
    check: true,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  features: { legacyMdx1: true },
  framework: {
    name: '@storybook/react-webpack5',
    options: {
    
    },
  },
  core: {
    disableTelemetry: true,
  },
  docs: {
    autodocs: 'tag',
  },
  /*refs: {
    'design-system': {
      title: 'Storybook Design System',
      url: 'https://5ccbc373887ca40020446347-yldsqjoxzb.chromatic.com',
    },
  },*/
  webpackFinal: async (config, { configType }) => {
    config.plugins = config.plugins ?? []
    config.plugins.push(
      // Remove node: from import specifiers, because Next.js does not yet support node: scheme
      // https://github.com/vercel/next.js/issues/28774
      new NormalModuleReplacementPlugin(
        /^node:/,
        (resource) => {
          resource.request = resource.request.replace(/^node:/, '');
        },
      )
    );

    /**
     * Configure webpack to allow using .js extension for typescript file imports.
     * 
     * Source - https://github.com/storybookjs/storybook/issues/11587#issuecomment-1374816054
     * Webpack Reference - https://webpack.js.org/configuration/resolve/#resolveextensionalias
     */
    const resolve = config?.resolve
    if (resolve) {
      resolve.extensionAlias = {
        ".js": [".tsx", ".ts", ".js"],
      };
    }

    return config;
  },
};

export default config;
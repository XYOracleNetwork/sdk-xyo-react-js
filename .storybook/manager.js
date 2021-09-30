import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    colorPrimary: '#384afd',
    colorSecondary: '#f8cb1c',
    brandTitle: 'XY Labs',
    brandUrl: 'https://xylabs.com',
    brandImage: 'https://cdn.xy.company/img/brand/XYPersistentCompany_Logo_Icon_Colored.svg',
  }),
});
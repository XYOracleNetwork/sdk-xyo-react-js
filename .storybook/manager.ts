import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    colorPrimary: '#485c76',
    colorSecondary: '#8f91c7',
    brandTitle: 'XY Labs',
    brandUrl: 'https://xylabs.com',
    brandImage: 'https://cdn.xy.company/img/brand/XYPersistentCompany_Logo_Icon_Colored.svg',
  }),
});
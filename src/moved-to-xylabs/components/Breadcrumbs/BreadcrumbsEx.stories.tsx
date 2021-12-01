/* eslint-disable @delagen/deprecation/deprecation */
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import BreadcrumbsEx from './BreadcrumbsEx'

const StorybookEntry = {
  argTypes: {},
  component: BreadcrumbsEx,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'BreadcrumbsEx',
} as ComponentMeta<typeof BreadcrumbsEx>

const Template: ComponentStory<typeof BreadcrumbsEx> = (args) => (
  <BrowserRouter>
    <BreadcrumbsEx {...args}></BreadcrumbsEx>
  </BrowserRouter>
)

const SingleLevel = Template.bind({})
SingleLevel.args = {
  path: '/test',
  title: 'Default',
  titles: ['Test'],
}

const DoubleLevel = Template.bind({})
DoubleLevel.args = {
  path: '/test/level2',
  title: 'DoubleLevel',
  titles: ['Test', 'Level2'],
}

export { DoubleLevel, SingleLevel }

export default StorybookEntry

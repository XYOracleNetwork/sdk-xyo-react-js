import { Meta, StoryFn } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom-6'

import * as tokenData from '../TokenData'
import { ThemeTokenAvatar } from './ThemeTokenAvatar'
const StorybookEntry = {
  argTypes: {},
  component: ThemeTokenAvatar,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'shared/ThemeTokenAvatar',
} as Meta<typeof ThemeTokenAvatar>

const Template: StoryFn<typeof ThemeTokenAvatar> = (args) => (
  <BrowserRouter>
    <ThemeTokenAvatar {...args}></ThemeTokenAvatar>
  </BrowserRouter>
)

const WithData = Template.bind({})
WithData.args = { src: tokenData.TokenData[0].icon }

export { WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

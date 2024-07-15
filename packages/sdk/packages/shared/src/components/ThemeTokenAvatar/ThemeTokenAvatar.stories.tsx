import { Meta, StoryFn } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import * as tokenData from '../TokenData/index.js'
import { ThemeTokenAvatar } from './ThemeTokenAvatar.js'
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

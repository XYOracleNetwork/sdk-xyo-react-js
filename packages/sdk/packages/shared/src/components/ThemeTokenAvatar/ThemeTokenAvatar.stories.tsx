import { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import * as tokenData from '../TokenData/index.ts'
import { ThemeTokenAvatar } from './ThemeTokenAvatar.tsx'
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

const Template: StoryFn<typeof ThemeTokenAvatar> = args => (
  <BrowserRouter>
    <ThemeTokenAvatar {...args}></ThemeTokenAvatar>
  </BrowserRouter>
)

const WithData = Template.bind({})
WithData.args = { src: tokenData.TokenData[0].icon }

export { WithData }

export default StorybookEntry

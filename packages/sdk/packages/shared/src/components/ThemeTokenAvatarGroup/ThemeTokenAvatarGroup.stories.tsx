import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import * as tokenData from '../TokenData/index.ts'
import { ThemeTokenAvatarGroup } from './ThemeTokenAvatarGroup.tsx'
const StorybookEntry = {
  argTypes: {},
  component: ThemeTokenAvatarGroup,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'shared/ThemeTokenAvatarGroup',
} as Meta<typeof ThemeTokenAvatarGroup>

const Template: StoryFn<typeof ThemeTokenAvatarGroup> = args => (
  <BrowserRouter>
    <ThemeTokenAvatarGroup {...args}></ThemeTokenAvatarGroup>
  </BrowserRouter>
)

const WithData = Template.bind({})
WithData.args = {
  images: [
    tokenData.TokenData[0].icon,
    tokenData.TokenData[1].icon,
    tokenData.TokenData[2].icon,
    tokenData.TokenData[3].icon,
    tokenData.TokenData[4].icon,
    tokenData.TokenData[6].icon,
    tokenData.TokenData[7].icon,
    tokenData.TokenData[8].icon,
    tokenData.TokenData[9].icon,
    tokenData.TokenData[10].icon,
  ],
}

export { WithData }

export default StorybookEntry

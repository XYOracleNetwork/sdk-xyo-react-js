import { Meta, StoryFn } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import * as tokenData from '../TokenData'
import { XyoThemeTokenAvatarGroup } from './XyoThemeTokenAvatarGroup'
const StorybookEntry = {
  argTypes: {},
  component: XyoThemeTokenAvatarGroup,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'shared/XyoThemeTokenAvatarGroup',
} as Meta<typeof XyoThemeTokenAvatarGroup>

const Template: StoryFn<typeof XyoThemeTokenAvatarGroup> = (args) => (
  <BrowserRouter>
    <XyoThemeTokenAvatarGroup {...args}></XyoThemeTokenAvatarGroup>
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

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

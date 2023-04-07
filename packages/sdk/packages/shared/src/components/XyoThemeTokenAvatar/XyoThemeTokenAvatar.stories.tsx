import { Meta, StoryFn } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import * as tokenData from '../TokenData'
import { XyoThemeTokenAvatar } from './XyoThemeTokenAvatar'
const StorybookEntry = {
  argTypes: {},
  component: XyoThemeTokenAvatar,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'shared/XyoThemeTokenAvatar',
} as Meta<typeof XyoThemeTokenAvatar>

const Template: StoryFn<typeof XyoThemeTokenAvatar> = (args) => (
  <BrowserRouter>
    <XyoThemeTokenAvatar {...args}></XyoThemeTokenAvatar>
  </BrowserRouter>
)

const WithData = Template.bind({})
WithData.args = { src: tokenData.TokenData[0].icon }

export { WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

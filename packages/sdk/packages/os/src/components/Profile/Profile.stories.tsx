import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { XyOsProfile } from './Profile.tsx'
const StorybookEntry = {
  argTypes: {},
  component: XyOsProfile,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'shared/XyOsProfile',
} as Meta<typeof XyOsProfile>

const Template: StoryFn<typeof XyOsProfile> = args => (
  <BrowserRouter>
    <XyOsProfile {...args}></XyOsProfile>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {
  xns: '@arietrouw',
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

export { Default }

export default StorybookEntry

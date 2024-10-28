import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { XyoContextToolbar } from './ContextToolbar.tsx'

const StorybookEntry = {
  argTypes: {},
  component: XyoContextToolbar,
  parameters: { docs: { page: null } },
  title: 'appbar/Toolbar/XyoContextToolbar',
} as Meta<typeof XyoContextToolbar>

const Template: StoryFn<typeof XyoContextToolbar> = args => (
  <BrowserRouter>
    <XyoContextToolbar {...args}></XyoContextToolbar>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {}

const WithVersion = Template.bind({})
WithVersion.args = { version: true }

export { Default, WithVersion }

export default StorybookEntry

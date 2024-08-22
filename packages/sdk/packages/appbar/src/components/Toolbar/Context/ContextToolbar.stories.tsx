import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { ContextToolbar } from './ContextToolbar.tsx'

const StorybookEntry = {
  argTypes: {},
  component: ContextToolbar,
  parameters: { docs: { page: null } },
  title: 'appbar/Toolbar/Context',
} as Meta<typeof ContextToolbar>

const Template: StoryFn<typeof ContextToolbar> = args => (
  <BrowserRouter>
    <ContextToolbar {...args}></ContextToolbar>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {}

const WithVersion = Template.bind({})
WithVersion.args = { version: true }

export { Default, WithVersion }

export default StorybookEntry

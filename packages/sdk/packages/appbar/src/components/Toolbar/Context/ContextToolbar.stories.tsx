import { Meta, StoryFn } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom-6'

import { ContextToolbar } from './ContextToolbar'

const StorybookEntry = {
  argTypes: {},
  component: ContextToolbar,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'appbar/Toolbar/Context',
} as Meta<typeof ContextToolbar>

const Template: StoryFn<typeof ContextToolbar> = (args) => (
  <BrowserRouter>
    <ContextToolbar {...args}></ContextToolbar>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {}

const WithVersion = Template.bind({})
WithVersion.args = { version: true }

export { Default, WithVersion }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

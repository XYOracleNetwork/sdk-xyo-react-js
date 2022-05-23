import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { ContextToolbar } from './ContextToolbar'

const StorybookEntry = {
  argTypes: {},
  component: ContextToolbar,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Toolbar/Context',
} as ComponentMeta<typeof ContextToolbar>

const Template: ComponentStory<typeof ContextToolbar> = (args) => (
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

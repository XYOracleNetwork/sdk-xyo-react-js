import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { SystemToolbar } from './SystemToolbar'

const StorybookEntry = {
  argTypes: {},
  component: SystemToolbar,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Toolbar/System',
} as ComponentMeta<typeof SystemToolbar>

const Template: ComponentStory<typeof SystemToolbar> = (args) => (
  <BrowserRouter>
    <SystemToolbar {...args}></SystemToolbar>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {}

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

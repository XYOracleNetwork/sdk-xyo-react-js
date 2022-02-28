import { TextField } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { ApplicationAppBar } from './Application'

const StorybookEntry = {
  argTypes: {},
  component: ApplicationAppBar,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'AppBar/Application',
} as ComponentMeta<typeof ApplicationAppBar>

const Template: ComponentStory<typeof ApplicationAppBar> = (args) => (
  <BrowserRouter>
    <ApplicationAppBar {...args}></ApplicationAppBar>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {}

const WithChildren = Template.bind({})
WithChildren.args = { children: <TextField fullWidth size="small" /> }

export { Default, WithChildren }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

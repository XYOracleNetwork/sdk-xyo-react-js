import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from '../../../contexts'
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

const TemplateWithAuthContext: ComponentStory<typeof SystemToolbar> = (args) => (
  <AuthProvider authState={{ loggedInAccount: '0x923487924385724935' }}>
    <BrowserRouter>
      <SystemToolbar {...args}></SystemToolbar>
    </BrowserRouter>
  </AuthProvider>
)

const Default = Template.bind({})
Default.args = {}

const WithLoggedInAccount = TemplateWithAuthContext.bind({})
WithLoggedInAccount.args = {}

export { Default, WithLoggedInAccount }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

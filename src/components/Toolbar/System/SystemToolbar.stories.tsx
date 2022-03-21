import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { WrappedAuthComponent } from '../../../.storybook'
import { AuthProvider, AuthState } from '../../../contexts'
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
    <SystemToolbar {...args} />
  </BrowserRouter>
)

const TemplateWithAuthContext: ComponentStory<WrappedAuthComponent> = ({ authState }) => (
  <AuthProvider authState={authState as AuthState}>
    <BrowserRouter>
      <SystemToolbar />
    </BrowserRouter>
  </AuthProvider>
)

const Default = Template.bind({})
Default.args = {}

const WithLoggedInAccount = TemplateWithAuthContext.bind({})
WithLoggedInAccount.args = {
  authState: {
    loggedInAccount: 'none@none.com',
  },
}

const NeedsReAuth = TemplateWithAuthContext.bind({})
NeedsReAuth.args = {
  authState: {
    reAuthenticate: true,
  },
}

export { Default, NeedsReAuth, WithLoggedInAccount }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { ArchiveProvider } from '@xyo-network/react-archive'
import { ArchivesProvider } from '@xyo-network/react-archive'
import { ArchivistApiProvider } from '@xyo-network/react-archivist-api'
import { AuthProvider, AuthState } from '@xyo-network/react-auth'
import { NetworkMemoryProvider } from '@xyo-network/react-network'
import { WrappedAuthComponent } from './authHelpers'
import { SystemToolbar } from '../../packages/appbar/src/components/Toolbar/System/SystemToolbar'

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
  <ArchivistApiProvider apiDomain="https://beta.api.archivist.xyo.network">
    <ArchivesProvider>
      <BrowserRouter>
        <NetworkMemoryProvider>
          <ArchiveProvider>
            <SystemToolbar {...args} />
          </ArchiveProvider>
        </NetworkMemoryProvider>
      </BrowserRouter>
    </ArchivesProvider>
  </ArchivistApiProvider>
)

const TemplateWithAuthContext: ComponentStory<WrappedAuthComponent> = ({ authState }) => (
  <AuthProvider authState={authState as AuthState}>
    <ArchivistApiProvider apiDomain="https://beta.api.archivist.xyo.network">
      <ArchivesProvider>
        <BrowserRouter>
          <NetworkMemoryProvider>
            <ArchiveProvider>
              <SystemToolbar />
            </ArchiveProvider>
          </NetworkMemoryProvider>
        </BrowserRouter>
      </ArchivesProvider>
    </ArchivistApiProvider>
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

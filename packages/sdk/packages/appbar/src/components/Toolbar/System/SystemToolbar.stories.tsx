/* eslint-disable import/no-internal-modules */
import { List } from '@mui/material'
import { ComponentStory, Meta } from '@storybook/react'
import { ArchiveProvider, ArchivesProvider } from '@xyo-network/react-archive'
import { ArchivistApiProvider } from '@xyo-network/react-archivist-api'
import { AuthProvider, AuthState } from '@xyo-network/react-auth'
import { NetworkMemoryProvider } from '@xyo-network/react-network'
import { TypographyEx } from '@xyo-network/react-shared'
import { WrappedAuthComponent } from '@xyo-network/react-storybook'
import { BrowserRouter } from 'react-router-dom'

import { SiteMenuListItem } from '../../SiteMenu'
import { SystemToolbar } from './SystemToolbar'

const DefaultMenu = (
  <List>
    <SiteMenuListItem primary="Hello" />
  </List>
)

const StorybookEntry: Meta = {
  component: SystemToolbar,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'appbar/Toolbar/System',
}

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
              <SystemToolbar menuItems={DefaultMenu} />
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

const PrecedingChildren = Template.bind({})
PrecedingChildren.args = {
  precedingChildren: (
    <TypographyEx variant="body1" mx={0.5}>
      Preceding Child Component
    </TypographyEx>
  ),
}

const WithOnMenuToggle = Template.bind({})
WithOnMenuToggle.args = {
  menuItems: DefaultMenu,
  onMenuToggle: (state) => console.log(state),
}

export { Default, NeedsReAuth, PrecedingChildren, WithLoggedInAccount, WithOnMenuToggle }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

/* eslint-disable import/no-internal-modules */
import { List } from '@mui/material'
import { ComponentStory, Meta } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { WrappedAuthComponent } from '../../../../../../.storybook'
import { ArchiveProvider, ArchivesProvider } from '../../../../../archive/src'
import { ArchivistApiProvider } from '../../../../../archivist-api/src'
import { AuthProvider, AuthState } from '../../../../../auth/src'
import { NetworkMemoryProvider } from '../../../../../network/src'
import { TypographyEx } from '../../../../../shared/src'
import { SiteMenuListItem } from '../../SiteMenu'
import { SystemToolbar } from './SystemToolbar'

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
              <SystemToolbar
                menuItems={
                  <List>
                    <SiteMenuListItem primary="Hello" />
                  </List>
                }
              />
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

export { Default, NeedsReAuth, PrecedingChildren, WithLoggedInAccount }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

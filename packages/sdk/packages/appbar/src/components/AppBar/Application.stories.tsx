/* eslint-disable import/no-internal-modules */
import { List, Paper } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FlexGrowCol } from '@xylabs/react-flexbox'
import { HDWallet } from '@xyo-network/account'
import { ApiProvider, ArchiveProvider, ArchivesProvider } from '@xyo-network/react-api'
import { AuthProvider } from '@xyo-network/react-auth'
import { AuthSetsProvider } from '@xyo-network/react-auth-sets'
import { NetworkMemoryProvider } from '@xyo-network/react-network'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'
import { WalletAccountSelect, WalletProvider } from '@xyo-network/react-wallet'
import { BrowserRouter } from 'react-router-dom'

import { SearchBar } from '../SearchBar'
import { MenuListItemContainer } from '../SiteMenu'
import { SystemToolbar } from '../Toolbar'
import { ApplicationAppBar } from './Application'

const StorybookEntry = {
  argTypes: {},
  component: ApplicationAppBar,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'appbar/AppBar/Application',
} as ComponentMeta<typeof ApplicationAppBar>

const Template: ComponentStory<typeof ApplicationAppBar> = (args) => (
  <WalletProvider defaultWallet={HDWallet.fromMnemonic(DefaultSeedPhrase)}>
    <AuthProvider authState={{}}>
      <AuthSetsProvider>
        <BrowserRouter>
          <ApiProvider apiDomain="https://beta.api.archivist.xyo.network">
            <NetworkMemoryProvider>
              <ArchivesProvider>
                <ArchiveProvider>
                  <ApplicationAppBar
                    systemToolbar={
                      <SystemToolbar
                        menuItems={
                          <List>
                            <MenuListItemContainer primary="Hello" />
                          </List>
                        }
                      />
                    }
                    {...args}
                  ></ApplicationAppBar>
                </ArchiveProvider>
              </ArchivesProvider>
            </NetworkMemoryProvider>
          </ApiProvider>
        </BrowserRouter>
      </AuthSetsProvider>
    </AuthProvider>
  </WalletProvider>
)

const Default = Template.bind({})
Default.args = {}

const WithSearchBar = Template.bind({})
WithSearchBar.args = {
  children: <SearchBar flexGrow={1} onSearch={(term) => alert(term)} />,
  color: 'primary',
  systemToolbar: (
    <SystemToolbar
      darkModeButton
      authButton
      menuItems={
        <List>
          <MenuListItemContainer primary="Hello" />
        </List>
      }
    />
  ),
}

const WithWalletSelectBar = Template.bind({})
WithWalletSelectBar.args = {
  children: (
    <FlexGrowCol alignItems="stretch">
      <Paper variant="elevation">
        <WalletAccountSelect icons size="small" fullWidth />
      </Paper>
    </FlexGrowCol>
  ),
  color: 'primary',
  systemToolbar: <SystemToolbar darkModeButton authButton />,
}

export { Default, WithSearchBar, WithWalletSelectBar }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

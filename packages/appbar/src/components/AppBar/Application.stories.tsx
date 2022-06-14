/* eslint-disable import/no-internal-modules */
import { List, Paper } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FlexGrowCol } from '@xylabs/react-flexbox'
import { XyoWalletBase } from '@xyo-network/core'
import { ArchiveProvider, ArchivesProvider } from '@xyo-network/react-archive'
import { ArchivistApiProvider } from '@xyo-network/react-archivist-api'
import { NetworkMemoryProvider } from '@xyo-network/react-network'
import { WalletAccountSelect, WalletProvider } from '@xyo-network/react-wallet'
import { BrowserRouter } from 'react-router-dom'

import { SearchBar } from '../SearchBar'
import { SiteMenuListItem } from '../SiteMenu'
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
  <WalletProvider defaultWallet={new XyoWalletBase('test me')}>
    <BrowserRouter>
      <ArchivistApiProvider apiDomain="https://beta.api.archivist.xyo.network">
        <NetworkMemoryProvider>
          <ArchivesProvider>
            <ArchiveProvider>
              <ApplicationAppBar
                menuItems={
                  <List>
                    <SiteMenuListItem primary="Hello" />
                  </List>
                }
                {...args}
              ></ApplicationAppBar>
            </ArchiveProvider>
          </ArchivesProvider>
        </NetworkMemoryProvider>
      </ArchivistApiProvider>
    </BrowserRouter>
  </WalletProvider>
)

const Default = Template.bind({})
Default.args = {}

const WithSearchBar = Template.bind({})
WithSearchBar.args = { children: <SearchBar flexGrow={1} onSearch={(term) => alert(term)} />, color: 'primary', systemToolbar: <SystemToolbar darkModeButton authButton /> }

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

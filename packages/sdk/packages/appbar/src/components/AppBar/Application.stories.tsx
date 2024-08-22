import { List, Paper } from '@mui/material'
import type { Meta, StoryFn } from '@storybook/react'
import { FlexGrowCol } from '@xylabs/react-flexbox'
import { NetworkMemoryProvider } from '@xyo-network/react-network'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'
import {
  useWallet, WalletAccountSelect, WalletProvider,
} from '@xyo-network/react-wallet'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { SearchBar } from '../SearchBar/index.ts'
import { MenuListItemContainer } from '../SiteMenu/index.ts'
import { SystemToolbar } from '../Toolbar/index.ts'
import { ApplicationAppBar } from './Application.tsx'

const StorybookEntry = {
  argTypes: {},
  component: ApplicationAppBar,
  parameters: { docs: { page: null } },
  title: 'appbar/AppBar/Application',
} as Meta<typeof ApplicationAppBar>

const Template: StoryFn<typeof ApplicationAppBar> = (args) => {
  const [wallet] = useWallet({ mnemonic: DefaultSeedPhrase })
  return (
    <WalletProvider rootWallet={wallet}>
      <BrowserRouter>
        <NetworkMemoryProvider>
          <ApplicationAppBar
            systemToolbar={(
              <SystemToolbar
                menuItems={(
                  <List>
                    <MenuListItemContainer primary="Hello" />
                  </List>
                )}
              />
            )}
            {...args}
          >
          </ApplicationAppBar>
        </NetworkMemoryProvider>
      </BrowserRouter>
    </WalletProvider>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithSearchBar = Template.bind({})
WithSearchBar.args = {
  children: <SearchBar flexGrow={1} onSearch={term => alert(term)} />,
  color: 'primary',
  systemToolbar: (
    <SystemToolbar
      darkModeButton
      menuItems={(
        <List>
          <MenuListItemContainer primary="Hello" />
        </List>
      )}
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
  systemToolbar: <SystemToolbar darkModeButton />,
}

export {
  Default, WithSearchBar, WithWalletSelectBar,
}

export default StorybookEntry

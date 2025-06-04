import { List, Paper } from '@mui/material'
import type { Meta, StoryFn } from '@storybook/react-vite'
import { MenuListItemContainer } from '@xylabs/react-appbar'
import { FlexGrowCol } from '@xylabs/react-flexbox'
import { NetworkMemoryProvider } from '@xyo-network/react-network'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'
import {
  useWallet, WalletAccountSelect, WalletProvider,
} from '@xyo-network/react-wallet'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { SearchBar } from '../SearchBar/index.ts'
import { XyoSystemToolbar } from '../Toolbar/index.ts'
import { XyoApplicationAppBar } from './Application.tsx'

const StorybookEntry = {
  argTypes: {},
  component: XyoApplicationAppBar,
  parameters: { docs: { page: null } },
  title: 'appbar/AppBar/Application',
} as Meta<typeof XyoApplicationAppBar>

const Template: StoryFn<typeof XyoApplicationAppBar> = (args) => {
  const [wallet] = useWallet({ mnemonic: DefaultSeedPhrase })
  return (
    <WalletProvider rootWallet={wallet}>
      <BrowserRouter>
        <NetworkMemoryProvider>
          <XyoApplicationAppBar
            systemToolbar={(
              <XyoSystemToolbar
                menuItems={(
                  <List>
                    <MenuListItemContainer primary="Hello" />
                  </List>
                )}
              />
            )}
            {...args}
          >
          </XyoApplicationAppBar>
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
    <XyoSystemToolbar
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
  systemToolbar: <XyoSystemToolbar darkModeButton />,
}

export {
  Default, WithSearchBar, WithWalletSelectBar,
}

export default StorybookEntry

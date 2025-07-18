import type { Meta, StoryFn } from '@storybook/react-vite'
import React from 'react'

import { useWallets } from '../../hooks/index.ts'
import { WalletAccountSelectBar } from './SelectBar.tsx'
import { WalletProviderDecorator } from './stories/index.ts'

const PATHS = { paths: ['0', '3', '5'] }

const StorybookEntry = {
  argTypes: {},
  component: WalletAccountSelectBar,
  decorators: [WalletProviderDecorator],
  parameters: { docs: { page: null } },
  title: 'wallet/WalletAccountSelectBar',
} as Meta<typeof WalletAccountSelectBar>

const Template: StoryFn<typeof WalletAccountSelectBar> = (args) => {
  return <WalletAccountSelectBar {...args}></WalletAccountSelectBar>
}

const WithFavoritesTemplate: StoryFn<typeof WalletAccountSelectBar> = (args) => {
  const [wallets] = useWallets(PATHS)
  return (
    <WalletAccountSelectBar
      addressNames={
        wallets
          ? {
              [wallets[0]?.address]: 'first address',
              [wallets[1]?.address]: undefined,
              [wallets[2]?.address]: 'sixth address',
            }
          : {}
      }
      icons={true}
      maxAccounts={10}
      showFavorite
      {...args}
    />
  )
}

const Default = Template.bind({})
Default.args = {}

const WithWallet = Template.bind({})
WithWallet.args = {}

const WithWalletIcon = Template.bind({})
WithWalletIcon.args = { icons: true }

const WithAdditionalAccounts = Template.bind({})
WithAdditionalAccounts.args = { icons: true, maxAccounts: 10 }

const WithAccountFavorites = WithFavoritesTemplate.bind({})

export {
  Default, WithAccountFavorites, WithAdditionalAccounts, WithWallet, WithWalletIcon,
}

export default StorybookEntry

import { Meta, StoryFn } from '@storybook/react'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'
import { WalletInstance } from '@xyo-network/wallet-model'

import { WalletProvider } from '../../contexts'
import { useWallet, useWallets } from '../../hooks'
import { WalletAccountSelectBar } from './SelectBar'

const StorybookEntry = {
  argTypes: {},
  component: WalletAccountSelectBar,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'wallet/WalletAccountSelectBar',
} as Meta<typeof WalletAccountSelectBar>

const Template: StoryFn<typeof WalletAccountSelectBar> = (args) => {
  return <WalletAccountSelectBar {...args}></WalletAccountSelectBar>
}

const WithWalletTemplate: StoryFn<typeof WalletAccountSelectBar> = (args) => {
  const [rootWallet] = useWallet({ mnemonic: DefaultSeedPhrase })
  return (
    <WalletProvider rootWallet={rootWallet}>
      <WalletAccountSelectBar {...args} />
    </WalletProvider>
  )
}

const WithFavoritesTemplate: StoryFn<typeof WalletAccountSelectBar> = (args) => {
  const [rootWallet] = useWallet({ mnemonic: DefaultSeedPhrase })
  const [wallets] = useWallets({ paths: ['0', '3', '5'], wallet: rootWallet })
  const castWallets = wallets as WalletInstance[] | undefined
  return (
    <WalletProvider rootWallet={rootWallet}>
      <WalletAccountSelectBar
        addressNames={
          castWallets
            ? {
                [castWallets[0]?.address]: 'first address',
                [castWallets[1]?.address]: undefined,
                [castWallets[2]?.address]: 'sixth address',
              }
            : {}
        }
        icons={true}
        maxAccounts={10}
        showFavorite
        {...args}
      />
    </WalletProvider>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithWallet = WithWalletTemplate.bind({})
WithWallet.args = {}

const WithWalletIcon = WithWalletTemplate.bind({})
WithWalletIcon.args = { icons: true }

const WithAdditionalAccounts = WithWalletTemplate.bind({})
WithAdditionalAccounts.args = { icons: true, maxAccounts: 10 }

const WithAccountFavorites = WithFavoritesTemplate.bind({})

export { Default, WithAccountFavorites, WithAdditionalAccounts, WithWallet, WithWalletIcon }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

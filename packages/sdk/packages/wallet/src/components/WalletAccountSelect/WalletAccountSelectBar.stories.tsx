import { Meta, StoryFn } from '@storybook/react'
import { WalletInstance } from '@xyo-network/wallet-model'

import { useWallets } from '../../hooks/index.js'
import { WalletAccountSelectBar } from './SelectBar'
import { WalletProviderDecorator } from './stories'

const PATHS = { paths: ['0', '3', '5'] }

const StorybookEntry = {
  argTypes: {},
  component: WalletAccountSelectBar,
  decorators: [WalletProviderDecorator],
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

const WithFavoritesTemplate: StoryFn<typeof WalletAccountSelectBar> = (args) => {
  const [wallets] = useWallets(PATHS)
  const castWallets = wallets as WalletInstance[] | undefined
  return (
    <WalletAccountSelectBar
      addressNames={
        castWallets ?
          {
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

export { Default, WithAccountFavorites, WithAdditionalAccounts, WithWallet, WithWalletIcon }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

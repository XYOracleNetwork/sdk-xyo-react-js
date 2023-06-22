import { Meta, StoryFn } from '@storybook/react'
import { HDWallet } from '@xyo-network/account'
import { usePromise } from '@xyo-network/react-shared'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'

import { WalletProvider, WalletRootPath } from '../../contexts'
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
  const [defaultWallet] = usePromise(() => HDWallet.fromMnemonic(DefaultSeedPhrase))
  return (
    <WalletProvider defaultWallet={defaultWallet}>
      <WalletAccountSelectBar {...args} />
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

const WithAccountFavorites = WithWalletTemplate.bind({})
const defaultWalletAtIndex = defaultWallet.derivePath(WalletRootPath)
WithAccountFavorites.args = {
  addressNames: {
    [defaultWalletAtIndex.derivePath('0').address]: 'first address',
    [defaultWalletAtIndex.derivePath('3').address]: undefined,
    [defaultWalletAtIndex.derivePath('5').address]: 'sixth address',
  },
  icons: true,
  maxAccounts: 10,
  showFavorite: true,
}

export { Default, WithAccountFavorites, WithAdditionalAccounts, WithWallet, WithWalletIcon }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

import { ComponentMeta, ComponentStory } from '@storybook/react'
import { HDWallet } from '@xyo-network/account'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'

import { WalletProvider } from '../../contexts'
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
} as ComponentMeta<typeof WalletAccountSelectBar>

const Template: ComponentStory<typeof WalletAccountSelectBar> = (args) => {
  return <WalletAccountSelectBar {...args}></WalletAccountSelectBar>
}

const WithWalletTemplate: ComponentStory<typeof WalletAccountSelectBar> = (args) => {
  return (
    <WalletProvider defaultWallet={HDWallet.fromMnemonic(DefaultSeedPhrase)}>
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

export { Default, WithAdditionalAccounts, WithWallet, WithWalletIcon }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

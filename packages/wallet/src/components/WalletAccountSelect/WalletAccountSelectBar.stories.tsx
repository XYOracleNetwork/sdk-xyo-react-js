/* eslint-disable import/no-internal-modules */
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { XyoWalletBase } from '@xyo-network/core'

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
    <WalletProvider defaultWallet={new XyoWalletBase('test me')}>
      <WalletAccountSelectBar {...args}></WalletAccountSelectBar>
    </WalletProvider>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithWallet = WithWalletTemplate.bind({})
WithWallet.args = {}

const WithWalletIcon = WithWalletTemplate.bind({})
WithWalletIcon.args = { icons: true }

export { Default, WithWallet, WithWalletIcon }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

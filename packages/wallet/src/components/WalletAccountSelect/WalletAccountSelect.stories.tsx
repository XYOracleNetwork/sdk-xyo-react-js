/* eslint-disable import/no-internal-modules */
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { XyoWalletBase } from '@xyo-network/wallet'

import { WalletProvider } from '../../contexts'
import { WalletAccountSelect } from './Select'

const StorybookEntry = {
  argTypes: {},
  component: WalletAccountSelect,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'wallet/WalletAccountSelect',
} as ComponentMeta<typeof WalletAccountSelect>

const Template: ComponentStory<typeof WalletAccountSelect> = (args) => {
  return <WalletAccountSelect {...args}></WalletAccountSelect>
}

const WithWalletTemplate: ComponentStory<typeof WalletAccountSelect> = (args) => {
  return (
    <WalletProvider defaultWallet={new XyoWalletBase('test me')}>
      <WalletAccountSelect {...args}></WalletAccountSelect>
    </WalletProvider>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithWallet = WithWalletTemplate.bind({})
WithWallet.args = {}

export { Default, WithWallet }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

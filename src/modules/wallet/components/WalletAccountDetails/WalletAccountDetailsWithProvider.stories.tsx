import { ComponentMeta, ComponentStory } from '@storybook/react'
import { XyoWalletBase } from '@xyo-network/sdk-xyo-client-js'

import { AccountProvider } from '../../contexts'
import { WalletAccountDetails } from './WalletAccountDetails'

const StorybookEntry = {
  argTypes: {},
  component: WalletAccountDetails,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'wallet/WalletAccountDetailsWithProvider',
} as ComponentMeta<typeof WalletAccountDetails>

const Template: ComponentStory<typeof WalletAccountDetails> = (args) => {
  return (
    <AccountProvider defaultAccount={new XyoWalletBase('test me').getAccount(0)}>
      <WalletAccountDetails {...args}></WalletAccountDetails>
    </AccountProvider>
  )
}

const Default = Template.bind({})
Default.args = {}

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

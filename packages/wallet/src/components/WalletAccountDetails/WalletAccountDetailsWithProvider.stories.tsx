import { ComponentMeta, ComponentStory } from '@storybook/react'
import { XyoWalletBase } from '@xyo-network/core'
import { BrowserRouter } from 'react-router-dom'

import { WalletProvider } from '../../contexts'
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
    <BrowserRouter>
      <WalletProvider defaultWallet={new XyoWalletBase('test me')}>
        <WalletAccountDetails {...args}></WalletAccountDetails>
      </WalletProvider>
    </BrowserRouter>
  )
}

const Default = Template.bind({})
Default.args = {}

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

import { Meta, StoryFn } from '@storybook/react'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'
import { BrowserRouter } from 'react-router-dom'

import { WalletProvider } from '../../contexts'
import { useAccount } from '../../hooks'
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
} as Meta<typeof WalletAccountDetails>

const Template: StoryFn<typeof WalletAccountDetails> = (args) => {
  const [account] = useAccount({ mnemonic: DefaultSeedPhrase })
  return (
    <BrowserRouter>
      <WalletProvider defaultWallet={account}>
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

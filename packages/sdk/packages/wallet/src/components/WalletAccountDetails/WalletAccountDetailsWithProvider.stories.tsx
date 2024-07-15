import { Meta, StoryFn } from '@storybook/react'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'
import { BrowserRouter } from 'react-router-dom'

import { WalletProvider } from '../../contexts/index.js'
import { useWallet } from '../../hooks/index.js'
import { WalletAccountDetails } from './WalletAccountDetails.js'

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
  const [wallet] = useWallet({ mnemonic: DefaultSeedPhrase })
  return (
    <BrowserRouter>
      <WalletProvider rootWallet={wallet}>
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

import type { Meta, StoryFn } from '@storybook/react-vite'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { WalletProvider } from '../../contexts/index.ts'
import { useWallet } from '../../hooks/index.ts'
import { WalletAccountDetails } from './WalletAccountDetails.tsx'

const StorybookEntry = {
  argTypes: {},
  component: WalletAccountDetails,
  parameters: { docs: { page: null } },
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

export default StorybookEntry

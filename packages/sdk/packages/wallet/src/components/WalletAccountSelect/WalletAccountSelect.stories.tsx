import { Meta, StoryFn } from '@storybook/react'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'

import { WalletProvider } from '../../contexts'
import { useWallet } from '../../hooks'
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
} as Meta<typeof WalletAccountSelect>

const Template: StoryFn<typeof WalletAccountSelect> = (args) => {
  return <WalletAccountSelect {...args} />
}

const WithWalletTemplate: StoryFn<typeof WalletAccountSelect> = (args) => {
  const [wallet] = useWallet({ mnemonic: DefaultSeedPhrase })
  return (
    <WalletProvider rootWallet={wallet}>
      <WalletAccountSelect {...args} />
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

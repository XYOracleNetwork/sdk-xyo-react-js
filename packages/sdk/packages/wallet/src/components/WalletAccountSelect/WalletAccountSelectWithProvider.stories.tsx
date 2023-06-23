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
  title: 'wallet/WalletAccountSelectWithProvider',
} as Meta<typeof WalletAccountSelect>

const Template: StoryFn<typeof WalletAccountSelect> = (args) => {
  const [rootWallet] = useWallet({ mnemonic: DefaultSeedPhrase })
  return (
    <WalletProvider rootWallet={rootWallet}>
      <WalletAccountSelect {...args}></WalletAccountSelect>
    </WalletProvider>
  )
}

const Default = Template.bind({})
Default.args = {}

const DefaultIcons = Template.bind({})
DefaultIcons.args = { icons: true }

const DefaultSmall = Template.bind({})
DefaultSmall.args = { size: 'small' }

const DefaultSmallIcon = Template.bind({})
DefaultSmallIcon.args = { icons: true, size: 'small' }

const IconsOnly = Template.bind({})
IconsOnly.args = { iconOnly: true, icons: true }

const IconsOnlySmall = Template.bind({})
IconsOnlySmall.args = { iconOnly: true, icons: true, size: 'small' }

export { Default, DefaultIcons, DefaultSmall, DefaultSmallIcon, IconsOnly, IconsOnlySmall }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

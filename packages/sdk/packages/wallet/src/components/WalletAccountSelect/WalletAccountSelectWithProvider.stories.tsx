import { ComponentMeta, ComponentStory } from '@storybook/react'
import { HDWallet } from '@xyo-network/account'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'

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
  title: 'wallet/WalletAccountSelectWithProvider',
} as ComponentMeta<typeof WalletAccountSelect>

const Template: ComponentStory<typeof WalletAccountSelect> = (args) => {
  return (
    <WalletProvider defaultWallet={HDWallet.fromMnemonic(DefaultSeedPhrase)}>
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

import { ComponentMeta, ComponentStory } from '@storybook/react'
import { XyoWalletBase } from '@xyo-network/core'
import { ApplicationAppBar } from '@xyo-network/react-appbar'
import { ArchivesProvider } from '@xyo-network/react-archive'
import { ArchivistApiProvider } from '@xyo-network/react-archivist-api'
import { NetworkMemoryProvider } from '@xyo-network/react-network'
import { WalletAccountSelect, WalletProvider } from '@xyo-network/react-wallet'
import { BrowserRouter } from 'react-router-dom'

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

const WithAppBarTemplate: ComponentStory<typeof WalletAccountSelect> = (args) => {
  return (
    <WalletProvider defaultWallet={new XyoWalletBase('test me')}>
      <NetworkMemoryProvider>
        <ArchivistApiProvider apiDomain="https://beta.api.archivist.xyo.network">
          <BrowserRouter>
            <ArchivesProvider>
              <ApplicationAppBar>
                <WalletAccountSelect {...args}></WalletAccountSelect>
              </ApplicationAppBar>
            </ArchivesProvider>
          </BrowserRouter>
        </ArchivistApiProvider>
      </NetworkMemoryProvider>
    </WalletProvider>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithWallet = WithWalletTemplate.bind({})
WithWallet.args = {}

const WithAppBar = WithAppBarTemplate.bind({})
WithAppBar.args = { icons: true, size: 'small' }

export { Default, WithAppBar, WithWallet }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

import { ComponentMeta, ComponentStory } from '@storybook/react'
import { XyoWalletBase } from '@xyo-network/core'
import { ApplicationAppBar } from '@xyo-network/react-appbar'
import { ArchivesProvider } from '@xyo-network/react-archive'
import { ArchivistApiProvider } from '@xyo-network/react-archivist-api'
import { NetworkMemoryProvider } from '@xyo-network/react-network'
import { WalletAccountSelectBar, WalletProvider } from '@xyo-network/react-wallet'
import { BrowserRouter } from 'react-router-dom'

const StorybookEntry = {
  argTypes: {},
  component: WalletAccountSelectBar,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'wallet/WalletAccountSelectBar',
} as ComponentMeta<typeof WalletAccountSelectBar>

const Template: ComponentStory<typeof WalletAccountSelectBar> = (args) => {
  return <WalletAccountSelectBar {...args}></WalletAccountSelectBar>
}

const WithWalletTemplate: ComponentStory<typeof WalletAccountSelectBar> = (args) => {
  return (
    <WalletProvider defaultWallet={new XyoWalletBase('test me')}>
      <WalletAccountSelectBar {...args}></WalletAccountSelectBar>
    </WalletProvider>
  )
}

const WithAppBarTemplate: ComponentStory<typeof WalletAccountSelectBar> = (args) => {
  return (
    <WalletProvider defaultWallet={new XyoWalletBase('test me')}>
      <NetworkMemoryProvider>
        <ArchivistApiProvider apiDomain="https://beta.api.archivist.xyo.network">
          <BrowserRouter>
            <ArchivesProvider>
              <ApplicationAppBar>
                <WalletAccountSelectBar flexGrow={1} {...args}></WalletAccountSelectBar>
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
WithAppBar.args = {}

export { Default, WithAppBar, WithWallet }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

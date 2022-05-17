import { ComponentMeta, ComponentStory } from '@storybook/react'
import { XyoWalletBase } from '@xyo-network/core'
import { BrowserRouter } from 'react-router-dom'

import { ApplicationAppBar } from '../../../appbar'
import { ArchivesProvider } from '../../../archives'
import { ArchivistApiProvider } from '../../../archivist-api'
import { NetworkMemoryProvider } from '../../../network'
import { WalletProvider } from '../../contexts'
import { WalletAccountSelect } from './WalletAccountSelect'

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

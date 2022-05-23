import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ApplicationAppBar } from '@xyo-network/react-appbar'
import { ArchiveProvider, ArchivesProvider } from '@xyo-network/react-archive'
import { ArchivistApiProvider } from '@xyo-network/react-archivist-api'
import { NetworkMemoryProvider } from '@xyo-network/react-network'
import { WalletAccountSelect } from '@xyo-network/react-wallet'
import { BrowserRouter } from 'react-router-dom'

const StorybookEntry = {
  argTypes: {},
  component: ApplicationAppBar,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'AppBar/Wallet',
} as ComponentMeta<typeof ApplicationAppBar>

const Template: ComponentStory<typeof ApplicationAppBar> = (args) => (
  <BrowserRouter>
    <NetworkMemoryProvider>
      <ArchiveProvider>
        <ArchivistApiProvider apiDomain="https://beta.api.archivist.xyo.network">
          <ArchivesProvider>
            <ApplicationAppBar {...args}></ApplicationAppBar>
          </ArchivesProvider>
        </ArchivistApiProvider>
      </ArchiveProvider>
    </NetworkMemoryProvider>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = { children: <WalletAccountSelect />, color: 'primary' }

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

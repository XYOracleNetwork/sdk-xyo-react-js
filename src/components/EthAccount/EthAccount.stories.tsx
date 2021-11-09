import { ComponentMeta, ComponentStory } from '@storybook/react'
import { EthAddress } from '@xyo-network/sdk-xyo-js'
import { BrowserRouter } from 'react-router-dom'

import EthAccount from './EthAccount'

const StorybookEntry = {
  argTypes: {},
  component: EthAccount,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'EthAccount',
} as ComponentMeta<typeof EthAccount>

const Template: ComponentStory<typeof EthAccount> = (args) => (
  <BrowserRouter>
    <EthAccount {...args}></EthAccount>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {
  address: EthAddress.fromString('0x6792b02f88b32c4fe8e31cfa41ae5af44865f930'),
  auto: true,
  title: 'Sample EthAccount',
  toEtherScan: true,
}

export { Default }

export default StorybookEntry

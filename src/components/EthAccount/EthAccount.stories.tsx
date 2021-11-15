import { ComponentMeta, ComponentStory } from '@storybook/react'
import { EthAddress } from '@xylabs/sdk-js'

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

const Template: ComponentStory<typeof EthAccount> = (args) => <EthAccount {...args}></EthAccount>

const Default = Template.bind({})
Default.args = {
  address: EthAddress.fromString('0x6792b02f88b32c4fe8e31cfa41ae5af44865f930'),
  auto: true,
  icon: true,
  title: 'Sample EthAccount',
  toEtherScan: true,
}

export { Default }

export default StorybookEntry

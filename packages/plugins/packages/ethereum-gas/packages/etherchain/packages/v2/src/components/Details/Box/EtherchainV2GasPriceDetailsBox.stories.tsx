import { Meta, StoryFn } from '@storybook/react'
import { XyoEthereumGasEtherchainV2Schema } from '@xyo-network/etherchain-ethereum-gas-v2-payload-plugin'
import { sampleEtherchainV2GasPricePayload } from '@xyo-network/react-storybook'

import { EtherchainV2GasPriceDetailsBox } from './EtherchainV2GasPriceDetailsBox'

const StorybookEntry = {
  argTypes: {},
  component: EtherchainV2GasPriceDetailsBox,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/blockchain/EtherchainV2GasPrice/DetailsBox',
} as Meta<typeof EtherchainV2GasPriceDetailsBox>

const Template: StoryFn<typeof EtherchainV2GasPriceDetailsBox> = (args) => <EtherchainV2GasPriceDetailsBox {...args} />

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: sampleEtherchainV2GasPricePayload }

const WithMissingData = Template.bind({})
WithMissingData.args = { payload: { schema: XyoEthereumGasEtherchainV2Schema } }

export { Default, WithData, WithMissingData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

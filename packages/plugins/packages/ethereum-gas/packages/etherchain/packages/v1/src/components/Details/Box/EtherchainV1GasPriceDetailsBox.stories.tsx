import { ComponentMeta, ComponentStory } from '@storybook/react'
import { XyoEthereumGasEtherchainV1Schema } from '@xyo-network/etherchain-ethereum-gas-v1-payload-plugin'
import { sampleEtherchainV1GasPricePayload } from '@xyo-network/react-storybook'

import { EtherchainV1GasPriceDetailsBox } from './EtherchainV1GasPriceDetailsBox'

const StorybookEntry = {
  argTypes: {},
  component: EtherchainV1GasPriceDetailsBox,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/blockchain/EtherchainV1GasPrice/DetailsBox',
} as ComponentMeta<typeof EtherchainV1GasPriceDetailsBox>

const Template: ComponentStory<typeof EtherchainV1GasPriceDetailsBox> = (args) => <EtherchainV1GasPriceDetailsBox {...args} />

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: sampleEtherchainV1GasPricePayload }

const WithMissingData = Template.bind({})
WithMissingData.args = { payload: { schema: XyoEthereumGasEtherchainV1Schema } }

export { Default, WithData, WithMissingData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

import { ComponentMeta, ComponentStory } from '@storybook/react'
import { XyoEthereumGasEtherchainV1Schema } from '@xyo-network/etherchain-ethereum-gas-v1-payload-plugin'
import { sampleEtherchainV1GasPricePayload } from '@xyo-network/react-storybook'

import { EtherchainV1GasPriceCard } from './Card'

const StorybookEntry = {
  argTypes: {},
  component: EtherchainV1GasPriceCard,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/blockchain/EtherchainV1GasPrice/Card',
} as ComponentMeta<typeof EtherchainV1GasPriceCard>

const Template: ComponentStory<typeof EtherchainV1GasPriceCard> = (args) => <EtherchainV1GasPriceCard {...args} />

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: sampleEtherchainV1GasPricePayload }

const WithMissingData = Template.bind({})
WithMissingData.args = { payload: { schema: XyoEthereumGasEtherchainV1Schema } }

export { Default, WithData, WithMissingData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

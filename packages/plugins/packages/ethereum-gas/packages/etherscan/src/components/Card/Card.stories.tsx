import { ComponentMeta, ComponentStory } from '@storybook/react'
import { XyoEthereumGasEtherscanSchema } from '@xyo-network/etherscan-ethereum-gas-payload-plugin'
import { sampleEtherscanGasPricePayload } from '@xyo-network/react-storybook'

import { EtherscanGasPriceCard } from './Card'

const StorybookEntry = {
  argTypes: {},
  component: EtherscanGasPriceCard,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/blockchain/EtherscanGasPrice/Card',
} as ComponentMeta<typeof EtherscanGasPriceCard>

const Template: ComponentStory<typeof EtherscanGasPriceCard> = (args) => <EtherscanGasPriceCard {...args} />

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: sampleEtherscanGasPricePayload }

const WithMissingData = Template.bind({})
WithMissingData.args = { payload: { schema: XyoEthereumGasEtherscanSchema } }

export { Default, WithData, WithMissingData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

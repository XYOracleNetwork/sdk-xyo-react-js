import { ComponentMeta, ComponentStory } from '@storybook/react'
import { XyoEthereumGasEthersSchema } from '@xyo-network/ethers-ethereum-gas-payload-plugin'
import { sampleEthersGasPricePayload } from '@xyo-network/react-storybook'

import { EthersGasPriceCard } from './Card'

const StorybookEntry = {
  argTypes: {},
  component: EthersGasPriceCard,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/blockchain/EthersGasPrice/Card',
} as ComponentMeta<typeof EthersGasPriceCard>

const Template: ComponentStory<typeof EthersGasPriceCard> = (args) => <EthersGasPriceCard {...args} />

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: sampleEthersGasPricePayload }

const WithMissingData = Template.bind({})
WithMissingData.args = { payload: { schema: XyoEthereumGasEthersSchema } }

export { Default, WithData, WithMissingData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

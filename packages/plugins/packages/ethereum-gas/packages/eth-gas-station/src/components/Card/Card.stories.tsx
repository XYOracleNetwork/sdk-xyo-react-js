import { ComponentMeta, ComponentStory } from '@storybook/react'
import { XyoEthereumGasEthgasstationSchema } from '@xyo-network/ethgasstation-ethereum-gas-payload-plugin'
import { sampleEthGasStationGasPricePayload } from '@xyo-network/react-storybook'

import { EthgasstationGasPriceCard } from './Card'

const StorybookEntry = {
  argTypes: {},
  component: EthgasstationGasPriceCard,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/blockchain/EthgasstationGasPrice/Card',
} as ComponentMeta<typeof EthgasstationGasPriceCard>

const Template: ComponentStory<typeof EthgasstationGasPriceCard> = (args) => <EthgasstationGasPriceCard {...args} />

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: sampleEthGasStationGasPricePayload }

const WithMissingData = Template.bind({})
WithMissingData.args = { payload: { schema: XyoEthereumGasEthgasstationSchema } }

export { Default, WithData, WithMissingData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

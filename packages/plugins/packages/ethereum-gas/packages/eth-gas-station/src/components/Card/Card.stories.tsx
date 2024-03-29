import { Meta, StoryFn } from '@storybook/react'
import { EthereumGasEthgasstationSchema } from '@xyo-network/ethgasstation-ethereum-gas-payload-plugin'
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
} as Meta<typeof EthgasstationGasPriceCard>

const Template: StoryFn<typeof EthgasstationGasPriceCard> = (args) => <EthgasstationGasPriceCard {...args} />

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: sampleEthGasStationGasPricePayload }

const WithMissingData = Template.bind({})
WithMissingData.args = { payload: { schema: EthereumGasEthgasstationSchema } }

export { Default, WithData, WithMissingData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

import { Meta, StoryFn } from '@storybook/react'
import { sampleEthereumGasDivinerPayload, sampleEthereumGasDivinerPayloadMissingFees } from '@xyo-network/react-storybook'

import { EthereumGasPriceCard } from './Card'

const StorybookEntry = {
  argTypes: {},
  component: EthereumGasPriceCard,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/blockchain/EthereumGasPrice/Card',
} as Meta<typeof EthereumGasPriceCard>

const Template: StoryFn<typeof EthereumGasPriceCard> = (args) => <EthereumGasPriceCard {...args} />

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: sampleEthereumGasDivinerPayload }

const WithMissingData = Template.bind({})
WithMissingData.args = { payload: sampleEthereumGasDivinerPayloadMissingFees }

export { Default, WithData, WithMissingData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

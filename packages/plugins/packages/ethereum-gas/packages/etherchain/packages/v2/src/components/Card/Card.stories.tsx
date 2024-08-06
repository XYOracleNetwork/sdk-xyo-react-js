import { Meta, StoryFn } from '@storybook/react'
import { EthereumGasEtherchainV2Schema } from '@xyo-network/etherchain-ethereum-gas-v2-payload-plugin'
import { sampleEtherchainV2GasPricePayload } from '@xyo-network/react-storybook'
import React from 'react'

import { EtherchainV2GasPriceCard } from './Card.js'

const StorybookEntry = {
  argTypes: {},
  component: EtherchainV2GasPriceCard,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/blockchain/EtherchainV2GasPrice/Card',
} as Meta<typeof EtherchainV2GasPriceCard>

const Template: StoryFn<typeof EtherchainV2GasPriceCard> = args => <EtherchainV2GasPriceCard {...args} />

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: sampleEtherchainV2GasPricePayload }

const WithMissingData = Template.bind({})
WithMissingData.args = { payload: { schema: EthereumGasEtherchainV2Schema } }

export { Default, WithData, WithMissingData }

export default StorybookEntry

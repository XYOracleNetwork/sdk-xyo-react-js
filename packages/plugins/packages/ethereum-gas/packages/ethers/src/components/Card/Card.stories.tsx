import type { Meta, StoryFn } from '@storybook/react-vite'
import { EthereumGasEthersSchema } from '@xyo-network/ethers-ethereum-gas-payload-plugin'
import { sampleEthersGasPricePayload } from '@xyo-network/react-storybook'
import React from 'react'

import { EthersGasPriceCard } from './Card.tsx'

const StorybookEntry = {
  argTypes: {},
  component: EthersGasPriceCard,
  parameters: { docs: { page: null } },
  title: 'plugin/blockchain/EthersGasPrice/Card',
} as Meta<typeof EthersGasPriceCard>

const Template: StoryFn<typeof EthersGasPriceCard> = args => <EthersGasPriceCard {...args} />

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: sampleEthersGasPricePayload }

const WithMissingData = Template.bind({})
WithMissingData.args = { payload: { schema: EthereumGasEthersSchema } }

export {
  Default, WithData, WithMissingData,
}

export default StorybookEntry

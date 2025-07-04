import type { Meta, StoryFn } from '@storybook/react-vite'
import { EthereumGasEtherscanSchema } from '@xyo-network/etherscan-ethereum-gas-payload-plugin'
import { sampleEtherscanGasPricePayload } from '@xyo-network/react-storybook'
import React from 'react'

import { EtherscanGasPriceDetailsBox } from './EtherscanGasPriceDetailsBox.tsx'

const StorybookEntry = {
  argTypes: {},
  component: EtherscanGasPriceDetailsBox,
  parameters: { docs: { page: null } },
  title: 'plugin/blockchain/EtherscanGasPrice/DetailsBox',
} as Meta<typeof EtherscanGasPriceDetailsBox>

const Template: StoryFn<typeof EtherscanGasPriceDetailsBox> = args => <EtherscanGasPriceDetailsBox {...args} />

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: sampleEtherscanGasPricePayload }

const WithMissingData = Template.bind({})
WithMissingData.args = { payload: { schema: EthereumGasEtherscanSchema } }

export {
  Default, WithData, WithMissingData,
}

export default StorybookEntry

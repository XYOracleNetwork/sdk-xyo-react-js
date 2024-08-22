import type { Meta, StoryFn } from '@storybook/react'
import { EthereumGasEthersSchema } from '@xyo-network/ethers-ethereum-gas-payload-plugin'
import { sampleEthersGasPricePayload } from '@xyo-network/react-storybook'
import React from 'react'

import { EthersGasPriceDetailsBox } from './EthersGasPriceDetailsBox.tsx'

const StorybookEntry = {
  argTypes: {},
  component: EthersGasPriceDetailsBox,
  parameters: { docs: { page: null } },
  title: 'plugin/blockchain/EthersGasPrice/DetailsBox',
} as Meta<typeof EthersGasPriceDetailsBox>

const Template: StoryFn<typeof EthersGasPriceDetailsBox> = args => <EthersGasPriceDetailsBox {...args} />

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

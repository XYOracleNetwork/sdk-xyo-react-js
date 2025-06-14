import type { Meta, StoryFn } from '@storybook/react-vite'
import { EthereumGasEthgasstationSchema } from '@xyo-network/ethgasstation-ethereum-gas-payload-plugin'
import { sampleEthGasStationGasPricePayload } from '@xyo-network/react-storybook'
import React from 'react'

import { EthgasstationGasPriceDetailsBox } from './EthgasstationGasPriceDetailsBox.tsx'

const StorybookEntry = {
  argTypes: {},
  component: EthgasstationGasPriceDetailsBox,
  parameters: { docs: { page: null } },
  title: 'plugin/blockchain/EthgasstationGasPrice/DetailsBox',
} as Meta<typeof EthgasstationGasPriceDetailsBox>

const Template: StoryFn<typeof EthgasstationGasPriceDetailsBox> = args => <EthgasstationGasPriceDetailsBox {...args} />

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: sampleEthGasStationGasPricePayload }

const WithMissingData = Template.bind({})
WithMissingData.args = { payload: { schema: EthereumGasEthgasstationSchema } }

export {
  Default, WithData, WithMissingData,
}

export default StorybookEntry

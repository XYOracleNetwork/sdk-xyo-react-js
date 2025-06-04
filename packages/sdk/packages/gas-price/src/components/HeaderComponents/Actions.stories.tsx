import type { Meta, StoryFn } from '@storybook/react-vite'
import React from 'react'

import { GasPriceHeaderActionsBox } from './Actions.tsx'

export default {
  component: GasPriceHeaderActionsBox,
  title: 'plugin/blockchain/GasPrice/GasPriceHeaderActionsBox',
} as Meta

const Template: StoryFn<typeof GasPriceHeaderActionsBox> = props => <GasPriceHeaderActionsBox {...props} />

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = {
  baseFee: 12,
  baseFeeLabel: 'Custom BaseFee Label',
  blockNumber: 123_465,
  blockNumberLabel: 'Custom BlockNumber Label',
  timestamp: 1_670_530_947,
}

export { Default, WithData }

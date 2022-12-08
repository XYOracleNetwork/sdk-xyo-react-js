import { ComponentStory, Meta } from '@storybook/react'

import { GasPriceHeaderActionsBox } from './Actions'

// eslint-disable-next-line import/no-default-export
export default {
  component: GasPriceHeaderActionsBox,
  title: 'plugin/blockchain/GasPrice/GasPriceHeaderActionsBox',
} as Meta

const Template: ComponentStory<typeof GasPriceHeaderActionsBox> = (props) => <GasPriceHeaderActionsBox {...props} />

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = {
  baseFee: 12,
  baseFeeLabel: 'Custom BaseFee Label',
  blockNumber: 123465,
  blockNumberLabel: 'Custom BlockNumber Label',
  timestamp: 1670530947,
}

export { Default, WithData }

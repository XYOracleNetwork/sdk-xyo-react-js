import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { EthereumGasPriceAvatar } from './EthereumGasPriceAvatar.js'

export default {
  component: EthereumGasPriceAvatar,
  title: 'plugin/blockchain/EthereumGasPrice/Avatar',
} as Meta

const Template: StoryFn<typeof EthereumGasPriceAvatar> = props => <EthereumGasPriceAvatar {...props} />

const Default = Template.bind({})
Default.args = {}

export { Default }

import { ComponentStory, Meta } from '@storybook/react'

import { EthereumGasPriceAvatar } from './EthereumGasPriceAvatar'

// eslint-disable-next-line import/no-default-export
export default {
  component: EthereumGasPriceAvatar,
  title: 'plugin/blockchain/EthereumGasPrice/Avatar',
} as Meta

const Template: ComponentStory<typeof EthereumGasPriceAvatar> = (props) => <EthereumGasPriceAvatar {...props} />

const Default = Template.bind({})
Default.args = {}

export { Default }

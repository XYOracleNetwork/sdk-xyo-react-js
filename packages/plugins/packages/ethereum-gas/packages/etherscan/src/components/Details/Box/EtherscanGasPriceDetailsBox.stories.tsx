import { ComponentMeta, ComponentStory } from '@storybook/react'
import { XyoEthereumGasEtherscanSchema } from '@xyo-network/etherscan-ethereum-gas-payload-plugin'
import { sampleEtherscanGasPricePayload } from '@xyo-network/react-storybook'

import { EtherscanGasPriceDetailsBox } from './EtherscanGasPriceDetailsBox'

const StorybookEntry = {
  argTypes: {},
  component: EtherscanGasPriceDetailsBox,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/blockchain/EtherscanGasPrice/DetailsBox',
} as ComponentMeta<typeof EtherscanGasPriceDetailsBox>

const Template: ComponentStory<typeof EtherscanGasPriceDetailsBox> = (args) => <EtherscanGasPriceDetailsBox {...args} />

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: sampleEtherscanGasPricePayload }

const WithMissingData = Template.bind({})
WithMissingData.args = { payload: { schema: XyoEthereumGasEtherscanSchema } }

export { Default, WithData, WithMissingData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

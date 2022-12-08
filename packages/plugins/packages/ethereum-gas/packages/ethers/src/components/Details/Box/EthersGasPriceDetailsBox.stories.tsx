import { ComponentMeta, ComponentStory } from '@storybook/react'
import { XyoEthereumGasEthersSchema } from '@xyo-network/ethers-ethereum-gas-payload-plugin'
import { sampleEthersGasPricePayload } from '@xyo-network/react-storybook'

import { EthersGasPriceDetailsBox } from './EthersGasPriceDetailsBox'

const StorybookEntry = {
  argTypes: {},
  component: EthersGasPriceDetailsBox,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/blockchain/EthersGasPrice/DetailsBox',
} as ComponentMeta<typeof EthersGasPriceDetailsBox>

const Template: ComponentStory<typeof EthersGasPriceDetailsBox> = (args) => <EthersGasPriceDetailsBox {...args} />

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: sampleEthersGasPricePayload }

const WithMissingData = Template.bind({})
WithMissingData.args = { payload: { schema: XyoEthereumGasEthersSchema } }

export { Default, WithData, WithMissingData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

import { ComponentMeta, ComponentStory } from '@storybook/react'
import { XyoEthereumGasEthgasstationSchema } from '@xyo-network/ethgasstation-ethereum-gas-payload-plugin'
import { sampleEthGasStationGasPricePayload } from '@xyo-network/react-storybook'

import { EthgasstationGasPriceDetailsBox } from './EthgasstationGasPriceDetailsBox'

const StorybookEntry = {
  argTypes: {},
  component: EthgasstationGasPriceDetailsBox,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/blockchain/EthgasstationGasPrice/DetailsBox',
} as ComponentMeta<typeof EthgasstationGasPriceDetailsBox>

const Template: ComponentStory<typeof EthgasstationGasPriceDetailsBox> = (args) => <EthgasstationGasPriceDetailsBox {...args} />

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: sampleEthGasStationGasPricePayload }

const WithMissingData = Template.bind({})
WithMissingData.args = { payload: { schema: XyoEthereumGasEthgasstationSchema } }

export { Default, WithData, WithMissingData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

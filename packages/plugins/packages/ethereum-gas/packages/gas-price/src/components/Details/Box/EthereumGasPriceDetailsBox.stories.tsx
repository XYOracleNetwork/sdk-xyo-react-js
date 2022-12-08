import { ComponentMeta, ComponentStory } from '@storybook/react'
import { sampleEthereumGasDivinerPayload, sampleEthereumGasDivinerPayloadMissingFees } from '@xyo-network/react-storybook'

import { EthereumGasPriceDetailsBox } from './EthereumGasPriceDetailsBox'

const StorybookEntry = {
  argTypes: {},
  component: EthereumGasPriceDetailsBox,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/blockchain/EthereumGasPrice/DetailsBox',
} as ComponentMeta<typeof EthereumGasPriceDetailsBox>

const Template: ComponentStory<typeof EthereumGasPriceDetailsBox> = (args) => <EthereumGasPriceDetailsBox {...args} />

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: sampleEthereumGasDivinerPayload }

const WithMissingData = Template.bind({})
WithMissingData.args = { payload: sampleEthereumGasDivinerPayloadMissingFees }

export { Default, WithData, WithMissingData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

import { ComponentMeta, ComponentStory } from '@storybook/react'

import { EtherscanGasPriceDetailsBox } from './EtherscanGasPriceDetailsBox'

const StorybookEntry = {
  argTypes: {},
  component: EtherscanGasPriceDetailsBox,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/blockchain/EtherscanGasPriceDetailsBox',
} as ComponentMeta<typeof EtherscanGasPriceDetailsBox>

const Template: ComponentStory<typeof EtherscanGasPriceDetailsBox> = (args) => <EtherscanGasPriceDetailsBox {...args} />

const Default = Template.bind({})
Default.args = {}

// const WithData = Template.bind({})
// WithData.args = { payload: sampleEthereumGasDivinerPayload }

// const WithMissingData = Template.bind({})
// WithMissingData.args = { payload: sampleEthereumGasDivinerPayloadMissingFees }

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

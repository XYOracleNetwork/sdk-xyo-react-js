import { ComponentMeta, ComponentStory } from '@storybook/react'

import { EthereumGasPriceRender } from './EthereumGasPriceRender'
import { payloadData, payloadDataMissingFees } from './payloadData.stories'

const StorybookEntry = {
  argTypes: {},
  component: EthereumGasPriceRender,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/blockchain/EthereumGasPriceRender',
} as ComponentMeta<typeof EthereumGasPriceRender>

const Template: ComponentStory<typeof EthereumGasPriceRender> = (args) => <EthereumGasPriceRender {...args} />

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: payloadData }

const WithMissingData = Template.bind({})
WithMissingData.args = { payload: payloadDataMissingFees }

export { Default, WithData, WithMissingData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

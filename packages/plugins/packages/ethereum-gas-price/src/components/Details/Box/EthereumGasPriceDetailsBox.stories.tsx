import { ComponentMeta, ComponentStory } from '@storybook/react'

import { payloadData, payloadDataMissingFees } from '../../payloadData.stories'
import { EthereumGasPriceDetailsBox } from './EthereumGasPriceDetailsBox'

const StorybookEntry = {
  argTypes: {},
  component: EthereumGasPriceDetailsBox,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/blockchain/EthereumGasPriceDetailsBox',
} as ComponentMeta<typeof EthereumGasPriceDetailsBox>

const Template: ComponentStory<typeof EthereumGasPriceDetailsBox> = (args) => <EthereumGasPriceDetailsBox {...args} />

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: payloadData }

const WithMissingData = Template.bind({})
WithMissingData.args = { payload: payloadDataMissingFees }

export { Default, WithData, WithMissingData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

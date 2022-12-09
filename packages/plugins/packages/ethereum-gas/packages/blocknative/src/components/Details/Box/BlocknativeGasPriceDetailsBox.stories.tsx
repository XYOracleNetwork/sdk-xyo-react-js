import { ComponentMeta, ComponentStory } from '@storybook/react'
import { XyoEthereumGasBlocknativeSchema } from '@xyo-network/blocknative-ethereum-gas-payload-plugin'
import { sampleBlocknativeGasPricePayload } from '@xyo-network/react-storybook'

import { BlocknativeGasPriceDetailsBox } from './BlocknativeGasPriceDetailsBox'

const StorybookEntry = {
  argTypes: {},
  component: BlocknativeGasPriceDetailsBox,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/blockchain/BlocknativeGasPrice/DetailsBox',
} as ComponentMeta<typeof BlocknativeGasPriceDetailsBox>

const Template: ComponentStory<typeof BlocknativeGasPriceDetailsBox> = (args) => <BlocknativeGasPriceDetailsBox {...args} />

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: sampleBlocknativeGasPricePayload }

const WithMissingData = Template.bind({})
WithMissingData.args = { payload: { schema: XyoEthereumGasBlocknativeSchema } }

export { Default, WithData, WithMissingData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

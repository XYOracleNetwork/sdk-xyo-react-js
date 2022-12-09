import { ComponentMeta, ComponentStory } from '@storybook/react'
import { XyoEthereumGasBlocknativeSchema } from '@xyo-network/blocknative-ethereum-gas-payload-plugin'
import { sampleBlockNativeGasPricePayload } from '@xyo-network/react-storybook'

import { BlocknativeGasPriceCard } from './Card'

const StorybookEntry = {
  argTypes: {},
  component: BlocknativeGasPriceCard,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/blockchain/BlocknativeGasPrice/Card',
} as ComponentMeta<typeof BlocknativeGasPriceCard>

const Template: ComponentStory<typeof BlocknativeGasPriceCard> = (args) => <BlocknativeGasPriceCard {...args} />

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: sampleBlockNativeGasPricePayload }

const WithMissingData = Template.bind({})
WithMissingData.args = { payload: { schema: XyoEthereumGasBlocknativeSchema } }

export { Default, WithData, WithMissingData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

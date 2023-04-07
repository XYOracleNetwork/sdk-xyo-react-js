import { ComponentMeta, ComponentStory } from '@storybook/react'

import { payloadData, payloadDataMissingPairs } from './storyPayloadData'
import { UniswapDetailsRender } from './UniswapDetailsRender'

const StorybookEntry = {
  argTypes: {},
  component: UniswapDetailsRender,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/uniswap/UniswapDetailsRender',
} as ComponentMeta<typeof UniswapDetailsRender>

const Template: ComponentStory<typeof UniswapDetailsRender> = (args) => <UniswapDetailsRender {...args}></UniswapDetailsRender>

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: payloadData }

const WithTableData = Template.bind({})
WithTableData.args = { listMode: 'table', payload: payloadData }

const WithNoPairs = Template.bind({})
WithNoPairs.args = { listMode: 'table', payload: payloadDataMissingPairs }

export { Default, WithData, WithNoPairs, WithTableData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

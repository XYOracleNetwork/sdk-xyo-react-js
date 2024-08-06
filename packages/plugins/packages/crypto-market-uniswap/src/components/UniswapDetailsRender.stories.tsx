import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { payloadData, payloadDataMissingPairs } from './storyPayloadData.ts'
import { UniswapDetailsRender } from './UniswapDetailsRender.tsx'

const StorybookEntry = {
  argTypes: {},
  component: UniswapDetailsRender,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/uniswap/UniswapDetailsRender',
} as Meta<typeof UniswapDetailsRender>

const Template: StoryFn<typeof UniswapDetailsRender> = args => <UniswapDetailsRender {...args}></UniswapDetailsRender>

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: payloadData }

const WithTableData = Template.bind({})
WithTableData.args = { listMode: 'table', payload: payloadData }

const WithNoPairs = Template.bind({})
WithNoPairs.args = { listMode: 'table', payload: payloadDataMissingPairs }

export { Default, WithData, WithNoPairs, WithTableData }

export default StorybookEntry

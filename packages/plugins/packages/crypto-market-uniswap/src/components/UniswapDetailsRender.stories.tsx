import type { Meta, StoryFn } from '@storybook/react-vite'
import React from 'react'

import {
  payloadData, payloadDataMissingPairs, payloadDataMissingSymbol,
} from './storyPayloadData.ts'
import { UniswapDetailsRender } from './UniswapDetailsRender.tsx'

const StorybookEntry = {
  argTypes: {},
  component: UniswapDetailsRender,
  parameters: { docs: { page: null } },
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

const WithMissingSymbol = Template.bind({})
WithMissingSymbol.args = { payload: payloadDataMissingSymbol }

export {
  Default, WithData, WithMissingSymbol,
  WithNoPairs, WithTableData,
}

export default StorybookEntry

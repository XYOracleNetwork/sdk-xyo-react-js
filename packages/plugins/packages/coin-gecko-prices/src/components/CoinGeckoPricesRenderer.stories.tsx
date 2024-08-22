import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { CoinGeckoPricesRenderer } from './CoinGeckoPricesRenderer.tsx'
import { payloadData, payloadDataMissingAssets } from './storyPayloadData.ts'

const StorybookEntry = {
  argTypes: {},
  component: CoinGeckoPricesRenderer,
  parameters: { docs: { page: null } },
  title: 'plugin/coin-gecko-prices/CoinGeckoPricesRenderer',
} as Meta<typeof CoinGeckoPricesRenderer>

const Template: StoryFn<typeof CoinGeckoPricesRenderer> = args => <CoinGeckoPricesRenderer {...args}></CoinGeckoPricesRenderer>

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: payloadData }

const WithMissingData = Template.bind({})
WithMissingData.args = { payload: payloadDataMissingAssets }

export {
  Default, WithData, WithMissingData,
}

export default StorybookEntry

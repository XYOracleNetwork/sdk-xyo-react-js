import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { CryptoPricesRenderer } from './CryptoPricesRenderer.js'
import { payloadData, payloadDataMissingAssets } from './storyPayloadData.js'

const StorybookEntry = {
  argTypes: {},
  component: CryptoPricesRenderer,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/crypto-prices/CryptoPricesRenderer',
} as Meta<typeof CryptoPricesRenderer>

const Template: StoryFn<typeof CryptoPricesRenderer> = args => <CryptoPricesRenderer {...args}></CryptoPricesRenderer>

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: payloadData }

const WithMissingData = Template.bind({})
WithMissingData.args = { payload: payloadDataMissingAssets }

export { Default, WithData, WithMissingData }

export default StorybookEntry

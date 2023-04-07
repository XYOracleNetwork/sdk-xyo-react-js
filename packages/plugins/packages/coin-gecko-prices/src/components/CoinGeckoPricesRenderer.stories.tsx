import { Meta, StoryFn } from '@storybook/react'

import { CoinGeckoPricesRenderer } from './CoinGeckoPricesRenderer'
import { payloadData, payloadDataMissingAssets } from './storyPayloadData'

const StorybookEntry = {
  argTypes: {},
  component: CoinGeckoPricesRenderer,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/coin-gecko-prices/CoinGeckoPricesRenderer',
} as Meta<typeof CoinGeckoPricesRenderer>

const Template: StoryFn<typeof CoinGeckoPricesRenderer> = (args) => <CoinGeckoPricesRenderer {...args}></CoinGeckoPricesRenderer>

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: payloadData }

const WithMissingData = Template.bind({})
WithMissingData.args = { payload: payloadDataMissingAssets }

export { Default, WithData, WithMissingData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

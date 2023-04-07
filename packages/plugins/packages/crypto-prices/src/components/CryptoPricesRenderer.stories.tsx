import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CryptoPricesRenderer } from './CryptoPricesRenderer'
import { payloadData, payloadDataMissingAssets } from './storyPayloadData'

const StorybookEntry = {
  argTypes: {},
  component: CryptoPricesRenderer,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/crypto-prices/CryptoPricesRenderer',
} as ComponentMeta<typeof CryptoPricesRenderer>

const Template: ComponentStory<typeof CryptoPricesRenderer> = (args) => <CryptoPricesRenderer {...args}></CryptoPricesRenderer>

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: payloadData }

const WithMissingData = Template.bind({})
WithMissingData.args = { payload: payloadDataMissingAssets }

export { Default, WithData, WithMissingData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

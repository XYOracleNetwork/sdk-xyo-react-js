import { Meta, StoryFn } from '@storybook/react'

import { CryptoAssetRenderer } from './CryptoAssetRenderer.js'
import { payloadData, payloadDataMissingAssets } from './storyPayloadData.js'

const StorybookEntry = {
  argTypes: {},
  component: CryptoAssetRenderer,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/aggregate-price/CryptoAssetRenderer',
} as Meta<typeof CryptoAssetRenderer>

const Template: StoryFn<typeof CryptoAssetRenderer> = (args) => <CryptoAssetRenderer {...args}></CryptoAssetRenderer>

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: payloadData }

const WithMissingData = Template.bind({})
WithMissingData.args = { payload: payloadDataMissingAssets }

export { Default, WithData, WithMissingData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

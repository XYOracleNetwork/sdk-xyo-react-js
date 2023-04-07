import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CryptoAssetRenderer } from './CryptoAssetRenderer'
import { payloadData, payloadDataMissingAssets } from './storyPayloadData'

const StorybookEntry = {
  argTypes: {},
  component: CryptoAssetRenderer,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/aggregate-price/CryptoAssetRenderer',
} as ComponentMeta<typeof CryptoAssetRenderer>

const Template: ComponentStory<typeof CryptoAssetRenderer> = (args) => <CryptoAssetRenderer {...args}></CryptoAssetRenderer>

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: payloadData }

const WithMissingData = Template.bind({})
WithMissingData.args = { payload: payloadDataMissingAssets }

export { Default, WithData, WithMissingData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

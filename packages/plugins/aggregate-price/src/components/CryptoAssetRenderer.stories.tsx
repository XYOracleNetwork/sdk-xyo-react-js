import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CryptoAssetRenderer } from './CryptoAssetRenderer'
import { payloadData } from './payloadData.stories'

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

export { Default, WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

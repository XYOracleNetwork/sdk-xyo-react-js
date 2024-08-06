import { Meta, StoryFn } from '@storybook/react'
import { UniswapPairsRenderPlugin } from '@xyo-network/react-crypto-market-uniswap-plugin'
import { DefaultPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { PayloadRenderPluginResolver, PayloadRenderPluginResolverProvider } from '@xyo-network/react-payload-plugin-resolver'
import { sampleCoinGeckoPayload, sampleIdPayload, sampleSystemInfoBrowserPayload, sampleUniswapPayload } from '@xyo-network/react-storybook'
import { BrowserRouter } from 'react-router-dom'

import { PayloadDynamicTable } from './Table.js'

const StorybookEntry = {
  argTypes: {},
  component: PayloadDynamicTable,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'payload/DynamicTable',
} as Meta<typeof PayloadDynamicTable>

const Template: StoryFn<typeof PayloadDynamicTable> = args => (
  <PayloadRenderPluginResolverProvider
    resolver={new PayloadRenderPluginResolver().register(UniswapPairsRenderPlugin).register(DefaultPayloadRenderPlugin)}
  >
    <BrowserRouter>
      <PayloadDynamicTable {...args}></PayloadDynamicTable>
    </BrowserRouter>
  </PayloadRenderPluginResolverProvider>
)

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = {
  payloads: [
    sampleIdPayload,
    sampleUniswapPayload,
    sampleCoinGeckoPayload,
    sampleSystemInfoBrowserPayload,
    sampleIdPayload,
    sampleUniswapPayload,
    sampleIdPayload,
    sampleUniswapPayload,
    sampleCoinGeckoPayload,
    sampleSystemInfoBrowserPayload,
    sampleIdPayload,
    sampleUniswapPayload,
    sampleIdPayload,
    sampleUniswapPayload,
    sampleCoinGeckoPayload,
    sampleSystemInfoBrowserPayload,
    sampleIdPayload,
    sampleUniswapPayload,
    sampleIdPayload,
    sampleUniswapPayload,
    sampleSystemInfoBrowserPayload,
  ],
}

const WithError = Template.bind({})

const { ...badPayload } = sampleIdPayload

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
WithError.args = { payloads: [sampleIdPayload, badPayload] }

export { Default, WithData, WithError }

export default StorybookEntry

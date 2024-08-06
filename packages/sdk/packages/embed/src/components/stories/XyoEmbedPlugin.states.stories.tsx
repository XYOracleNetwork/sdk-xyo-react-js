import { Meta } from '@storybook/react'
import { CryptoAssetRenderPlugin } from '@xyo-network/react-aggregate-price-plugin'
import { UniswapPairsRenderPlugin } from '@xyo-network/react-crypto-market-uniswap-plugin'
import { createPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { payloadData } from './storyPayload.ts'
import { Template, xyoEmbedStoryBase } from './storyShared.tsx'

const AggregatePricePointer = 'https://api.archivist.xyo.network/1948bf4eedf90ee2b8a1f63216b7c6b3b18d7bc2834330d85bcd6ab3d6428a20'

export default {
  ...xyoEmbedStoryBase,
  title: 'embed/EmbedPlugin/states',
} as Meta

const testPlugin = createPayloadRenderPlugin({
  canRender: () => true,
  name: 'Test Plugin',
})

const testPlugin1 = createPayloadRenderPlugin({
  canRender: () => true,
  name: 'Test1 Plugin',
})

const failingPlugin = createPayloadRenderPlugin({
  canRender: () => true,
  components: {
    box: {
      details: () => {
        throw new Error('testing Error Boundary')
      },
    },
  },
  name: 'Failing Plugin',
})

const Default = Template.bind({})
Default.args = {
  huri: AggregatePricePointer,
  plugins: [testPlugin, testPlugin1],
}

const ApiError = Template.bind({})
ApiError.args = {
  huriPayload: 'https://api.archivist.xyo.network/9663b2f80395a9e7e95948fdd5988b778a4dcc047202bf67e855ff6cd459b8c',
  plugins: [UniswapPairsRenderPlugin],
}

const ThrownError = Template.bind({})
ThrownError.args = {
  huriPayload: AggregatePricePointer,
  plugins: [failingPlugin],
}

const HiddenElements = Template.bind({})
HiddenElements.args = {
  hideElementsConfig: {
    hideAvatar: true,
    hideCardActions: true,
    hideCardHeader: true,
    hideRefreshButton: true,
    hideTimestamp: true,
    hideTitle: true,
  },
  huriPayload: AggregatePricePointer,
  plugins: [CryptoAssetRenderPlugin],
}

const WithPassedPayload = Template.bind({})
WithPassedPayload.args = {
  huriPayload: payloadData,
  plugins: [CryptoAssetRenderPlugin],
}

const WithSetBusyExternally = Template.bind({})
WithSetBusyExternally.args = {
  busy: true,
  huriPayload: payloadData,
  plugins: [CryptoAssetRenderPlugin],
}

const WithOnRefresh = Template.bind({})
WithOnRefresh.args = {
  huriPayload: payloadData,
  onRefresh: () => console.log('refreshed'),
  plugins: [CryptoAssetRenderPlugin],
}

export { ApiError, Default, HiddenElements, ThrownError, WithOnRefresh, WithPassedPayload, WithSetBusyExternally }

import { ComponentStory, Meta } from '@storybook/react'
import { CryptoAssetRenderPlugin } from '@xyo-network/react-aggregate-price-plugin'
import { UniswapPairsRenderPlugin } from '@xyo-network/react-crypto-market-uniswap-payload-plugin'
import { createPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { BrowserRouter } from 'react-router-dom'

import { payloadData } from './payload.stories'
import { XyoEmbedPlugin } from './XyoEmbedPlugin'

const AggregatePricePointer = 'https://api.archivist.xyo.network/1948bf4eedf90ee2b8a1f63216b7c6b3b18d7bc2834330d85bcd6ab3d6428a20'
const UniswapPairPointer = 'https://beta.api.archivist.xyo.network/e36602006239d86b6e08412f7879372b2c622d74f4d6bc508a08a46fa8ad6523'

// eslint-disable-next-line import/no-default-export
export default {
  argTypes: {},
  component: XyoEmbedPlugin,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'embed/XyoEmbedPlugin',
} as Meta

const Template: ComponentStory<typeof XyoEmbedPlugin> = (args) => {
  return (
    <BrowserRouter>
      <XyoEmbedPlugin {...args} />
    </BrowserRouter>
  )
}

const testPlugin = createPayloadRenderPlugin({
  canRender: () => true,
  name: 'Test Plugin',
})

const testPlugin1 = createPayloadRenderPlugin({
  canRender: () => true,
  name: 'Test1 Plugin',
})

const Default = Template.bind({})
Default.args = {
  huri: AggregatePricePointer,
  plugins: [testPlugin, testPlugin1],
}

const AggregatePriceExample = Template.bind({})
AggregatePriceExample.args = {
  huriPayload: AggregatePricePointer,
  plugins: [CryptoAssetRenderPlugin],
}

const UniswapPairsExample = Template.bind({})
UniswapPairsExample.args = {
  huriPayload: UniswapPairPointer,
  plugins: [UniswapPairsRenderPlugin],
}

const Error = Template.bind({})
Error.args = {
  huriPayload: 'https://api.archivist.xyo.network/9663b2f80395a9e7e95948fdd5988b778a4dcc047202bf67e855ff6cd459b8c',
  plugins: [UniswapPairsRenderPlugin],
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
  hideElementsConfig: {
    hideRefreshButton: true,
  },
  huriPayload: payloadData,
  plugins: [CryptoAssetRenderPlugin],
}

const WithOutsideRefresh = Template.bind({})
WithOutsideRefresh.args = {
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

export { AggregatePriceExample, Default, Error, HiddenElements, UniswapPairsExample, WithOnRefresh, WithOutsideRefresh, WithPassedPayload }

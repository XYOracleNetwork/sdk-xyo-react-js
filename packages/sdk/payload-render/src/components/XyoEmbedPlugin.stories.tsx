import { ComponentStory, Meta } from '@storybook/react'
import { CryptoAssetRenderPlugin } from '@xyo-network/react-aggregate-price-plugin'
import UniswapPairsRenderPlugin from '@xyo-network/react-crypto-market-uniswap-payload-plugin'
import { createPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { BrowserRouter } from 'react-router-dom'

import { XyoEmbedPlugin } from './XyoEmbedPlugin'

const AggregatePricePointer = 'https://beta.api.archivist.xyo.network/f78f3ab27794eaab4658313fe871fb5a513de10cf89cf935a079c5ebb75fdce9'
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
  title: 'payload/XyoEmbedPlugin',
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
  huri: AggregatePricePointer,
  plugins: [CryptoAssetRenderPlugin],
  timestampLabel: 'Last Updated - ',
}

const UniswapPairsExample = Template.bind({})
UniswapPairsExample.args = {
  huri: UniswapPairPointer,
  plugins: [UniswapPairsRenderPlugin],
  timestampLabel: 'Last Updated - ',
}

export { AggregatePriceExample, Default, UniswapPairsExample }

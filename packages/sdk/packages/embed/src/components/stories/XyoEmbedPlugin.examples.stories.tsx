import type { Meta } from '@storybook/react-vite'
import { CryptoAssetRenderPlugin } from '@xyo-network/react-aggregate-price-plugin'
import { UniswapPairsRenderPlugin } from '@xyo-network/react-crypto-market-uniswap-plugin'

import { Template } from './storyShared.tsx'
import { xyoEmbedStoryBase } from './xyoEmbedStoryBase.ts'

const AggregatePricePointer = 'https://api.archivist.xyo.network/1948bf4eedf90ee2b8a1f63216b7c6b3b18d7bc2834330d85bcd6ab3d6428a20'
const UniswapPairPointer = 'https://beta.api.archivist.xyo.network/e36602006239d86b6e08412f7879372b2c622d74f4d6bc508a08a46fa8ad6523'

export default {
  ...xyoEmbedStoryBase,
  title: 'embed/EmbedPlugin/examples',
} as Meta

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

export { AggregatePriceExample, UniswapPairsExample }

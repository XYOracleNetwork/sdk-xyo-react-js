import { XyoPayload } from '@xyo-network/payload'
import { createPayloadRenderPlugin, XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { CoinGeckoPricesRenderer } from './components'

export const CoinGeckoPricesRenderPlugin: XyoPayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: XyoPayload) => payload?.schema === 'network.xyo.crypto.market.coingecko',
    components: {
      box: {
        details: CoinGeckoPricesRenderer,
      },
    },
    name: 'CoinGecko Prices',
  }),
}

import { Payload } from '@xyo-network/payload-model'
import { createPayloadRenderPlugin, PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { CoinGeckoPricesRenderer } from './components'

export const CoinGeckoPricesRenderPlugin: PayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: Payload) => payload?.schema === 'network.xyo.crypto.market.coingecko',
    components: {
      box: {
        detailsBox: CoinGeckoPricesRenderer,
      },
    },
    name: 'CoinGecko Prices',
  }),
}

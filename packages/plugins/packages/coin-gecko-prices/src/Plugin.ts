import type { Payload } from '@xyo-network/payload-model'
import type { PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { createPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { CoinGeckoPricesRenderer } from './components/index.ts'

export const CoinGeckoPricesRenderPlugin: PayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: Payload) => payload?.schema === 'network.xyo.crypto.market.coingecko',
    components: { box: { detailsBox: CoinGeckoPricesRenderer } },
    name: 'CoinGecko Prices',
  }),
}

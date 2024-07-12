import { Payload } from '@xyo-network/payload-model'
import { createPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { CryptoPricesRenderer } from './components/index.js'

export const CryptoPricesRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: Payload) => payload?.schema === 'network.xyo.crypto.market',
    components: {
      box: {
        detailsBox: CryptoPricesRenderer,
      },
    },
    name: 'Crypto Prices',
  }),
}

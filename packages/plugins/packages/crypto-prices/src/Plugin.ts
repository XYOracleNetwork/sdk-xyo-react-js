import { XyoPayload } from '@xyo-network/payload-model'
import { createPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { CryptoPricesRenderer } from './components'

export const CryptoPricesRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: XyoPayload) => payload?.schema === 'network.xyo.crypto.market',
    components: {
      box: {
        detailsBox: CryptoPricesRenderer,
      },
    },
    name: 'Crypto Prices',
  }),
}

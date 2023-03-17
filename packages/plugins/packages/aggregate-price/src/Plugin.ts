import { Payload } from '@xyo-network/payload-model'
import { createPayloadRenderPlugin, PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { CryptoAssetRenderer } from './components'

export const CryptoAssetRenderPlugin: PayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: Payload) => payload?.schema === 'network.xyo.crypto.asset',
    components: {
      box: {
        detailsBox: CryptoAssetRenderer,
      },
    },
    name: 'Aggregate Price',
  }),
}

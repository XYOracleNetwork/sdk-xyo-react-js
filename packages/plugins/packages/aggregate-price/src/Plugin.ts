import { XyoPayload } from '@xyo-network/payload'
import { createPayloadRenderPlugin, XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { CryptoAssetRenderer } from './components'

export const CryptoAssetRenderPlugin: XyoPayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: XyoPayload) => payload?.schema === 'network.xyo.crypto.asset',
    components: {
      box: {
        detailsBox: CryptoAssetRenderer,
      },
    },
    name: 'Aggregate Price',
  }),
}

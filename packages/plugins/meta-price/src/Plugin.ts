import { XyoPayload } from '@xyo-network/payload'
import { createPayloadRenderPlugin, XyoRenderPlugin } from '@xyo-network/react-payload-plugin'

import { CryptoAssetRenderer } from './components'

export const CryptoAssetRenderPlugin: XyoRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: XyoPayload) => payload?.schema === 'network.xyo.crypto.asset',
    components: {
      box: {
        details: CryptoAssetRenderer,
      },
    },
    name: 'Meta Price',
  }),
  defaultFullScreen: false,
  slug: 'meta-price',
}

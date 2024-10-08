import type { Payload } from '@xyo-network/payload-model'
import type { PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { createPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { CryptoAssetRenderer } from './components/index.ts'

export const CryptoAssetRenderPlugin: PayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: Payload) => payload?.schema === 'network.xyo.crypto.asset',
    components: { box: { detailsBox: CryptoAssetRenderer } },
    name: 'Aggregate Price',
  }),
}

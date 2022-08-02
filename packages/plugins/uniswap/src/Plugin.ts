import { XyoPayload } from '@xyo-network/payload'
import { createPayloadRenderPlugin, XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { UniswapDetailsRender } from './components'

export interface XyoRenderPlugin extends XyoPayloadRenderPlugin {
  slug: string
  defaultFullScreen?: boolean
}

export const UniswapPairsRenderPlugin: XyoRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: XyoPayload) => payload?.schema === 'network.xyo.crypto.market.uniswap',
    components: {
      box: {
        details: UniswapDetailsRender,
        listModes: ['table', 'grid'],
      },
    },
    name: 'Uniswap Pairs View',
  }),
  defaultFullScreen: false,
  slug: 'uniswap-pairs',
}

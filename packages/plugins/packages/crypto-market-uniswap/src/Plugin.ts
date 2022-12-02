import { XyoPayload } from '@xyo-network/payload'
import { createPayloadRenderPlugin, XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { TableCellSummary, UniswapDetailsRender } from './components'

export const UniswapPairsRenderPlugin: XyoPayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: XyoPayload) => payload?.schema === 'network.xyo.crypto.market.uniswap',
    components: {
      box: {
        detailsBox: UniswapDetailsRender,
        listModes: ['table', 'grid'],
      },
      table: {
        cell: TableCellSummary,
      },
    },
    name: 'Uniswap Pairs View',
  }),
}

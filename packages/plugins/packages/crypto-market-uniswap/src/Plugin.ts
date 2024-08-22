import type { Payload } from '@xyo-network/payload-model'
import type { PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { createPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { TableCellSummary, UniswapDetailsRender } from './components/index.ts'

export const UniswapPairsRenderPlugin: PayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: Payload) => payload?.schema === 'network.xyo.crypto.market.uniswap',
    components: {
      box: {
        detailsBox: UniswapDetailsRender,
        listModes: ['table', 'grid'],
      },
      table: { cell: TableCellSummary },
    },
    name: 'Uniswap Pairs View',
  }),
}

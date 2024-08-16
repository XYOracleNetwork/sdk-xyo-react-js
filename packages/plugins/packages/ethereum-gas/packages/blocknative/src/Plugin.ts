import { EthereumGasBlocknativeSchema } from '@xyo-network/blocknative-ethereum-gas-payload-plugin'
import type { Payload } from '@xyo-network/payload-model'
import { EthereumGasPriceAvatar } from '@xyo-network/react-gas-price'
import type { PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { createPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { BlocknativeGasPriceCardContent, BlocknativeGasPriceCardHeader, BlocknativeGasPriceDetailsBox } from './components/index.ts'

export const EthereumGasPriceBlocknativePlugin: PayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: Payload) => payload?.schema === EthereumGasBlocknativeSchema,
    components: {
      avatar: {
        image: EthereumGasPriceAvatar,
      },
      box: {
        detailsBox: BlocknativeGasPriceDetailsBox,
      },
      card: {
        content: BlocknativeGasPriceCardContent,
        header: BlocknativeGasPriceCardHeader,
      },
    },
    name: 'Ethereum Gas Price Blocknative',
  }),
}

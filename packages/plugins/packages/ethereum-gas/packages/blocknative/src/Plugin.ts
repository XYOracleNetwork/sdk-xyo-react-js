import { XyoEthereumGasBlocknativeSchema } from '@xyo-network/blocknative-ethereum-gas-payload-plugin'
import { Payload } from '@xyo-network/payload-model'
import { EthereumGasPriceAvatar } from '@xyo-network/react-gas-price'
import { createPayloadRenderPlugin, PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { BlocknativeGasPriceCardContent, BlocknativeGasPriceCardHeader, BlocknativeGasPriceDetailsBox } from './components'

export const EthereumGasPriceBlocknativePlugin: PayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: Payload) => payload?.schema === XyoEthereumGasBlocknativeSchema,
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

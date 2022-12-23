import { XyoEthereumGasBlocknativeSchema } from '@xyo-network/blocknative-ethereum-gas-payload-plugin'
import { XyoPayload } from '@xyo-network/payload-model'
import { EthereumGasPriceAvatar } from '@xyo-network/react-gas-price'
import { createPayloadRenderPlugin, XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { BlocknativeGasPriceCardContent, BlocknativeGasPriceCardHeader, BlocknativeGasPriceDetailsBox } from './components'

export const EthereumGasPriceBlocknativePlugin: XyoPayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: XyoPayload) => payload?.schema === XyoEthereumGasBlocknativeSchema,
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

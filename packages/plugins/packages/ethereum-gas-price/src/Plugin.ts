import { XyoPayload } from '@xyo-network/payload'
import { createPayloadRenderPlugin, XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { EthereumGasPriceRender } from './components'

export const EthereumGasPricePlugin: XyoPayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: XyoPayload) => payload?.schema === 'network.xyo.blockchain.ethereum.gas',
    components: {
      box: {
        details: EthereumGasPriceRender,
      },
    },
    name: 'Ethereum Gas Price',
  }),
}

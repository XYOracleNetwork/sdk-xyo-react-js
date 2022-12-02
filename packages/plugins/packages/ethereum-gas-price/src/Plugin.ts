import { XyoPayload } from '@xyo-network/payload'
import { createPayloadRenderPlugin, XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { EthereumGasPriceAvatar, EthereumGasPriceDetailsBox } from './components'

export const EthereumGasPricePlugin: XyoPayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: XyoPayload) => payload?.schema === 'network.xyo.blockchain.ethereum.gas',
    components: {
      avatar: {
        image: EthereumGasPriceAvatar,
      },
      box: {
        details: EthereumGasPriceDetailsBox,
      },
    },
    name: 'Ethereum Gas Price',
  }),
}

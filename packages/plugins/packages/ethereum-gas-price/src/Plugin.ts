import { XyoPayload } from '@xyo-network/payload'
import { createPayloadRenderPlugin, XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { EthereumGasPriceAvatar, EthereumGasPriceCardContent, EthereumGasPriceCardHeader, EthereumGasPriceDetailsBox } from './components'

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
      card: {
        content: EthereumGasPriceCardContent,
        header: EthereumGasPriceCardHeader,
      },
    },
    name: 'Ethereum Gas Price',
  }),
}

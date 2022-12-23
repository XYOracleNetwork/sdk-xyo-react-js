import { XyoPayload } from '@xyo-network/payload-model'
import { EthereumGasPriceAvatar } from '@xyo-network/react-gas-price'
import { createPayloadRenderPlugin, XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { EthereumGasPriceCardContent, EthereumGasPriceCardHeader, EthereumGasPriceDetailsBox } from './components'

export const EthereumGasPricePlugin: XyoPayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: XyoPayload) => payload?.schema === 'network.xyo.blockchain.ethereum.gas',
    components: {
      avatar: {
        image: EthereumGasPriceAvatar,
      },
      box: {
        detailsBox: EthereumGasPriceDetailsBox,
      },
      card: {
        content: EthereumGasPriceCardContent,
        header: EthereumGasPriceCardHeader,
      },
    },
    name: 'Ethereum Gas Price',
  }),
}

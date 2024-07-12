import { Payload } from '@xyo-network/payload-model'
import { EthereumGasPriceAvatar } from '@xyo-network/react-gas-price'
import { createPayloadRenderPlugin, PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { EthereumGasPriceCardContent, EthereumGasPriceCardHeader, EthereumGasPriceDetailsBox } from './components/index.js'

export const EthereumGasPricePlugin: PayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: Payload) => payload?.schema === 'network.xyo.blockchain.ethereum.gas',
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

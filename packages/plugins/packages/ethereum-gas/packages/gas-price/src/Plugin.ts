import type { Payload } from '@xyo-network/payload-model'
import { EthereumGasPriceAvatar } from '@xyo-network/react-gas-price'
import type { PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { createPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { EthereumGasPriceCardContent, EthereumGasPriceCardHeader, EthereumGasPriceDetailsBox } from './components/index.ts'

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

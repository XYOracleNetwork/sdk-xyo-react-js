import { XyoEthereumGasEtherchainV1Schema } from '@xyo-network/etherchain-ethereum-gas-v1-payload-plugin'
import { Payload } from '@xyo-network/payload-model'
import { EthereumGasPriceAvatar } from '@xyo-network/react-gas-price'
import { createPayloadRenderPlugin, PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { EtherchainV1GasPriceCardContent, EtherchainV1GasPriceCardHeader, EtherchainV1GasPriceDetailsBox } from './components'

export const EthereumGasPriceEtherchainV1Plugin: PayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: Payload) => payload?.schema === XyoEthereumGasEtherchainV1Schema,
    components: {
      avatar: {
        image: EthereumGasPriceAvatar,
      },
      box: {
        detailsBox: EtherchainV1GasPriceDetailsBox,
      },
      card: {
        content: EtherchainV1GasPriceCardContent,
        header: EtherchainV1GasPriceCardHeader,
      },
    },
    name: 'Ethereum Gas Price Etherchain V1',
  }),
}

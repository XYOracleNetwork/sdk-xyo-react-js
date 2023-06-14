import { EthereumGasEtherchainV2Schema } from '@xyo-network/etherchain-ethereum-gas-v2-payload-plugin'
import { Payload } from '@xyo-network/payload-model'
import { EthereumGasPriceAvatar } from '@xyo-network/react-gas-price'
import { createPayloadRenderPlugin, PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { EtherchainV2GasPriceCardContent, EtherchainV2GasPriceCardHeader, EtherchainV2GasPriceDetailsBox } from './components'

export const EthereumGasPriceEtherchainV2Plugin: PayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: Payload) => payload?.schema === EthereumGasEtherchainV2Schema,
    components: {
      avatar: {
        image: EthereumGasPriceAvatar,
      },
      box: {
        detailsBox: EtherchainV2GasPriceDetailsBox,
      },
      card: {
        content: EtherchainV2GasPriceCardContent,
        header: EtherchainV2GasPriceCardHeader,
      },
    },
    name: 'Ethereum Gas Price Etherchain V2',
  }),
}

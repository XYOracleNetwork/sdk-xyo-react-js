import { XyoEthereumGasEtherchainV2Schema } from '@xyo-network/etherchain-ethereum-gas-v2-payload-plugin'
import { XyoPayload } from '@xyo-network/payload'
import { EthereumGasPriceAvatar } from '@xyo-network/react-gas-price'
import { createPayloadRenderPlugin, XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

// import { EtherchainV2GasPriceCardContent, EtherchainV2GasPriceCardHeader, EtherchainV2GasPriceDetailsBox } from './components'

export const EthereumGasPriceEtherchainV2Plugin: XyoPayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: XyoPayload) => payload?.schema === XyoEthereumGasEtherchainV2Schema,
    components: {
      avatar: {
        image: EthereumGasPriceAvatar,
      },
      // box: {
      //   detailsBox: EtherchainV2GasPriceDetailsBox,
      // },
      // card: {
      //   content: EtherchainV2GasPriceCardContent,
      //   header: EtherchainV2GasPriceCardHeader,
      // },
    },
    name: 'Ethereum Gas Price Etherchain V2',
  }),
}

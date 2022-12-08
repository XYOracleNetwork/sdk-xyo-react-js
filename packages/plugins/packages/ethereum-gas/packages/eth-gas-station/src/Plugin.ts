import { XyoEthereumGasEthgasstationSchema } from '@xyo-network/ethgasstation-ethereum-gas-payload-plugin'
import { XyoPayload } from '@xyo-network/payload'
import { EthereumGasPriceAvatar } from '@xyo-network/react-gas-price'
import { createPayloadRenderPlugin, XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

// import { EthgasstationGasPriceCardContent, EthgasstationGasPriceCardHeader, EthgasstationGasPriceDetailsBox } from './components'

export const EthereumGasPriceEthgasstationPlugin: XyoPayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: XyoPayload) => payload?.schema === XyoEthereumGasEthgasstationSchema,
    components: {
      avatar: {
        image: EthereumGasPriceAvatar,
      },
      // box: {
      //   detailsBox: EthgasstationGasPriceDetailsBox,
      // },
      // card: {
      //   content: EthgasstationGasPriceCardContent,
      //   header: EthgasstationGasPriceCardHeader,
      // },
    },
    name: 'Ethereum Gas Price Ethgasstation',
  }),
}

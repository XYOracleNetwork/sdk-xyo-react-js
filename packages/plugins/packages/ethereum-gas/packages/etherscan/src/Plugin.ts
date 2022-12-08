import { XyoEthereumGasEtherscanSchema } from '@xyo-network/etherscan-ethereum-gas-payload-plugin'
import { XyoPayload } from '@xyo-network/payload'
import { EthereumGasPriceAvatar } from '@xyo-network/react-gas-price'
import { createPayloadRenderPlugin, XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { EtherscanGasPriceDetailsBox } from './components'

export const EthereumGasPriceEtherscanPlugin: XyoPayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: XyoPayload) => payload?.schema === XyoEthereumGasEtherscanSchema,
    components: {
      avatar: {
        image: EthereumGasPriceAvatar,
      },
      box: {
        detailsBox: EtherscanGasPriceDetailsBox,
      },
      // card: {
      //   content: EthereumGasPriceCardContent,
      //   header: EthereumGasPriceCardHeader,
      // },
    },
    name: 'Ethereum Gas Price Etherscan',
  }),
}

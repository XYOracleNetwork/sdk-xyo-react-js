import { XyoEthereumGasEtherscanSchema } from '@xyo-network/etherscan-ethereum-gas-payload-plugin'
import { Payload } from '@xyo-network/payload-model'
import { EthereumGasPriceAvatar } from '@xyo-network/react-gas-price'
import { createPayloadRenderPlugin, PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { EtherscanGasPriceCardContent, EtherscanGasPriceCardHeader, EtherscanGasPriceDetailsBox } from './components'

export const EthereumGasPriceEtherscanPlugin: PayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: Payload) => payload?.schema === XyoEthereumGasEtherscanSchema,
    components: {
      avatar: {
        image: EthereumGasPriceAvatar,
      },
      box: {
        detailsBox: EtherscanGasPriceDetailsBox,
      },
      card: {
        content: EtherscanGasPriceCardContent,
        header: EtherscanGasPriceCardHeader,
      },
    },
    name: 'Ethereum Gas Price Etherscan',
  }),
}

import { EthereumGasEtherscanSchema } from '@xyo-network/etherscan-ethereum-gas-payload-plugin'
import type { Payload } from '@xyo-network/payload-model'
import { EthereumGasPriceAvatar } from '@xyo-network/react-gas-price'
import type { PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { createPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { EtherscanGasPriceCardContent, EtherscanGasPriceCardHeader, EtherscanGasPriceDetailsBox } from './components/index.ts'

export const EthereumGasPriceEtherscanPlugin: PayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: Payload) => payload?.schema === EthereumGasEtherscanSchema,
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

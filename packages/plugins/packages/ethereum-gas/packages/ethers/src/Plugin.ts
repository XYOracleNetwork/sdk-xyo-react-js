import { XyoEthereumGasEthersSchema } from '@xyo-network/ethers-ethereum-gas-payload-plugin'
import { XyoPayload } from '@xyo-network/payload-model'
import { EthereumGasPriceAvatar } from '@xyo-network/react-gas-price'
import { createPayloadRenderPlugin, XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { EthersGasPriceCardContent, EthersGasPriceCardHeader, EthersGasPriceDetailsBox } from './components'

export const EthereumGasPriceEthersPlugin: XyoPayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: XyoPayload) => payload?.schema === XyoEthereumGasEthersSchema,
    components: {
      avatar: {
        image: EthereumGasPriceAvatar,
      },
      box: {
        detailsBox: EthersGasPriceDetailsBox,
      },
      card: {
        content: EthersGasPriceCardContent,
        header: EthersGasPriceCardHeader,
      },
    },
    name: 'Ethereum Gas Price Ethers',
  }),
}

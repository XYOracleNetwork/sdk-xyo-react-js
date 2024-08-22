import { EthereumGasEthersSchema } from '@xyo-network/ethers-ethereum-gas-payload-plugin'
import type { Payload } from '@xyo-network/payload-model'
import { EthereumGasPriceAvatar } from '@xyo-network/react-gas-price'
import type { PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { createPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import {
  EthersGasPriceCardContent, EthersGasPriceCardHeader, EthersGasPriceDetailsBox,
} from './components/index.ts'

export const EthereumGasPriceEthersPlugin: PayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: Payload) => payload?.schema === EthereumGasEthersSchema,
    components: {
      avatar: { image: EthereumGasPriceAvatar },
      box: { detailsBox: EthersGasPriceDetailsBox },
      card: {
        content: EthersGasPriceCardContent,
        header: EthersGasPriceCardHeader,
      },
    },
    name: 'Ethereum Gas Price Ethers',
  }),
}

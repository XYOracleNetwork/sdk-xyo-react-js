import { EthereumGasPriceEthersPlugin } from '@xyo-network/react-ethereum-gas-price-ethers-plugin'
import { EthereumGasPricePlugin } from '@xyo-network/react-ethereum-gas-price-plugin'
import { XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

export const EthereumGasPricePayloadPlugins: XyoPayloadRenderPlugin[] = [EthereumGasPricePlugin, EthereumGasPriceEthersPlugin]

// eslint-disable-next-line import/no-default-export
export default EthereumGasPricePayloadPlugins

import { EthereumGasPricePlugin } from '@xyo-network/react-ethereum-gas-price-plugin'
import { XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

export const EthereumGasPricePayloadPlugins: XyoPayloadRenderPlugin[] = [EthereumGasPricePlugin]

// eslint-disable-next-line import/no-default-export
export default EthereumGasPricePayloadPlugins

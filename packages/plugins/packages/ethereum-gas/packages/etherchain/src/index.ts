import { EthereumGasPriceEtherchainV1Plugin } from '@xyo-network/react-ethereum-gas-price-etherchain-v1-plugin'
import { EthereumGasPriceEtherchainV2Plugin } from '@xyo-network/react-ethereum-gas-price-etherchain-v2-plugin'
import { XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

export const EthereumGasPriceEtherchainPlugins: XyoPayloadRenderPlugin[] = [EthereumGasPriceEtherchainV1Plugin, EthereumGasPriceEtherchainV2Plugin]

// eslint-disable-next-line import/no-default-export
export default EthereumGasPriceEtherchainPlugins

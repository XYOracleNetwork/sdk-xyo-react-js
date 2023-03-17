import { EthereumGasPriceEtherchainV1Plugin } from '@xyo-network/react-ethereum-gas-price-etherchain-v1-plugin'
import { EthereumGasPriceEtherchainV2Plugin } from '@xyo-network/react-ethereum-gas-price-etherchain-v2-plugin'
import { PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

export * from '@xyo-network/react-ethereum-gas-price-etherchain-v1-plugin'
export * from '@xyo-network/react-ethereum-gas-price-etherchain-v2-plugin'

export const EthereumGasPriceEtherchainPlugins: PayloadRenderPlugin[] = [EthereumGasPriceEtherchainV1Plugin, EthereumGasPriceEtherchainV2Plugin]

// eslint-disable-next-line import/no-default-export
export default EthereumGasPriceEtherchainPlugins

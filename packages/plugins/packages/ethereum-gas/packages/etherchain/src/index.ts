import { EthereumGasPriceEtherchainV2Plugin } from '@xyo-network/react-ethereum-gas-price-etherchain-v2-plugin'
import { PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

export * from '@xyo-network/react-ethereum-gas-price-etherchain-v2-plugin'

export const EthereumGasPriceEtherchainPlugins: PayloadRenderPlugin[] = [EthereumGasPriceEtherchainV2Plugin]

// eslint-disable-next-line import/no-default-export
export default EthereumGasPriceEtherchainPlugins

import { EthereumGasPriceEtherchainV1Plugin } from '@xyo-network/react-ethereum-gas-price-etherchain-v1-plugin'
import { XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
// import { XyoEthereumGasEtherchainV2PayloadPlugin } from '@xyo-network/etherchain-ethereum-gas-v2-payload-plugin'

// export * from '@xyo-network/etherchain-ethereum-gas-v1-payload-plugin'
// export * from '@xyo-network/etherchain-ethereum-gas-v2-payload-plugin'

export const EthereumGasPriceEtherchainPlugins: XyoPayloadRenderPlugin[] = [EthereumGasPriceEtherchainV1Plugin]

// eslint-disable-next-line import/no-default-export
export default EthereumGasPriceEtherchainPlugins

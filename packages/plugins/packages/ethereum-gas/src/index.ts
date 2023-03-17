import { EthereumGasPriceBlocknativePlugin } from '@xyo-network/react-ethereum-gas-price-blocknative-plugin'
import { EthereumGasPriceEtherchainPlugins } from '@xyo-network/react-ethereum-gas-price-etherchain-plugins'
import { EthereumGasPriceEthersPlugin } from '@xyo-network/react-ethereum-gas-price-ethers-plugin'
import { EthereumGasPriceEtherscanPlugin } from '@xyo-network/react-ethereum-gas-price-etherscan-plugin'
import { EthereumGasPriceEthgasstationPlugin } from '@xyo-network/react-ethereum-gas-price-ethgasstation-plugin'
import { EthereumGasPricePlugin } from '@xyo-network/react-ethereum-gas-price-plugin'
import { PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

export * from '@xyo-network/react-ethereum-gas-price-blocknative-plugin'
export * from '@xyo-network/react-ethereum-gas-price-etherchain-plugins'
export * from '@xyo-network/react-ethereum-gas-price-ethers-plugin'
export * from '@xyo-network/react-ethereum-gas-price-etherscan-plugin'
export * from '@xyo-network/react-ethereum-gas-price-ethgasstation-plugin'
export * from '@xyo-network/react-ethereum-gas-price-plugin'

export const EthereumGasPricePayloadPlugins: PayloadRenderPlugin[] = [
  EthereumGasPricePlugin,
  EthereumGasPriceEtherscanPlugin,
  EthereumGasPriceEthersPlugin,
  EthereumGasPriceEthgasstationPlugin,
  EthereumGasPriceBlocknativePlugin,
  ...EthereumGasPriceEtherchainPlugins,
]

// eslint-disable-next-line import/no-default-export
export default EthereumGasPricePayloadPlugins

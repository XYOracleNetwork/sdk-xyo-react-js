import { EthWallet } from '@xylabs/react-crypto'

export interface ActiveProvider {
  connectWallet?: EthWallet['connectWallet']
  icon?: string
  providerName?: string
}

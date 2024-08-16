import type { MetaMaskConnector } from '@xyo-network/metamask-connector'
import type { ContextExState } from '@xyo-network/react-shared'

export interface WalletServiceState extends ContextExState {
  metaMaskWallet: MetaMaskConnector
}

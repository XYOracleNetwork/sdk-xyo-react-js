import { MetaMaskConnector } from '@xyo-network/metamask-connector'
import { ContextExState } from '@xyo-network/react-shared'

export interface WalletServiceState extends ContextExState {
  metaMaskWallet: MetaMaskConnector
}

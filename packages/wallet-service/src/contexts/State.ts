import { ContextExState } from '@xyo-network/react-shared'
import { XyoMetaMaskConnector } from '@xyo-network/utils'

export interface WalletServiceState extends ContextExState {
  metaMaskWallet: XyoMetaMaskConnector
}

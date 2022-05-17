import { XyoMetaMaskConnector } from '@xyo-network/utils'

import { ContextExState } from '../../context-ex'

export interface WalletServiceState extends ContextExState {
  metaMaskWallet: XyoMetaMaskConnector
}

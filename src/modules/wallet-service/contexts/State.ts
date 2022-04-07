import { XyoMetaMaskConnector } from '@xyo-network/sdk-xyo-client-js'

import { ContextExState } from '../../context-ex'

export interface WalletServiceState extends ContextExState {
  metaMaskWallet: XyoMetaMaskConnector
}

import { XyoMetaMaskConnector } from '../../wallets'
import { ContextExState } from '../ContextEx'

export interface WalletServiceState extends ContextExState {
  metaMaskWallet: XyoMetaMaskConnector
}

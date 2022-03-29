import { XyoMetaMaskConnector } from '../../wallets'
import { WalletServiceState } from './State'

export const defaultState: WalletServiceState = {
  metaMaskWallet: new XyoMetaMaskConnector(),
  provided: true,
}

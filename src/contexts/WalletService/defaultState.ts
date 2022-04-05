import { XyoMetaMaskConnector } from '../../wallets'
import { WalletServiceState } from './State'

export const defaultState = (): WalletServiceState => {
  return {
    metaMaskWallet: new XyoMetaMaskConnector(),
    provided: true,
  }
}

import { XyoMetaMaskConnector } from '@xyo-network/utils'

import { WalletServiceState } from './State'

export const defaultState = (): WalletServiceState => {
  return {
    metaMaskWallet: new XyoMetaMaskConnector(),
    provided: true,
  }
}

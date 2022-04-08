import { XyoMetaMaskConnector } from '@xyo-network/sdk-xyo-client-js'

import { WalletServiceState } from './State'

export const defaultState = (): WalletServiceState => {
  return {
    metaMaskWallet: new XyoMetaMaskConnector(),
    provided: true,
  }
}

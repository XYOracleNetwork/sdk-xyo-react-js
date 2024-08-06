import { MetaMaskConnector } from '@xyo-network/metamask-connector'

import { WalletServiceState } from './State.ts'

export const defaultState = (): WalletServiceState => {
  return {
    metaMaskWallet: new MetaMaskConnector(),
    provided: true,
  }
}

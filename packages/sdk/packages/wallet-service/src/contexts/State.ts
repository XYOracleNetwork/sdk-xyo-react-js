import type { ContextExState } from '@xylabs/react-shared'
import type { MetaMaskConnector } from '@xyo-network/metamask-connector'

export type WalletServiceState = ContextExState<{
  metaMaskWallet: MetaMaskConnector
}>

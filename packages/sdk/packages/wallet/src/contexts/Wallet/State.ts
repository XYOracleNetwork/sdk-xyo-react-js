import type { ContextExState } from '@xylabs/react-shared'
import type { WalletInstance } from '@xyo-network/wallet-model'
import type { Dispatch } from 'react'

export type WalletContextState = ContextExState<{
  /** Currently selected account */
  activeAccount?: WalletInstance | null
  /** Currently selected index */
  activeAccountIndex?: number
  /** The root wallet being used */
  rootWallet?: WalletInstance | null
  /** Set currently selected index */
  setActiveAccountIndex?: Dispatch<number>
}>

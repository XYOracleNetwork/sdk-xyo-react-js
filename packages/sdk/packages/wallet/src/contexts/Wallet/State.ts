import type { ContextExState } from '@xyo-network/react-shared'
import type { WalletInstance } from '@xyo-network/wallet-model'
import type { Dispatch } from 'react'

export interface WalletContextState extends ContextExState {
  /** Currently selected account */
  activeAccount?: WalletInstance | null
  /** Currently selected index */
  activeAccountIndex?: number
  /** The root wallet being used */
  rootWallet?: WalletInstance | null
  /** Set currently selected index */
  setActiveAccountIndex?: Dispatch<number>
}

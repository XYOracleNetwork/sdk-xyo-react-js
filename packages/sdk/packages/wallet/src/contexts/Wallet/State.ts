import { ContextExState } from '@xyo-network/react-shared'
import { WalletInstance } from '@xyo-network/wallet-model'
import { Dispatch } from 'react'

export interface WalletContextState extends ContextExState {
  /** Currently selected account */
  activeAccount?: WalletInstance
  /** Currently selected index */
  activeAccountIndex?: number
  /** Base path from which the wallet was derived */
  basePath?: string
  /** The derived wallet being used */
  derivedWallet?: WalletInstance
  /** The root wallet being used */
  rootWallet?: WalletInstance
  /** Set currently selected index */
  setActiveAccountIndex?: Dispatch<number>
}

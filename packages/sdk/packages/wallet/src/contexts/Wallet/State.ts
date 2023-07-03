import { ContextExState } from '@xyo-network/react-shared'
import { WalletInstance } from '@xyo-network/wallet-model'
import { Dispatch } from 'react'

export interface WalletContextState extends ContextExState {
  /** Currently selected account */
  activeAccount?: WalletInstance | null
  /** Currently selected index */
  activeAccountIndex?: number
  /** Base path from which the wallet was derived */
  basePath?: string
  /** The coin_type derived wallet being used */
  coinTypeWallet?: WalletInstance | null
  /** The root wallet being used */
  rootWallet?: WalletInstance | null
  /** Set currently selected index */
  setActiveAccountIndex?: Dispatch<number>
}

import { HDWallet } from '@xyo-network/account'
import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch, SetStateAction } from 'react'

export interface WalletContextState extends ContextExState {
  activeAccountIndex?: number
  /** Base path from which the wallet was derived */
  basePath?: string
  setActiveAccountIndex?: Dispatch<number>
  setWallet?: Dispatch<SetStateAction<HDWallet | undefined>>
  wallet?: HDWallet
}

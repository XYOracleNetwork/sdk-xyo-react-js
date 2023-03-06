import { HDWallet } from '@xyo-network/account'
import { AccountInstance } from '@xyo-network/account-model'
import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch, SetStateAction } from 'react'

export interface WalletContextState extends ContextExState {
  activeAccountIndex?: number
  activeRootAccountPath?: string
  deriveRootAccount?: (path: string) => AccountInstance
  setActiveAccountIndex?: Dispatch<number>
  setWallet?: Dispatch<SetStateAction<HDWallet | undefined>>
  wallet?: HDWallet
}

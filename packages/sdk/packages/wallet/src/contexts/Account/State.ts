import { ContextExState } from '@xyo-network/react-shared'
import { WalletInstance } from '@xyo-network/wallet-model'
import { Dispatch } from 'react'

export interface AccountContextState extends ContextExState {
  account?: WalletInstance
  setAccount?: Dispatch<WalletInstance>
}

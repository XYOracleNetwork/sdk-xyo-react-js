import { AccountInstance } from '@xyo-network/account-model'
import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch } from 'react'

export interface AccountContextState extends ContextExState {
  account?: AccountInstance
  setAccount?: Dispatch<AccountInstance>
}

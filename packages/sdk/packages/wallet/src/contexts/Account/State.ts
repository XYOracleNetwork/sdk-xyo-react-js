import { Account } from '@xyo-network/account'
import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch } from 'react'

export interface AccountContextState extends ContextExState {
  account?: Account
  setAccount?: Dispatch<Account>
}

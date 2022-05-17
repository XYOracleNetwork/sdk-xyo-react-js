import { XyoAccount } from '@xyo-network/core'
import { Dispatch } from 'react'

import { ContextExState } from '../../../context-ex'

export interface AccountContextState extends ContextExState {
  account?: XyoAccount
  setAccount?: Dispatch<XyoAccount>
}

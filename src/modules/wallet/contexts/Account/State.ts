import { XyoAccount } from '@xyo-network/sdk-xyo-client-js'
import { Dispatch } from 'react'

import { ContextExState } from '../../../context-ex'

export interface AccountContextState extends ContextExState {
  account?: XyoAccount
  setAccount?: Dispatch<XyoAccount>
}

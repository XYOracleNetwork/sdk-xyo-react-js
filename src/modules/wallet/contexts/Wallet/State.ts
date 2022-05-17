import { XyoWalletBase } from '@xyo-network/core'
import { Dispatch } from 'react'

import { ContextExState } from '../../../context-ex'

export interface WalletContextState extends ContextExState {
  wallet?: XyoWalletBase
  setWallet?: Dispatch<XyoWalletBase>
  activeAccountIndex?: number
  setActiveAccountIndex?: Dispatch<number>
}

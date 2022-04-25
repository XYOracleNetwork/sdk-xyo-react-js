import { XyoAccount, XyoWalletBase } from '@xyo-network/sdk-xyo-client-js'
import { Dispatch } from 'react'

import { ContextExState } from '../../../context-ex'

export interface WalletContextState extends ContextExState {
  wallet?: XyoWalletBase
  setWallet?: Dispatch<XyoWalletBase>
  activeAccountIndex?: number
  activeAccount?: XyoAccount
  setActiveAccountIndex?: Dispatch<number>
}

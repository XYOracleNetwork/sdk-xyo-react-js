import { XyoWalletBase } from '@xyo-network/core'
import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch } from 'react'

export interface WalletContextState extends ContextExState {
  wallet?: XyoWalletBase
  setWallet?: Dispatch<XyoWalletBase>
  activeAccountIndex?: number
  setActiveAccountIndex?: Dispatch<number>
}

import { ContextExState } from '@xyo-network/react-shared'
import { XyoWalletBase } from '@xyo-network/wallet'
import { Dispatch } from 'react'

export interface WalletContextState extends ContextExState {
  wallet?: XyoWalletBase
  setWallet?: Dispatch<XyoWalletBase>
  activeAccountIndex?: number
  setActiveAccountIndex?: Dispatch<number>
}

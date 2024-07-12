import { assertEx } from '@xylabs/assert'
import { useContext } from 'react'

import { WalletServiceContext } from './Context.js'

export const useWalletService = () => {
  const context = useContext(WalletServiceContext)
  assertEx(context.metaMaskWallet, () => 'WalletServiceContext not initialized')
  //we do the cast to make the api non-optional
  return context
}

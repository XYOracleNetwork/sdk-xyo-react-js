import { assertEx } from '@xylabs/sdk-js'
import { use } from 'react'

import { WalletServiceContext } from './Context.ts'

export const useWalletService = () => {
  const context = use(WalletServiceContext)
  assertEx(context.metaMaskWallet, () => 'WalletServiceContext not initialized')
  // we do the cast to make the api non-optional
  return context
}

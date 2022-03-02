import { assertEx } from '@xylabs/sdk-js'
import { useContext } from 'react'

import { WalletServiceContext } from './Context'

const useWalletService = () => {
  const context = useContext(WalletServiceContext)
  assertEx(context.metaMaskWallet, 'WalletServiceContext not initialized')
  //we do the cast to make the api non-optional
  return context
}

export { useWalletService }

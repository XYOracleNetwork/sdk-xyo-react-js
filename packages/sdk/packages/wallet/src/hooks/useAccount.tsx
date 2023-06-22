import { HDWallet } from '@xyo-network/account'
import { DataLike } from '@xyo-network/core'
import { usePromise } from '@xyo-network/react-shared'
import { WalletInstance } from '@xyo-network/wallet-model'

import { useAccountFromContext } from '../contexts'

export interface AccountHookParams {
  account?: WalletInstance
  mnemonic?: string
  path?: string
  required?: boolean
  seed?: DataLike
}

export const useAccount = ({ mnemonic, account, path, required, seed }: AccountHookParams = {}) => {
  const [contextAccount] = useAccountFromContext(!account && required)
  const [activeAccount] = usePromise(
    async () => (account ?? mnemonic ? await HDWallet.fromMnemonic(mnemonic as string) : seed ? await HDWallet.fromSeed(seed) : contextAccount),
    [account, mnemonic, contextAccount, seed],
  )
  return usePromise(async () => (path ? await activeAccount?.derivePath?.(path) : activeAccount))
}

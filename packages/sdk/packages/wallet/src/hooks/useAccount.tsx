import { HDWallet } from '@xyo-network/account'
import { DataLike } from '@xyo-network/core'
import { usePromise } from '@xyo-network/react-shared'
import { WalletInstance } from '@xyo-network/wallet-model'
import { useState } from 'react'

import { useAccountFromContext } from '../contexts'

export interface AccountHookParams {
  account?: WalletInstance
  mnemonic?: string
  path?: string
  required?: boolean
  seed?: DataLike
}

export const useAccount = ({ mnemonic, account, path, required, seed }: AccountHookParams = {}): [WalletInstance | undefined, Error | undefined] => {
  const [error, setError] = useState<Error>()
  const [contextAccount] = useAccountFromContext(!account && required)
  const [activeAccount] = usePromise(async () => {
    try {
      const newAccount = await (() => {
        if (account) {
          return account
        } else if (mnemonic) {
          return HDWallet.fromMnemonic(mnemonic as string)
        } else if (seed) {
          return HDWallet.fromSeed(seed)
        }
        return contextAccount
      })()
      if (path) {
        return newAccount?.derivePath?.(path)
      } else {
        return newAccount
      }
    } catch (ex) {
      setError(ex as Error)
    }
  }, [account, mnemonic, contextAccount, seed, path])
  return [activeAccount, error]
}

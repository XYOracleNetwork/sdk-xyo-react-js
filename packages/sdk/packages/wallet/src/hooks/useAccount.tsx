import { AccountInstance } from '@xyo-network/account-model'
import { usePromise } from '@xyo-network/react-shared'
import { WalletInstance } from '@xyo-network/wallet-model'
import { useState } from 'react'

import { useContextAccount } from '../contexts'

export interface AccountHookParams {
  account?: AccountInstance
  path?: string
  required?: boolean
  wallet?: WalletInstance
}

export const useAccount = ({ wallet, account, path, required = false }: AccountHookParams = {}): [AccountInstance | undefined, Error | undefined] => {
  let validationError: Error | undefined = undefined
  if (wallet && account) {
    validationError = Error('useAccount can not have both a wallet and an account in the parameters')
  }

  if (path && account) {
    validationError = Error('useAccount can not have both a path and an account in the parameters')
  }
  const [error, setError] = useState<Error>()
  const [contextAccount] = useContextAccount(!(account || wallet) && required)
  const [activeAccount] = usePromise(async () => {
    try {
      if (!validationError) {
        if (wallet) {
          if (path) {
            return await wallet?.derivePath?.(path)
          } else {
            return wallet
          }
        } else {
          return contextAccount
        }
      }
    } catch (ex) {
      setError(ex as Error)
    }
  }, [path, wallet, contextAccount, validationError])
  if (validationError && !error) {
    setError(validationError)
  }
  return [error ? undefined : activeAccount, error]
}

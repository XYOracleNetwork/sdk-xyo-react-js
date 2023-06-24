import { AccountInstance } from '@xyo-network/account-model'
import { usePromise } from '@xyo-network/react-shared'
import { WalletInstance } from '@xyo-network/wallet-model'
import { useState } from 'react'

import { useContextAccount } from '../../../..'

export interface AccountHookParams {
  account?: AccountInstance
  path?: string
  required?: boolean
  wallet?: WalletInstance
}

export const useAccount = ({ wallet, account, path, required = false }: AccountHookParams = {}): [AccountInstance | undefined, Error | undefined] => {
  const [validationError, setValidationError] = useState<Error>()
  if (wallet && account && !validationError) {
    setValidationError(Error('useAccount can not have both a wallet and an account in the parameters'))
  }

  if (path && account && !validationError) {
    setValidationError(Error('useAccount can not have both a path and an account in the parameters'))
  }
  const [error, setError] = useState<Error>()
  const [contextAccount] = useContextAccount(!(account || wallet) && required)
  const [activeAccount] = usePromise(async () => {
    console.log('useAccount:activeAccount:usePromise')
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
      const error = ex as Error
      console.error(error.message)
      setError(error)
    }
  }, [path, wallet, contextAccount, validationError])
  if (validationError && !error) {
    console.error(validationError.message)
    setError(validationError)
  }

  return [error ? undefined : activeAccount, error]
}

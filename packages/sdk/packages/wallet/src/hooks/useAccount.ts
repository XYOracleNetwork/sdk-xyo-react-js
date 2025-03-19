import { usePromise } from '@xylabs/react-promise'
import type { AccountInstance } from '@xyo-network/account-model'
import type { WalletInstance } from '@xyo-network/wallet-model'
import { useState } from 'react'

import {
  useRootWallet, useWalletContext, useWalletProvided,
} from '../contexts/index.ts'

export interface AccountHookParams {
  account?: AccountInstance
  index?: number
  required?: boolean
  wallet?: WalletInstance
}

export const useAccount = ({
  wallet, account, index, required = false,
}: AccountHookParams = {}): [
  AccountInstance | null | undefined,
  Error | undefined,
] => {
  const walletContextProvided = useWalletProvided()
  const [validationError, setValidationError] = useState<Error>()
  if (wallet && account && !validationError) {
    setValidationError(new Error('useAccount can not have both a wallet and an account in the parameters'))
  }

  if (index && account && !validationError) {
    setValidationError(new Error('useAccount can not have both a index and an account in the parameters'))
  }

  const [error, setError] = useState<Error>()
  const [rootWallet] = useRootWallet(!wallet && required)
  const { activeAccountIndex } = useWalletContext(false)
  const [activeAccount] = usePromise(async () => {
    try {
      if (!validationError) {
        if (wallet) {
          const path = `${index ?? 0}'\0`
          return await wallet?.derivePath?.(path)
        } else if (rootWallet) {
          const path = `${index ?? activeAccountIndex ?? 0}'\/0`
          return await rootWallet?.derivePath?.(path)
        }
      }
    } catch (ex) {
      const error = ex as Error
      console.error(error.message)
      setError(error)
    }
  }, [index, wallet, rootWallet, activeAccountIndex, validationError])
  if (validationError && !error) {
    console.error(validationError.message)
    setError(validationError)
  }

  return [
    error
      ? undefined
      : (account ?? activeAccount ?? walletContextProvided)
          ? null
          : undefined,
    error,
  ]
}

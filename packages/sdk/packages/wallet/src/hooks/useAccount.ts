import { usePromise } from '@xylabs/react-promise'
import { AccountInstance } from '@xyo-network/account-model'
import { WalletInstance } from '@xyo-network/wallet-model'
import { useState } from 'react'

import { useCoinTypeWallet, useWalletContext, useWalletProvided } from '../contexts'

export interface AccountHookParams {
  account?: AccountInstance
  index?: number
  required?: boolean
  wallet?: WalletInstance
}

export const useAccount = ({ wallet, account, index, required = false }: AccountHookParams = {}): [
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
  const [coinTypeWallet] = useCoinTypeWallet(!wallet && required)
  const { activeAccountIndex } = useWalletContext(false)
  const [activeAccount] = usePromise(async () => {
    try {
      if (!validationError) {
        if (wallet) {
          return await wallet?.derivePath?.(`${index ?? 0}'\0`)
        } else if (coinTypeWallet) {
          return await coinTypeWallet?.derivePath?.(`${index ?? activeAccountIndex ?? 0}'\0`)
        }
      }
    } catch (ex) {
      const error = ex as Error
      console.error(error.message)
      setError(error)
    }
  }, [index, wallet, coinTypeWallet, activeAccountIndex, validationError])
  if (validationError && !error) {
    console.error(validationError.message)
    setError(validationError)
  }

  return [
    error ? undefined
    : account ?? activeAccount ?? walletContextProvided ? null
    : undefined,
    error,
  ]
}

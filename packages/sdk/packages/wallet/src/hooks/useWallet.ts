import { usePromise } from '@xylabs/react-promise'
import { HDWallet } from '@xyo-network/account'
import { WalletInstance } from '@xyo-network/wallet-model'
import { useState } from 'react'

import { useSelectedWalletAccount, useWalletProvided } from '../contexts'

export interface WalletHookParams {
  mnemonic?: string
  path?: string
  required?: boolean
  seed?: Uint8Array | string
  wallet?: WalletInstance | null
}

export const useWallet = ({ mnemonic, wallet, path, required = false, seed }: WalletHookParams = {}): [
  WalletInstance | null | undefined,
  Error | undefined,
] => {
  const walletContextProvided = useWalletProvided()
  const [error, setError] = useState<Error>()
  const [contextAccount] = useSelectedWalletAccount(!wallet && required)
  const [activeAccount] = usePromise(async () => {
    try {
      const newAccount = await (() => {
        if (wallet) {
          return wallet
        } else if (mnemonic) {
          return HDWallet.fromPhrase(mnemonic)
        } else if (seed) {
          return HDWallet.fromSeed(seed)
        }
        return contextAccount
      })()

      if (path) {
        return newAccount?.derivePath?.(path)
      } else {
        return newAccount ?? wallet
      }
    } catch (ex) {
      setError(ex as Error)
    }
  }, [mnemonic, contextAccount, seed, path, wallet])
  return [activeAccount ?? (walletContextProvided ? null : activeAccount), error]
}

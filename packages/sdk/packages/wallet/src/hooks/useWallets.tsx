import { usePromise } from '@xylabs/react-promise'
import { WalletInstance } from '@xyo-network/wallet-model'

import { useWallet } from './useWallet'

export interface WalletsHookParams {
  paths: string[]
  wallet?: WalletInstance
}

export const useWallets = ({ wallet, paths }: WalletsHookParams): [WalletInstance[] | undefined, Error | undefined] => {
  const [foundWallet] = useWallet({ wallet })
  const [wallets, error] = usePromise(
    () => (foundWallet ? Promise.all(paths.map((path) => foundWallet.derivePath(path))) : undefined),
    [foundWallet, paths],
  )
  return [wallets, error]
}

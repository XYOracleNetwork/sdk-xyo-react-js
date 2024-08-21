import { usePromise } from '@xylabs/react-promise'
import type { WalletInstance } from '@xyo-network/wallet-model'

import { useWalletContext } from '../contexts/index.ts'
import { useWallet } from './useWallet.ts'

export interface WalletsHookParams {
  paths: string[]
  wallet?: WalletInstance | null
}

export const useWallets = ({
  wallet, paths,
}: WalletsHookParams): [WalletInstance[] | null | undefined, Error | undefined] => {
  const walletContextProvided = useWalletContext(false)
  const [foundWallet] = useWallet({ wallet })
  const [wallets, error] = usePromise(
    async () => (foundWallet ? await Promise.all(paths.map(path => foundWallet.derivePath(path))) : undefined),
    [foundWallet, paths],
  )
  return [wallets ?? (walletContextProvided ? null : wallets), error]
}

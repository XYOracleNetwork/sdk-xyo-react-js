import { usePromise } from '@xylabs/react-promise'
import { WalletInstance } from '@xyo-network/wallet-model'

import { useWalletContext } from '../contexts'
import { useWallet } from './useWallet'

export interface WalletsHookParams {
  paths: string[]
  wallet?: WalletInstance | null
}

export const useWallets = ({ wallet, paths }: WalletsHookParams): [WalletInstance[] | null | undefined, Error | undefined] => {
  const walletContextProvided = useWalletContext(false)
  const [foundWallet] = useWallet({ wallet })
  const [wallets, error] = usePromise(
    async () => (foundWallet ? await Promise.all(paths.map((path) => foundWallet.derivePath(path))) : undefined),
    [foundWallet, paths],
  )
  return [wallets ?? (walletContextProvided ? null : wallets), error]
}

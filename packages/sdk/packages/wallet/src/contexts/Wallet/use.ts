import { useContextEx, usePromise } from '@xyo-network/react-shared'
import { WalletInstance } from '@xyo-network/wallet-model'

import { WalletContext } from './Context'

export const useWalletContext = (required = true) => {
  return useContextEx(WalletContext, 'WalletContext', required)
}

export const useContextWallet = (required = true): [WalletInstance | undefined] => {
  const { derivedWallet } = useWalletContext(required)
  return [derivedWallet]
}

export const useIndexedWalletFromContext = (index: number, required = true): [WalletInstance | undefined] => {
  const [wallet] = useContextWallet(required)
  const [account] = usePromise(() => wallet?.derivePath(index.toString()), [wallet, index])
  return [account]
}

export const useSelectedWalletAccount = (required = true): [WalletInstance | undefined] => {
  const { activeAccountIndex } = useWalletContext(required)
  //we pass in 0 as default since we can not call the hook optionally,
  //we resolve this false result by checking whether activeAccountIndex is defined before returning it
  const [account] = useIndexedWalletFromContext(activeAccountIndex ?? 0)
  return [activeAccountIndex !== undefined ? account : undefined]
}

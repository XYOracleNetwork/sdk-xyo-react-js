import { usePromise } from '@xylabs/react-promise'
import { useContextEx } from '@xyo-network/react-shared'
import { WalletInstance } from '@xyo-network/wallet-model'

import { WalletContext } from './Context'

export const useWalletContext = (required = true) => {
  return useContextEx(WalletContext, 'Wallet', required)
}

export const useCoinTypeWallet = (required = true): [WalletInstance | undefined, Error | undefined] => {
  const { coinTypeWallet } = useWalletContext(required)
  return [coinTypeWallet, undefined]
}

export const useRootWallet = (required = true): [WalletInstance | undefined, Error | undefined] => {
  const { rootWallet } = useWalletContext(required)
  return [rootWallet, undefined]
}

export const useIndexedWalletFromContext = (index: number, required = true): [WalletInstance | undefined, Error | undefined] => {
  const [coinTypeWallet] = useCoinTypeWallet(required)
  const [wallet] = usePromise(() => coinTypeWallet?.derivePath(index.toString()), [coinTypeWallet, index])
  return [wallet, undefined]
}

export const useSelectedWalletAccount = (required = true): [WalletInstance | undefined, Error | undefined] => {
  const { activeAccountIndex } = useWalletContext(required)
  //we pass in 0 as default since we can not call the hook optionally,
  //we resolve this false result by checking whether activeAccountIndex is defined before returning it
  const [account] = useIndexedWalletFromContext(activeAccountIndex ?? 0, required)
  return [activeAccountIndex !== undefined ? account : undefined, undefined]
}

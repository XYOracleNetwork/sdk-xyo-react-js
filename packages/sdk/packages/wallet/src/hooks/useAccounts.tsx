import { usePromise } from '@xyo-network/react-shared'
import { WalletInstance } from '@xyo-network/wallet-model'

import { useAccountFromContext } from '../contexts'

export interface AccountsHookParams {
  account?: WalletInstance
  paths?: string[]
  required?: boolean
}

export const useAccounts = ({ account, paths, required }: AccountsHookParams = {}) => {
  const [contextAccount] = useAccountFromContext(!account && required)
  const activeAccount = account ?? contextAccount
  return usePromise(async () => (paths ? await Promise.all(paths.map((path) => activeAccount?.derivePath?.(path))) : activeAccount))
}

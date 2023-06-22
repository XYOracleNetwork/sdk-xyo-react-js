import { AccountInstance } from '@xyo-network/account-model'
import { usePromise } from '@xyo-network/react-shared'

import { useAccountFromContext } from '../contexts'

export interface AccountsHookParams {
  account?: AccountInstance
  paths?: string[]
  required?: boolean
}

export const useAccounts = ({ account, paths, required }: AccountsHookParams = {}) => {
  const [contextAccount] = useAccountFromContext(!account && required)
  const activeAccount = account ?? contextAccount
  return usePromise(async () => (paths ? await Promise.all(paths.map((path) => activeAccount?.derivePath?.(path))) : activeAccount))
}

import { AccountInstance } from '@xyo-network/account-model'
import { usePromise } from '@xyo-network/react-shared'

import { useAccountFromContext } from '../contexts'

export interface AccountHookParams {
  account?: AccountInstance
  path?: string
  required?: boolean
}

export const useAccount = ({ account, path, required }: AccountHookParams = {}) => {
  const [contextAccount] = useAccountFromContext(!account && required)
  const activeAccount = account ?? contextAccount
  return usePromise(async () => (path ? await activeAccount?.derivePath?.(path) : activeAccount))
}

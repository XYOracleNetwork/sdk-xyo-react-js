import { usePromise } from '@xyo-network/react-shared'
import { WalletInstance } from '@xyo-network/wallet-model'

import { useAccountFromContext } from '../contexts'

export interface AccountHookParams {
  account?: WalletInstance
  path?: string
  required?: boolean
}

export const useAccount = ({ account, path, required }: AccountHookParams = {}) => {
  const [contextAccount] = useAccountFromContext(!account && required)
  const activeAccount = account ?? contextAccount
  return usePromise(async () => (path ? await activeAccount?.derivePath?.(path) : activeAccount))
}

import { useContextEx } from '@xyo-network/react-shared'

import { AccountContext } from './Context'

export const useAccountFromContext = (required = false) => {
  const { account } = useContextEx(AccountContext, 'Account', required)
  return [account]
}

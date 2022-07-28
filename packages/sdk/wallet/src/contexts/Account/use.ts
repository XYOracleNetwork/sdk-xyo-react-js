import { useContextEx } from '@xyo-network/react-shared'

import { AccountContext } from './Context'

export const useAccount = (required = false) => {
  return useContextEx(AccountContext, 'Account', required)
}

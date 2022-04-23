import { useContextEx } from '../../../context-ex'
import { AccountContext } from './Context'

export const useAccount = (required = false) => {
  return useContextEx(AccountContext, 'Account', required)
}

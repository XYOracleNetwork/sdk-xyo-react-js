import { useContextEx } from '../ContextEx'
import { NetworkContext } from './Context'

export const useNetwork = (required = false) => {
  return useContextEx(NetworkContext, 'Network', required)
}

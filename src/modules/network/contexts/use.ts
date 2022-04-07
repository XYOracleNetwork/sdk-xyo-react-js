import { useContextEx } from '../../context-ex'
import { NetworkContext } from './Context'
import { NetworkContextState } from './State'

export const useNetwork = (required = false) => {
  return useContextEx<NetworkContextState>(NetworkContext, 'Network', required)
}

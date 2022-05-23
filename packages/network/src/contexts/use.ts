import { useContextEx } from '@xyo-network/react-shared'

import { NetworkContext } from './Context'
import { NetworkContextState } from './State'

export const useNetwork = (required = false) => {
  return useContextEx<NetworkContextState>(NetworkContext, 'Network', required)
}

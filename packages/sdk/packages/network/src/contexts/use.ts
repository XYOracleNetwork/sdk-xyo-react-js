import { useContextEx } from '@xyo-network/react-shared'

import { NetworkContext } from './Context.js'
import { NetworkContextState } from './State.js'

export const useNetwork = (required = false) => {
  return useContextEx<NetworkContextState>(NetworkContext, 'Network', required)
}

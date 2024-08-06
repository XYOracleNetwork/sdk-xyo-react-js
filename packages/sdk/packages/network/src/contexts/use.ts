import { useContextEx } from '@xyo-network/react-shared'

import { NetworkContext } from './Context.ts'
import { NetworkContextState } from './State.ts'

export const useNetwork = (required = false) => {
  return useContextEx<NetworkContextState>(NetworkContext, 'Network', required)
}

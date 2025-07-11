import { useContextEx } from '@xylabs/react-shared'

import { NetworkContext } from './Context.ts'
import type { NetworkContextState } from './State.ts'

export const useNetwork = (required = false) => {
  return useContextEx<NetworkContextState>(NetworkContext, 'Network', required)
}

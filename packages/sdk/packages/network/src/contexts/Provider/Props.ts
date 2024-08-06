import { NetworkPayload } from '@xyo-network/network'

import { NetworkNames } from '../../lib/index.ts'

export interface NetworkProviderProps {
  /** @deprecated use defaultNetworkConfig instead */
  defaultNetwork?: NetworkPayload
  defaultNetworkConfig?: NetworkPayload
  defaultNetworkName?: NetworkNames
}

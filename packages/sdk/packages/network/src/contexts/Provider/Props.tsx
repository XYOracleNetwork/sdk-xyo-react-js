import { NetworkPayload } from '@xyo-network/network'

import { NetworkNames } from '../../lib'

export interface NetworkProviderProps {
  /** @deprecated use defaultNetworkConfig instead */
  defaultNetwork?: NetworkPayload
  defaultNetworkConfig?: NetworkPayload
  defaultNetworkName?: NetworkNames
}

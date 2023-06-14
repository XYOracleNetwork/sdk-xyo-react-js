import { NetworkPayload } from '@xyo-network/network'

import { XyoNetworkNames } from '../../lib'

export interface NetworkProviderProps {
  /** @deprecated use defaultNetworkConfig instead */
  defaultNetwork?: NetworkPayload
  defaultNetworkConfig?: NetworkPayload
  defaultNetworkName?: XyoNetworkNames
}

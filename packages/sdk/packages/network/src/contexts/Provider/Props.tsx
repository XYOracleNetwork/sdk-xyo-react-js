import { XyoNetworkPayload } from '@xyo-network/network'

import { XyoNetworkNames } from '../../lib'

export interface NetworkProviderProps {
  /** @deprecated use defaultNetworkConfig instead */
  defaultNetwork?: XyoNetworkPayload
  defaultNetworkConfig?: XyoNetworkPayload
  defaultNetworkName?: XyoNetworkNames
}

import type { NetworkPayload, NetworkSchema } from '@xyo-network/network'

import type { NetworkNames } from '../../lib/index.ts'

export interface NetworkProviderProps {
  /** @deprecated use defaultNetworkConfig instead */
  defaultNetwork?: (Omit<NetworkPayload, 'schema'> & { schema: NetworkSchema })
  defaultNetworkConfig?: (Omit<NetworkPayload, 'schema'> & { schema: NetworkSchema })
  defaultNetworkName?: NetworkNames
}

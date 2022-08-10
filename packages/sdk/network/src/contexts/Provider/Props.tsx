import { XyoNetworkPayload } from '@xyo-network/network'

export interface NetworkProviderProps {
  /** @deprecated use defaultNetworkConfig instead */
  defaultNetwork?: XyoNetworkPayload
  defaultNetworkConfig?: XyoNetworkPayload
  defaultNetworkName?: 'Kerplunk' | 'Main' | 'Local'
}

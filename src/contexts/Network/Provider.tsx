import { useState } from 'react'

import { XyoNetworkPreset } from '../../lib'
import { NetworkContext } from './Context'

export interface NetworkProviderProps {
  defaultNetwork?: XyoNetworkPreset
}

export const NetworkProvider: React.FC<NetworkProviderProps> = ({ defaultNetwork, ...props }) => {
  const [network, setNetwork] = useState<XyoNetworkPreset>()

  return (
    <NetworkContext.Provider value={{ network: network ?? defaultNetwork, provided: true, setNetwork }} {...props} />
  )
}

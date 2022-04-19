import { WithChildren } from '@xylabs/sdk-react'
import { useState } from 'react'

import { defaultNetworkConfigs } from '../../lib'
import { NetworkContext } from '../Context'
import { NetworkProviderProps } from './Props'

export const NetworkMemoryProvider: React.FC<WithChildren<NetworkProviderProps>> = ({ defaultNetwork, ...props }) => {
  const [network, setNetwork] = useState(defaultNetwork ?? defaultNetworkConfigs[0])

  return <NetworkContext.Provider value={{ network: network, networks: defaultNetworkConfigs, provided: true, setNetwork }} {...props} />
}

/** @deprecated use NetworkMemoryProvider instead */
export const NetworkProvider = NetworkMemoryProvider

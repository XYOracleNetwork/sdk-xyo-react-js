import { WithChildren } from '@xylabs/react-shared'
import { useState } from 'react'

import { defaultNetworkConfigs } from '../../lib/index.js'
import { NetworkContext } from '../Context.js'
import { NetworkProviderProps } from './Props.js'

export const NetworkMemoryProvider: React.FC<WithChildren<NetworkProviderProps>> = ({ defaultNetworkConfig, defaultNetworkName, ...props }) => {
  if (defaultNetworkConfig && defaultNetworkName) {
    console.warn('Both defaultNetworkConfig and defaultNetworkName were passed to provider. Falling back to defaultNetworkConfig')
  }

  const resolvedDefaultNetworkConfig = defaultNetworkName ? defaultNetworkConfigs.find(config => config.name === defaultNetworkName) : undefined

  const [network, setNetwork] = useState(defaultNetworkConfig ?? resolvedDefaultNetworkConfig ?? defaultNetworkConfigs[0])

  return <NetworkContext.Provider value={{ network, networks: defaultNetworkConfigs, provided: true, setNetwork }} {...props} />
}

/** @deprecated use NetworkMemoryProvider instead */
export const NetworkProvider = NetworkMemoryProvider

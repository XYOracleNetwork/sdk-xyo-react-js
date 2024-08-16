import type { WithChildren } from '@xylabs/react-shared'
import React, { useMemo, useState } from 'react'

import { defaultNetworkConfigs } from '../../lib/index.ts'
import { NetworkContext } from '../Context.ts'
import type { NetworkProviderProps } from './Props.ts'

export const NetworkMemoryProvider: React.FC<WithChildren<NetworkProviderProps>> = ({ defaultNetworkConfig, defaultNetworkName, ...props }) => {
  if (defaultNetworkConfig && defaultNetworkName) {
    console.warn('Both defaultNetworkConfig and defaultNetworkName were passed to provider. Falling back to defaultNetworkConfig')
  }

  const resolvedDefaultNetworkConfig = defaultNetworkName ? defaultNetworkConfigs.find(config => config.name === defaultNetworkName) : undefined

  const [network, setNetwork] = useState(defaultNetworkConfig ?? resolvedDefaultNetworkConfig ?? defaultNetworkConfigs[0])

  const value = useMemo(() => ({ network, networks: defaultNetworkConfigs, provided: true, setNetwork }), [network, setNetwork])

  return <NetworkContext.Provider value={value} {...props} />
}

/** @deprecated use NetworkMemoryProvider instead */
export const NetworkProvider = NetworkMemoryProvider

import type { PropsWithChildren } from 'react'
import React, { useMemo, useState } from 'react'

import { defaultNetworkConfigs } from '../../lib/index.ts'
import { NetworkContext } from '../Context.ts'
import type { NetworkContextState } from '../State.ts'
import type { NetworkProviderProps } from './Props.ts'

export const NetworkMemoryProvider: React.FC<PropsWithChildren<NetworkProviderProps>> = ({
  defaultNetworkConfig, defaultNetworkName, ...props
}) => {
  if (defaultNetworkConfig && defaultNetworkName) {
    console.warn('Both defaultNetworkConfig and defaultNetworkName were passed to provider. Falling back to defaultNetworkConfig')
  }

  const resolvedDefaultNetworkConfig = defaultNetworkName ? defaultNetworkConfigs.find(config => config.name === defaultNetworkName) : undefined

  const [network, setNetwork] = useState(defaultNetworkConfig ?? resolvedDefaultNetworkConfig ?? defaultNetworkConfigs[0])

  const value: NetworkContextState = useMemo(() => ({
    network, networks: defaultNetworkConfigs, provided: true, setNetwork,
  }), [network, setNetwork])

  return <NetworkContext value={value} {...props} />
}

/** @deprecated use NetworkMemoryProvider instead */
export const NetworkProvider = NetworkMemoryProvider

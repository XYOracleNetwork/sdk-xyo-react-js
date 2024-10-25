import type { NetworkPayload } from '@xyo-network/network'
import type { PropsWithChildren } from 'react'
import React, { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { defaultNetworkConfigs, findNetworkConfig } from '../../lib/index.ts'
import { NetworkContext } from '../Context.ts'
import { useNetwork } from '../use.ts'
import { NetworkMemoryProvider } from './Memory.tsx'
import type { NetworkProviderProps } from './Props.ts'

const NetworkRouteProviderInner: React.FC<PropsWithChildren> = ({ children }) => {
  const { network, setNetwork } = useNetwork()

  const [params, setParams] = useSearchParams()

  const slug = params.get('network')
  const routeNetwork = slug ? findNetworkConfig(slug) : undefined

  // update the network stored in the route
  const setNetworkParam = useCallback(
    (network?: NetworkPayload) => {
      if (network) {
        params.set('network', network.slug)
        setParams(params, { replace: true })
        setNetwork?.(network)
      } else {
        params.delete('network')
      }
    },
    [params, setParams, setNetwork],
  )

  // if the network is actively changed, update both memory and route
  const setNetworkLocal = useCallback(
    (network: NetworkPayload) => {
      setNetworkParam(network)
      setNetwork?.(network)
    },
    [setNetworkParam, setNetwork],
  )

  // sync memory and route storage of network
  const initialized = useMemo(() => {
    if (routeNetwork !== network) {
      if (routeNetwork === undefined && network !== undefined) {
        // if the route does not have a network selected, use what is in the memory context
        setNetworkParam(network)
      } else if (routeNetwork) {
        // if the route has a selection and it is different from memory, update memory
        setNetwork?.(routeNetwork)
      }
    }
    return true
  }, [routeNetwork, network, setNetworkParam, setNetwork])

  return (
    // eslint-disable-next-line @eslint-react/no-unstable-context-value
    <NetworkContext.Provider value={{
      network, networks: defaultNetworkConfigs, provided: true, setNetwork: setNetworkLocal,
    }}
    >
      {initialized ? children : null}
    </NetworkContext.Provider>
  )
}

export const NetworkRouteProvider: React.FC<PropsWithChildren<NetworkProviderProps>> = ({
  defaultNetworkConfig, defaultNetworkName, ...props
}) => {
  return (
    <NetworkMemoryProvider defaultNetworkConfig={defaultNetworkConfig} defaultNetworkName={defaultNetworkName}>
      <NetworkRouteProviderInner {...props} />
    </NetworkMemoryProvider>
  )
}

import { WithChildren } from '@xylabs/react-shared'
import { NetworkPayload } from '@xyo-network/network'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom-6'

import { defaultNetworkConfigs, findNetworkConfig } from '../../lib'
import { NetworkContext } from '../Context'
import { useNetwork } from '../use'
import { NetworkMemoryProvider } from './Memory'
import { NetworkProviderProps } from './Props'

const NetworkRouteProviderInner: React.FC<WithChildren> = ({ children }) => {
  const [initialized, setInitialized] = useState(false)
  const { network, setNetwork } = useNetwork()

  const [params, setParams] = useSearchParams()

  const slug = params.get('network')
  const routeNetwork = slug ? findNetworkConfig(slug) : undefined

  //update the network stored in the route
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

  //if the network is actively changed, update both memory and route
  const setNetworkLocal = useCallback(
    (network: NetworkPayload) => {
      setNetworkParam(network)
      setNetwork?.(network)
    },
    [setNetworkParam, setNetwork],
  )

  //sync memory and route storage of network
  useEffect(() => {
    if (routeNetwork !== network) {
      if (routeNetwork === undefined && network !== undefined) {
        //if the route does not have a network selected, use what is in the memory context
        setNetworkParam(network)
      } else if (routeNetwork) {
        //if the route has a selection and it is different from memory, update memory
        setNetwork?.(routeNetwork)
      }
    }
    setInitialized(true)
  }, [routeNetwork, network, setNetworkParam, setNetwork])

  return (
    <NetworkContext.Provider value={{ network, networks: defaultNetworkConfigs, provided: true, setNetwork: setNetworkLocal }}>
      {initialized ? children : null}
    </NetworkContext.Provider>
  )
}

export const NetworkRouteProvider: React.FC<WithChildren<NetworkProviderProps>> = ({ defaultNetworkConfig, defaultNetworkName, ...props }) => {
  return (
    <NetworkMemoryProvider defaultNetworkConfig={defaultNetworkConfig} defaultNetworkName={defaultNetworkName}>
      <NetworkRouteProviderInner {...props} />
    </NetworkMemoryProvider>
  )
}

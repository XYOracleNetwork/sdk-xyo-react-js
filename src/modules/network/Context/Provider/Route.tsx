import { useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { defaultNetworkConfigs, findNetworkConfig, XyoNetworkConfig } from '../../lib'
import { NetworkContext } from '../Context'
import { useNetwork } from '../use'
import { NetworkMemoryProvider } from './Memory'
import { NetworkProviderProps } from './Props'

const NetworkRouteProviderInner: React.FC = ({ children }) => {
  const { network, setNetwork } = useNetwork()

  const [params, setParams] = useSearchParams()

  const slug = params.get('network')
  const routeNetwork = slug ? findNetworkConfig(slug) : undefined

  //update the network stored in the route
  const setNetworkParam = useCallback(
    (network?: XyoNetworkConfig) => {
      if (network) {
        params.set('network', network.slug)
        setParams(params, { replace: true })
        setNetwork?.(network)
      } else {
        params.delete('network')
      }
    },
    [params, setParams, setNetwork]
  )

  //if the network is actively changed, update both memory and route
  const setNetworkLocal = useCallback(
    (network: XyoNetworkConfig) => {
      setNetworkParam(network)
      setNetwork?.(network)
    },
    [setNetworkParam, setNetwork]
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
  }, [routeNetwork, network, setNetworkParam, setNetwork])

  return (
    <NetworkContext.Provider
      value={{ network, networks: defaultNetworkConfigs, provided: true, setNetwork: setNetworkLocal }}
    >
      {children}
    </NetworkContext.Provider>
  )
}

export const NetworkRouteProvider: React.FC<NetworkProviderProps> = ({ defaultNetwork, ...props }) => {
  return (
    <NetworkMemoryProvider defaultNetwork={defaultNetwork}>
      <NetworkRouteProviderInner {...props} />
    </NetworkMemoryProvider>
  )
}

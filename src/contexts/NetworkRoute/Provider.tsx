import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { findNetworkPreset, XyoNetworkPreset } from '../../lib'
import { NetworkContext } from '../Network'

export const NetworkRouteProvider: React.FC = ({ children }) => {
  const [network, setNetwork] = useState<XyoNetworkPreset>()

  const [params, setParams] = useSearchParams()

  const setNetworkParam = useCallback(
    (network?: XyoNetworkPreset) => {
      console.log(`set: ${network?.slug}`)
      if (network) {
        params.set('network', network.slug)
        setParams(params)
        setNetwork(network)
      } else {
        params.delete('network')
      }
    },
    [params, setParams]
  )

  const setNetworkLocal = useCallback(
    (network?: XyoNetworkPreset) => {
      setNetworkParam(network)
      setNetwork(network)
    },
    [setNetworkParam]
  )

  const slug = params.get('network')
  const routeNetwork = slug ? findNetworkPreset(slug) : undefined

  useEffect(() => {
    if (routeNetwork !== network) {
      if (routeNetwork === undefined && network !== undefined) {
        setNetworkParam(network)
      } else {
        setNetwork(routeNetwork)
      }
    }
  }, [routeNetwork, network, setNetworkParam])

  return (
    <NetworkContext.Provider value={{ network, provided: true, setNetwork: setNetworkLocal }}>
      {children}
    </NetworkContext.Provider>
  )
}

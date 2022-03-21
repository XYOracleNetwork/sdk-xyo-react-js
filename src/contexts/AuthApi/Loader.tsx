import { XyoAuthApi, XyoMetaMaskConnector } from '@xyo-network/sdk-xyo-client-js'
import { useEffect, useState } from 'react'

import { AuthApiContext } from './Context'

interface AuthApiLoaderProps {
  apiDomain: string
  required?: boolean
}

/**
 * @deprecated Auth is now in the archivist context
 */
export const AuthApiLoader: React.FC<AuthApiLoaderProps> = ({ required = false, children, apiDomain }) => {
  const [AuthApi, setAuthApi] = useState<XyoAuthApi>()
  const [MetaMaskService, setMetaMaskService] = useState<XyoMetaMaskConnector>()

  useEffect(() => {
    setAuthApi(XyoAuthApi.get({ apiDomain }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (AuthApi) {
      setMetaMaskService(XyoMetaMaskConnector.get({ AuthApiService: AuthApi }))
    }
  }, [AuthApi])

  return (
    <AuthApiContext.Provider value={{ AuthApi, MetaMaskService }}>
      {AuthApi && MetaMaskService ? children : required ? null : children}
    </AuthApiContext.Provider>
  )
}

import { XyoAuthApi, XyoMetaMaskConnector } from '@xyo-network/sdk-xyo-client-js'
import { useEffect, useState } from 'react'

import { getApiDomain } from '../../lib'
import { AuthApiContext } from './Context'

export const AuthApiLoader: React.FC = ({ children }) => {
  const [AuthApi, setAuthApi] = useState<XyoAuthApi>()
  const [MetaMaskService, setMetaMaskService] = useState<XyoMetaMaskConnector>()

  useEffect(() => {
    setAuthApi(XyoAuthApi.get({ apiDomain: getApiDomain() }))
  }, [])

  useEffect(() => {
    if (AuthApi) {
      setMetaMaskService(XyoMetaMaskConnector.get({ AuthApiService: AuthApi }))
    }
  }, [AuthApi])

  return (
    <AuthApiContext.Provider value={{ AuthApi, MetaMaskService }}>
      {AuthApi && MetaMaskService ? children : null}
    </AuthApiContext.Provider>
  )
}

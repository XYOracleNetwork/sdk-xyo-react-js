import { XyoArchivistApi, XyoAuthApi } from '@xyo-network/sdk-xyo-client-js'
import { useEffect, useState } from 'react'

import { ArchivistApiContext } from './Context'

export interface ArchivistApiProviderProps {
  apiDomain: string
  jwtToken?: string
}

export const ArchivistApiProvider: React.FC<ArchivistApiProviderProps> = ({ apiDomain, children, jwtToken }) => {
  const [api, setApi] = useState<XyoArchivistApi>()
  const [authApi, setAuthApi] = useState<XyoAuthApi>()

  // allows children to know the token was set before calling the api
  const [currentToken, setCurrentToken] = useState<string | undefined>(jwtToken)

  useEffect(() => {
    setAuthApi(XyoAuthApi.get({ apiDomain }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setApi(new XyoArchivistApi({ apiDomain, jwtToken }))
    setCurrentToken(jwtToken)
  }, [apiDomain, jwtToken])

  return (
    <ArchivistApiContext.Provider value={{ api, authApi, currentToken }}>
      {api && authApi ? children : null}
    </ArchivistApiContext.Provider>
  )
}

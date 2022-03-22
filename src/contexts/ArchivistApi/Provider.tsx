import { XyoArchivistApi } from '@xyo-network/sdk-xyo-client-js'
import { useEffect, useState } from 'react'

import { ArchivistApiContext } from './Context'

export interface ArchivistApiProviderProps {
  apiDomain: string
  jwtToken?: string
  required?: boolean
}

export const ArchivistApiProvider: React.FC<ArchivistApiProviderProps> = ({
  required = false,
  apiDomain,
  children,
  jwtToken,
}) => {
  const [api, setApi] = useState<XyoArchivistApi>()

  // allows children to know the token was set before calling the api
  const [currentToken, setCurrentToken] = useState<string | undefined>(jwtToken)

  useEffect(() => {
    setApi(new XyoArchivistApi({ apiDomain, jwtToken }))
    setCurrentToken(jwtToken)
  }, [apiDomain, jwtToken])

  return (
    <ArchivistApiContext.Provider value={{ api, currentToken }}>
      {api ? children : required ? null : children}
    </ArchivistApiContext.Provider>
  )
}

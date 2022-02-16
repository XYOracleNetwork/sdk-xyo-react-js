import { XyoArchivistApi } from '@xyo-network/sdk-xyo-client-js'
import { useEffect, useState } from 'react'

import { ArchivistApiContext } from './Context'

export interface ArchivistApiProviderProps {
  apiDomain: string
  archive: string
  jwtToken?: string
}

export const ArchivistApiProvider: React.FC<ArchivistApiProviderProps> = ({
  archive,
  apiDomain,
  children,
  jwtToken,
}) => {
  const [api, setApi] = useState<XyoArchivistApi>()

  // allows children to know the token was set before calling the api
  const [currentToken, setCurrentToken] = useState<string | undefined>()

  useEffect(() => {
    setApi(archive ? new XyoArchivistApi({ apiDomain, archive, jwtToken }) : undefined)
    setCurrentToken(jwtToken)
  }, [archive, apiDomain, jwtToken])

  return (
    <ArchivistApiContext.Provider value={{ api, currentToken }}>{api ? children : null}</ArchivistApiContext.Provider>
  )
}

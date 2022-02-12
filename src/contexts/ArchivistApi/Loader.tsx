import { XyoArchivistApi } from '@xyo-network/sdk-xyo-client-js'
import { useEffect, useState } from 'react'

import { ArchivistApiContext } from './Context'

export interface ArchivistApiLoaderProps {
  apiDomain: string
  archive: string
  jwtToken: string | undefined
}

export const ArchivistApiLoader: React.FC<ArchivistApiLoaderProps> = ({ archive, apiDomain, children, jwtToken }) => {
  const [api, setApi] = useState<XyoArchivistApi>()

  // allows children to know the token was set before calling the api
  const [currentToken, setCurrentToken] = useState<string>()

  useEffect(() => {
    setApi(archive ? XyoArchivistApi.get({ apiDomain, archive, jwtToken }) : undefined)
    setCurrentToken(jwtToken)
  }, [archive, apiDomain, jwtToken])

  return (
    <ArchivistApiContext.Provider value={{ api, currentToken }}>{api ? children : null}</ArchivistApiContext.Provider>
  )
}

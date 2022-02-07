import { XyoArchivistApi } from '@xyo-network/sdk-xyo-client-js'
import { useEffect, useState } from 'react'

import { ArchivistApiContext } from './Context'

export interface ArchivistApiLoaderProps {
  apiDomain: string
  archive: string
}

export const ArchivistApiLoader: React.FC<ArchivistApiLoaderProps> = ({ archive, apiDomain, children }) => {
  const [api, setApi] = useState<XyoArchivistApi>()

  useEffect(() => {
    setApi(archive ? XyoArchivistApi.get({ apiDomain, archive: archive }) : undefined)
  }, [archive, apiDomain])

  return <ArchivistApiContext.Provider value={{ api }}>{api ? children : null}</ArchivistApiContext.Provider>
}

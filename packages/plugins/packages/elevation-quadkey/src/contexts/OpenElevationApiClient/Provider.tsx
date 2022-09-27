import { WithChildren } from '@xylabs/react-shared'
import { useState } from 'react'

import { OpenElevationApiClient, OpenElevationApiClientConfig } from '../../classes'
import { OpenElevationApiContext } from './Context'

export interface OpenElevationApiProviderProps extends WithChildren {
  openElevationApiConfig?: OpenElevationApiClientConfig
}

export const OpenElevationApiProvider: React.FC<OpenElevationApiProviderProps> = ({ children, openElevationApiConfig = {} }) => {
  const [client, setClient] = useState(new OpenElevationApiClient(openElevationApiConfig))

  const lookupLocations: OpenElevationApiClient['lookupPost'] = async (locations) => {
    return await client.lookupPost(locations)
  }
  return (
    <OpenElevationApiContext.Provider value={{ client, lookupLocations, provided: true, setClient }}>{children}</OpenElevationApiContext.Provider>
  )
}

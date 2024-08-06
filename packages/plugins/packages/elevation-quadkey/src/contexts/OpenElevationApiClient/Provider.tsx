import { WithChildren } from '@xylabs/react-shared'
import React, { useState } from 'react'

import { OpenElevationApiClient, OpenElevationApiClientConfig } from '../../classes/index.ts'
import { OpenElevationApiContext } from './Context.ts'

export interface OpenElevationApiProviderProps extends WithChildren {
  openElevationApiConfig?: OpenElevationApiClientConfig
}

export const OpenElevationApiProvider: React.FC<OpenElevationApiProviderProps> = ({ children, openElevationApiConfig }) => {
  const [client, setClient] = useState(new OpenElevationApiClient(openElevationApiConfig))

  const lookupLocations: OpenElevationApiClient['lookupPost'] = async (locations) => {
    return await client.lookupPost(locations)
  }
  return (
    // eslint-disable-next-line @eslint-react/no-unstable-context-value
    <OpenElevationApiContext.Provider value={{ client, lookupLocations, provided: true, setClient }}>{children}</OpenElevationApiContext.Provider>
  )
}

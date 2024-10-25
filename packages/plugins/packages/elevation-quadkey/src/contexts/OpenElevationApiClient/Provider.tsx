import type { PropsWithChildren } from 'react'
import React, { useState } from 'react'

import type { OpenElevationApiClientConfig } from '../../classes/index.ts'
import { OpenElevationApiClient } from '../../classes/index.ts'
import { OpenElevationApiContext } from './Context.ts'

export interface OpenElevationApiProviderProps extends PropsWithChildren {
  openElevationApiConfig?: OpenElevationApiClientConfig
}

export const OpenElevationApiProvider: React.FC<OpenElevationApiProviderProps> = ({ children, openElevationApiConfig }) => {
  const [client, setClient] = useState(() => new OpenElevationApiClient(openElevationApiConfig))

  const lookupLocations: OpenElevationApiClient['lookupPost'] = async (locations) => {
    return await client.lookupPost(locations)
  }
  return (
    // eslint-disable-next-line @eslint-react/no-unstable-context-value
    <OpenElevationApiContext.Provider value={{
      client, lookupLocations, provided: true, setClient,
    }}
    >
      {children}
    </OpenElevationApiContext.Provider>
  )
}

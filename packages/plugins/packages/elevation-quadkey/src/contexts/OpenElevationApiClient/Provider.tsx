import type { PropsWithChildren } from 'react'
import React, {
  useCallback, useMemo, useState,
} from 'react'

import type { OpenElevationApiClientConfig } from '../../classes/index.ts'
import { OpenElevationApiClient } from '../../classes/index.ts'
import { OpenElevationApiContext } from './Context.ts'
import type { OpenElevationApiClientState } from './State.ts'

export interface OpenElevationApiProviderProps extends PropsWithChildren {
  openElevationApiConfig?: OpenElevationApiClientConfig
}

export const OpenElevationApiProvider: React.FC<OpenElevationApiProviderProps> = ({ children, openElevationApiConfig }) => {
  const [client, setClient] = useState(() => new OpenElevationApiClient(openElevationApiConfig))

  const lookupLocations: OpenElevationApiClient['lookupPost'] = useCallback(async (locations) => {
    return await client.lookupPost(locations)
  }, [client])

  const value = useMemo(() => {
    const values: OpenElevationApiClientState = {
      client,
      lookupLocations,
      setClient,
      provided: true,
    }
    return values
  }, [client, lookupLocations])

  return (
    <OpenElevationApiContext value={value}>
      {children}
    </OpenElevationApiContext>
  )
}

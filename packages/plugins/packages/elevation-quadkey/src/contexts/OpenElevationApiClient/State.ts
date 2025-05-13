import type { ContextExState } from '@xylabs/react-shared'
import type { Dispatch, SetStateAction } from 'react'

import type { OpenElevationApiClient } from '../../classes/index.ts'

export type OpenElevationApiClientState = ContextExState<{
  client?: OpenElevationApiClient
  lookupLocations?: OpenElevationApiClient['lookupPost']
  setClient?: Dispatch<SetStateAction<OpenElevationApiClient>>
}>

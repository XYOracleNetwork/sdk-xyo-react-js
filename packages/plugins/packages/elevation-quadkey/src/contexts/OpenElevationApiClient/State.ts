import type { ContextExState } from '@xyo-network/react-shared'
import type { Dispatch, SetStateAction } from 'react'

import type { OpenElevationApiClient } from '../../classes/index.ts'

export interface OpenElevationApiClientState extends ContextExState {
  client?: OpenElevationApiClient
  lookupLocations?: OpenElevationApiClient['lookupPost']
  setClient?: Dispatch<SetStateAction<OpenElevationApiClient>>
}

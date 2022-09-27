import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch, SetStateAction } from 'react'

import { OpenElevationApiClient } from '../../classes'

export interface OpenElevationApiClientState extends ContextExState {
  client?: OpenElevationApiClient
  setClient?: Dispatch<SetStateAction<OpenElevationApiClient>>
  lookupLocations?: OpenElevationApiClient['lookupPost']
}

import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch, SetStateAction } from 'react'

import { OpenElevationApiClient } from '../../classes/index.js'

export interface OpenElevationApiClientState extends ContextExState {
  client?: OpenElevationApiClient
  lookupLocations?: OpenElevationApiClient['lookupPost']
  setClient?: Dispatch<SetStateAction<OpenElevationApiClient>>
}

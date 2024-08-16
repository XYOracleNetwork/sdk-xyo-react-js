import type { Map } from 'mapbox-gl'
import type { Dispatch, SetStateAction } from 'react'

export interface MapBoxInstanceState {
  map?: Map
  mapInitialized?: boolean
  setMapBoxInstance?: Dispatch<SetStateAction<Map | undefined>>
}

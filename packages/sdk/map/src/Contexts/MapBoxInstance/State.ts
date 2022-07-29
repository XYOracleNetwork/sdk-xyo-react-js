import { Map } from 'mapbox-gl'
import { Dispatch, SetStateAction } from 'react'

export interface MapBoxInstanceState {
  map?: Map
  mapInitialized?: boolean
  setMapBoxInstance?: Dispatch<SetStateAction<Map | undefined>>
}

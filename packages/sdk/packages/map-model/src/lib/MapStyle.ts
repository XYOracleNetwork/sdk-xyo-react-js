import type { EnumValue } from '@xylabs/enum'
import { Enum } from '@xylabs/enum'

export const MapStyle = Enum({
  Dark: 'mapbox/dark-v10',
  Light: 'mapbox/light-v10',
  Outdoors: 'mapbox/outdoors-v11',
  Satellite: 'mapbox/satellite-v9',
  SatelliteStreets: 'mapbox/satellite-streets-v11',
  Streets: 'mapbox/streets-v11',
})

export type MapStyle = EnumValue<typeof MapStyle>

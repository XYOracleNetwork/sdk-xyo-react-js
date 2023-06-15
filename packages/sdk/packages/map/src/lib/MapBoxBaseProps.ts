import { FlexBoxProps } from '@xylabs/react-flexbox'
import { Feature } from 'geojson'
import { MapboxOptions } from 'mapbox-gl'
import { ReactNode } from 'react'

import { MapLayer } from '../Layers'

export interface MapboxFlexBoxProps extends FlexBoxProps {
  accessToken: string
  developerMode?: boolean
  disableControls?: boolean
  disableFitToPoints?: boolean
  features?: Feature[]
  fitToPointsPadding?: number
  layers?: MapLayer[]
  legend?: ReactNode
  mapBoxOptions?: Partial<MapboxOptions>
  requestLocation?: boolean
  zoom?: number
}

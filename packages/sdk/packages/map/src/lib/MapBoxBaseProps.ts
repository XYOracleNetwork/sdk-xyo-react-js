import { FlexBoxProps } from '@xylabs/react-flexbox'
import { Feature } from 'geojson'
import { MapOptions } from 'mapbox-gl'
import { ReactNode } from 'react'

import { MapLayer } from '../Layers/index.ts'

export interface MapboxFlexBoxProps extends FlexBoxProps {
  accessToken: string
  developerMode?: boolean
  disableControls?: boolean
  disableFitToPoints?: boolean
  features?: Feature[]
  fitToPointsPadding?: number
  layers?: MapLayer[]
  legend?: ReactNode
  mapBoxOptions?: Partial<MapOptions>
  requestLocation?: boolean
  zoom?: number
}

import type { FlexBoxProps } from '@xylabs/react-flexbox'
import type { Feature } from 'geojson'
import type { MapOptions } from 'mapbox-gl'
import type { ReactNode } from 'react'

import type { MapLayer } from '../Layers/index.ts'

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

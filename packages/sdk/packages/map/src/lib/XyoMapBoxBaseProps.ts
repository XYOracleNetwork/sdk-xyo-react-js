import { FlexBoxProps } from '@xylabs/react-flexbox'
import { Feature } from 'geojson'
import { MapboxOptions } from 'mapbox-gl'
import { ReactNode } from 'react'

import { XyoMapLayer } from '../Layers'

export interface XyoMapboxFlexBoxProps extends FlexBoxProps {
  accessToken: string
  developerMode?: boolean
  disableControls?: boolean
  disableFitToPoints?: boolean
  features?: Feature[]
  fitToPointsPadding?: number
  layers?: XyoMapLayer[]
  legend?: ReactNode
  mapBoxOptions?: Partial<MapboxOptions>
  requestLocation?: boolean
  zoom?: number
}

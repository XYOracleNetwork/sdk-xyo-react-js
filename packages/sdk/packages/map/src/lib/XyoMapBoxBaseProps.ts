import { FlexBoxProps } from '@xylabs/react-flexbox'
import { Feature } from 'geojson'
import { MapboxOptions } from 'mapbox-gl'
import { ReactNode } from 'react'

import { XyoMapLayer } from '../Layers'

export interface XyoMapboxFlexBoxProps extends FlexBoxProps {
  developerMode?: boolean
  disableControls?: boolean
  disableFitToPoints?: boolean
  features?: Feature[]
  layers?: XyoMapLayer[]
  mapBoxOptions?: Partial<MapboxOptions>
  fitToPointsPadding?: number
  requestLocation?: boolean
  zoom?: number
  legend?: ReactNode
  accessToken: string
}

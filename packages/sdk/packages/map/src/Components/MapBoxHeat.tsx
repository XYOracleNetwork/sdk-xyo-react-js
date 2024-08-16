import { FlexCol } from '@xylabs/react-flexbox'
import React from 'react'

import type { MapboxFlexBoxProps } from '../lib/index.ts'
import { MapBox } from './MapBox.tsx'
import { MapSettingsBox } from './MapSettingsComponents/index.ts'

export const MapboxHeatFlexBox: React.FC<MapboxFlexBoxProps> = ({ accessToken, children, mapBoxOptions, zoom, legend, developerMode, ...props }) => {
  return (
    <FlexCol {...props}>
      <MapBox accessToken={accessToken} options={mapBoxOptions} zoom={zoom} />
      <MapSettingsBox developerMode={developerMode} />
      {legend}
      {children}
    </FlexCol>
  )
}

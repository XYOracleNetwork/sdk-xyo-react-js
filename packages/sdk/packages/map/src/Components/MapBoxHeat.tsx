import { FlexCol } from '@xylabs/react-flexbox'
import React from 'react'

import { MapboxFlexBoxProps } from '../lib/index.js'
import { MapBox } from './MapBox.js'
import { MapSettingsBox } from './MapSettingsComponents/index.js'

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

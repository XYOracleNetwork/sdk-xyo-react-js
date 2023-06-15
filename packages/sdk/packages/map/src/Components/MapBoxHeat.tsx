import { FlexCol } from '@xylabs/react-flexbox'

import { MapboxFlexBoxProps } from '../lib'
import { MapBox } from './MapBox'
import { MapSettingsBox } from './MapSettingsComponents'

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

import { FlexCol } from '@xylabs/react-flexbox'

import { XyoMapboxFlexBoxProps } from '../lib'
import { MapBox } from './MapBox'
import { MapSettings } from './MapSettingsComponents'

export const XyoMapboxHeatFlexBox: React.FC<XyoMapboxFlexBoxProps> = ({ accessToken, children, mapBoxOptions, zoom, legend, ...props }) => {
  return (
    <FlexCol {...props}>
      <MapBox accessToken={accessToken} options={mapBoxOptions} zoom={zoom} />
      <MapSettings />
      {legend}
      {children}
    </FlexCol>
  )
}

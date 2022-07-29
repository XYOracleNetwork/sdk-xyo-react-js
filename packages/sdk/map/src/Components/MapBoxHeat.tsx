import { FlexCol } from '@xylabs/react-flexbox'

import { XyoMapBoxBaseProps } from '../lib'
import { MapBox } from './MapBox'
import { MapSettings } from './MapSettingsComponents'

export const MapBoxHeat: React.FC<XyoMapBoxBaseProps> = ({ accessToken, children, mapBoxOptions, zoom, legend, ...props }) => {
  return (
    <FlexCol {...props}>
      <MapBox accessToken={accessToken} options={mapBoxOptions} zoom={zoom} />
      <MapSettings />
      {legend}
      {children}
    </FlexCol>
  )
}

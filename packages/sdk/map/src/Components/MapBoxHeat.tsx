import { FlexCol } from '@xylabs/react-flexbox'
import { WithChildren } from '@xylabs/react-shared'

import { XyoMapBoxBaseProps } from '../lib'
import { MapBox } from './MapBox'
import { MapSettings } from './MapSettingsComponents'

export const MapBoxHeat: React.FC<WithChildren<XyoMapBoxBaseProps>> = ({ children, mapBoxOptions, zoom, legend, ...props }) => {
  return (
    <FlexCol {...props}>
      <MapBox options={mapBoxOptions} zoom={zoom} />
      <MapSettings />
      {legend}
      {children}
    </FlexCol>
  )
}

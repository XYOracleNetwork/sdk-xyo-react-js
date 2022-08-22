import { Alert, AlertTitle, useTheme } from '@mui/material'
import { FlexBoxProps } from '@xylabs/sdk-react'
import { XyoPayload } from '@xyo-network/payload'
import {
  LocationPointsMapLayerBuilder,
  MapBoxInstanceProvider,
  MapSettingsProvider,
  NetworkXyoLocationAnswerPayload,
  useMapboxAccessToken,
  XyoMapboxPointsFlexBox,
} from '@xyo-network/react-map'

import { PointsMapSettings } from './PointsMapSettings'

export interface PayloadPointsMapProps extends FlexBoxProps {
  payload?: XyoPayload
}

const PayloadPointsMapInner: React.FC<PayloadPointsMapProps> = ({ payload, ...props }) => {
  const theme = useTheme()
  const features = (payload as NetworkXyoLocationAnswerPayload)?.result?.features
  const { accessToken } = useMapboxAccessToken()
  return (
    <>
      {accessToken ? (
        <XyoMapboxPointsFlexBox
          accessToken={accessToken}
          features={features}
          layers={LocationPointsMapLayerBuilder(theme.palette.secondary.main)}
          {...props}
        />
      ) : (
        <Alert severity={'error'}>
          <AlertTitle>Mapbox Token Missing</AlertTitle>
        </Alert>
      )}
    </>
  )
}

const PayloadPointsMapWithSettings: React.FC<PayloadPointsMapProps> = ({ ...props }) => {
  return (
    <MapBoxInstanceProvider>
      <MapSettingsProvider defaultMapSettings={PointsMapSettings}>
        <PayloadPointsMap {...props} />
      </MapSettingsProvider>
    </MapBoxInstanceProvider>
  )
}

const PayloadPointsMap: React.FC<PayloadPointsMapProps> = (props) => {
  return (
    <MapBoxInstanceProvider>
      <PayloadPointsMapInner {...props} />
    </MapBoxInstanceProvider>
  )
}

export { PayloadPointsMap, PayloadPointsMapWithSettings }

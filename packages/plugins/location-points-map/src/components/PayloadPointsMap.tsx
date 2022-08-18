import { Alert, useTheme } from '@mui/material'
import { FlexBoxProps } from '@xylabs/sdk-react'
import { XyoPayload } from '@xyo-network/payload'
import {
  LocationPointsMapLayerBuilder,
  MapBoxInstanceProvider,
  MapBoxPoints,
  MapSettingsProvider,
  NetworkXyoLocationAnswerPayload,
  useMapboxAccessToken,
} from '@xyo-network/react-map'

import { PointsMapSettings } from './PointsMapSettings'

interface PayloadPointsMapProps extends FlexBoxProps {
  payload?: XyoPayload
}

const PayloadPointsMap: React.FC<PayloadPointsMapProps> = ({ payload, ...props }) => {
  const theme = useTheme()
  const features = (payload as NetworkXyoLocationAnswerPayload)?.result?.features
  const { accessToken } = useMapboxAccessToken()
  return (
    <>
      {accessToken ? (
        <MapBoxPoints accessToken={accessToken} features={features} layers={LocationPointsMapLayerBuilder(theme.palette.secondary.main)} {...props} />
      ) : (
        <Alert title="Mapbox Token Missing" />
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

export { PayloadPointsMap, PayloadPointsMapWithSettings }

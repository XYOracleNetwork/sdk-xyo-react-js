import { Alert, AlertTitle, useTheme } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { XyoPayload } from '@xyo-network/payload-model'
import {
  LocationPointsMapLayerBuilder,
  MapBoxInstanceProvider,
  MapSettingsProvider,
  NetworkXyoLocationAnswerPayload,
  useMapboxAccessToken,
  XyoMapboxPointsFlexBox,
} from '@xyo-network/react-map'

import { PointsMapSettings } from './PointsMapSettings'

export interface PointsMapInnerProps extends FlexBoxProps {
  payload?: XyoPayload
  accessToken?: string
}

const PointsMapInner: React.FC<PointsMapInnerProps> = ({ payload, accessToken, ...props }) => {
  const theme = useTheme()
  const features = (payload as NetworkXyoLocationAnswerPayload)?.result?.features
  const { accessToken: accessTokenFromContext } = useMapboxAccessToken()
  const accessTokenResolved = accessToken ?? accessTokenFromContext

  if (Array.isArray(features) && features.length === 0) {
    return (
      <Alert severity="warning">
        <AlertTitle>Missing Data</AlertTitle>
        No geolocation data present in payload
      </Alert>
    )
  }

  return accessTokenResolved ? (
    <XyoMapboxPointsFlexBox
      accessToken={accessTokenResolved}
      features={features}
      layers={LocationPointsMapLayerBuilder(theme.palette.secondary.main)}
      height="100%"
      {...props}
    />
  ) : (
    <Alert severity={'error'}>
      <AlertTitle>Mapbox Token Missing</AlertTitle>
      Please add it to the environment variable or pass it directly to the component
    </Alert>
  )
}

const PointsMapWithSettingsRenderer: React.FC<PointsMapInnerProps> = ({ ...props }) => {
  return (
    <MapBoxInstanceProvider>
      <MapSettingsProvider defaultMapSettings={PointsMapSettings}>
        <PointsMapInner {...props} />
      </MapSettingsProvider>
    </MapBoxInstanceProvider>
  )
}

const PointsMapRenderer: React.FC<PointsMapInnerProps> = (props) => {
  return (
    <MapBoxInstanceProvider>
      <PointsMapInner {...props} />
    </MapBoxInstanceProvider>
  )
}

export { PointsMapRenderer, PointsMapWithSettingsRenderer }

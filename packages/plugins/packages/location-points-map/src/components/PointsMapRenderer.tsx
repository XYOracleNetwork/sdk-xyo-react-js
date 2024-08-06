import { Alert, AlertTitle, useTheme } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { Payload } from '@xyo-network/payload-model'
import {
  isNetworkLocationAnswer,
  LocationPointsMapLayerBuilder,
  MapBoxInstanceProvider,
  MapboxPointsFlexBox,
  MapSettingsProvider,
  useMapboxAccessToken,
} from '@xyo-network/react-map'

import { PointsMapSettings } from './PointsMapSettings.js'

export interface PointsMapInnerProps extends FlexBoxProps {
  accessToken?: string
  payload?: Payload
}

const PointsMapInner: React.FC<PointsMapInnerProps> = ({ accessToken, payload, ...props }) => {
  const theme = useTheme()
  const locationAnswerPayload = payload && isNetworkLocationAnswer(payload) ? payload : undefined
  const features = locationAnswerPayload?.result?.features
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

  return accessTokenResolved
    ? (
        <MapboxPointsFlexBox
          accessToken={accessTokenResolved}
          features={features}
          layers={LocationPointsMapLayerBuilder(theme.palette.secondary.main)}
          height="100%"
          {...props}
        />
      )
    : (
        <Alert severity="error">
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

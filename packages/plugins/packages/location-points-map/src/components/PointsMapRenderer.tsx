import {
  Alert, AlertTitle, useTheme,
} from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import type { Payload } from '@xyo-network/payload-model'
import {
  LocationPointsMapLayerBuilder,
  MapBoxInstanceProvider,
  MapboxPointsFlexBox,
  MapSettingsProvider,
} from '@xyo-network/react-map'
import {
  isNetworkLocationAnswer,
  useMapboxAccessToken,
} from '@xyo-network/react-map-model'
import type { Feature, Point } from 'geojson'
import React from 'react'

import { PointsMapSettings } from './PointsMapSettings.ts'

export interface PointsMapInnerProps extends FlexBoxProps {
  accessToken?: string
  payload?: Payload
}

const PointsMapInner: React.FC<PointsMapInnerProps> = ({
  accessToken, payload, ...props
}) => {
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
          features={features as Feature<Point>[]}
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

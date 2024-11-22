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
import { useMapboxAccessToken } from '@xyo-network/react-map-model'
import type { Feature, Point } from 'geojson'
import React, { useMemo } from 'react'

import { locationPayloadToGCS } from '../GCSTransformers/index.ts'
import { PointMapSettings } from './PointMapSettings.ts'

export interface PointMapInnerProps extends FlexBoxProps {
  accessToken?: string
  payload?: Payload
}

const PointMapInner: React.FC<PointMapInnerProps> = ({
  accessToken, payload, ...props
}) => {
  const theme = useTheme()
  const locationPayload = payload ? locationPayloadToGCS(payload) : undefined
  const { accessToken: accessTokenFromContext } = useMapboxAccessToken()
  const accessTokenResolved = accessToken ?? accessTokenFromContext

  const feature = useMemo<Feature<Point> | undefined>(() => locationPayload
    ? {
        geometry: {
          coordinates: [locationPayload?.longitude, locationPayload?.latitude],
          type: 'Point',
        },
        properties: {},
        type: 'Feature',
      }
    : undefined, [locationPayload])

  if (!locationPayload || !locationPayload.latitude || !locationPayload.longitude) {
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
          features={feature ? [feature] : []}
          layers={LocationPointsMapLayerBuilder(theme.palette.secondary.main)}
          height="100%"
          zoom={9}
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

const PointMapWithSettingsRenderer: React.FC<PointMapInnerProps> = ({ ...props }) => {
  return (
    <MapBoxInstanceProvider>
      <MapSettingsProvider defaultMapSettings={PointMapSettings}>
        <PointMapInner {...props} />
      </MapSettingsProvider>
    </MapBoxInstanceProvider>
  )
}

const PointMapRenderer: React.FC<PointMapInnerProps> = (props) => {
  return (
    <MapBoxInstanceProvider>
      <PointMapInner {...props} />
    </MapBoxInstanceProvider>
  )
}

export { PointMapRenderer, PointMapWithSettingsRenderer }

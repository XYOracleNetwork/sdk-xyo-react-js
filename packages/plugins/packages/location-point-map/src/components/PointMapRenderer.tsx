import { Alert, AlertTitle, useTheme } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { GeographicCoordinateSystemLocationPayload } from '@xyo-network/location-payload-plugin'
import { Payload } from '@xyo-network/payload-model'
import {
  LocationPointsMapLayerBuilder,
  MapBoxInstanceProvider,
  MapboxPointsFlexBox,
  MapSettingsProvider,
  useMapboxAccessToken,
} from '@xyo-network/react-map'
import { Feature, Point } from 'geojson'
import { useEffect, useState } from 'react'

import { PointMapSettings } from './PointMapSettings.js'

export interface PointMapInnerProps extends FlexBoxProps {
  accessToken?: string
  payload?: Payload
}

const PointMapInner: React.FC<PointMapInnerProps> = ({ accessToken, payload, ...props }) => {
  const theme = useTheme()
  const [feature, setFeature] = useState<Feature<Point>>()
  const locationPayload = payload ? (payload as GeographicCoordinateSystemLocationPayload) : undefined
  const { accessToken: accessTokenFromContext } = useMapboxAccessToken()
  const accessTokenResolved = accessToken ?? accessTokenFromContext

  useEffect(() => {
    if (locationPayload) {
      // convert location payload to geojson to reuse mapbox map render components
      setFeature({
        geometry: {
          coordinates: [locationPayload?.longitude, locationPayload?.latitude],
          type: 'Point',
        },
        properties: {},
        type: 'Feature',
      })
    }
  }, [locationPayload])

  if (!locationPayload || !locationPayload.latitude || !locationPayload.longitude) {
    return (
      <Alert severity="warning">
        <AlertTitle>Missing Data</AlertTitle>
        No geolocation data present in payload
      </Alert>
    )
  }

  return accessTokenResolved ?
      <MapboxPointsFlexBox
        accessToken={accessTokenResolved}
        features={feature ? [feature] : []}
        layers={LocationPointsMapLayerBuilder(theme.palette.secondary.main)}
        height="100%"
        zoom={9}
        {...props}
      />
    : <Alert severity={'error'}>
        <AlertTitle>Mapbox Token Missing</AlertTitle>
        Please add it to the environment variable or pass it directly to the component
      </Alert>
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

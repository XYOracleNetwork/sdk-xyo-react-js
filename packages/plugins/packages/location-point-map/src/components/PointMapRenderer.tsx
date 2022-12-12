import { Alert, AlertTitle, useTheme } from '@mui/material'
import { FlexBoxProps } from '@xylabs/sdk-react'
import { GeographicCoordinateSystemLocationPayload } from '@xyo-network/location-payload-plugin'
import { XyoPayload } from '@xyo-network/payload'
import {
  LocationPointsMapLayerBuilder,
  MapBoxInstanceProvider,
  MapSettingsProvider,
  useMapboxAccessToken,
  XyoMapboxPointsFlexBox,
} from '@xyo-network/react-map'
import { Feature, Point } from 'geojson'
import { useEffect, useState } from 'react'

import { PointMapSettings } from './PointMapSettings'

export interface PointMapInnerProps extends FlexBoxProps {
  payload?: XyoPayload
  accessToken?: string
}

const PointMapInner: React.FC<PointMapInnerProps> = ({ payload, accessToken, ...props }) => {
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

  return accessTokenResolved ? (
    <XyoMapboxPointsFlexBox
      accessToken={accessTokenResolved}
      features={feature ? [feature] : []}
      layers={LocationPointsMapLayerBuilder(theme.palette.secondary.main)}
      height="100%"
      zoom={9}
      {...props}
    />
  ) : (
    <Alert severity={'error'}>
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

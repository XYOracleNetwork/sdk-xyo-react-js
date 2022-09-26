import { Alert, AlertTitle, useTheme } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { XyoPayload } from '@xyo-network/payload'
import {
  HeatMapInitializerProvider,
  LocationHeatMapLayerBuilder,
  MapBoxInstanceProvider,
  MapHeatConstants,
  MapSettingsProvider,
  NetworkXyoLocationHeatmapQuadkeyAnswerPayload,
  useMapboxAccessToken,
  useQuadKeyPayloadsToFeatures,
  XyoMapboxHeatFlexBox,
} from '@xyo-network/react-map'
import { Feature, Polygon } from 'geojson'
import React from 'react'

import { ElevationQuadkeyMapSettings } from './ElevationQuadkeyMapSettings'

export interface ElevationQuadkeyMapInnerProps extends FlexBoxProps {
  payload?: XyoPayload
  accessToken?: string
}

const ElevationQuadkeyMapInner: React.FC<ElevationQuadkeyMapInnerProps> = ({ payload, accessToken, ...props }) => {
  const { features } = useQuadKeyPayloadsToFeatures(payload as NetworkXyoLocationHeatmapQuadkeyAnswerPayload)
  const theme = useTheme()
  const { accessToken: accessTokenFromContext } = useMapboxAccessToken(true)
  const accessTokenResolved = accessToken ?? accessTokenFromContext

  return accessTokenResolved ? (
    <HeatMapInitializerProvider
      features={features as Feature<Polygon>[]}
      heatMapColorProps={{ staticMapColor: theme.palette.secondary.main }}
      layers={LocationHeatMapLayerBuilder(theme.palette.secondary.main)}
    >
      <XyoMapboxHeatFlexBox accessToken={accessTokenResolved} features={features as Feature<Polygon>[]} {...props} />
    </HeatMapInitializerProvider>
  ) : (
    <Alert severity={'error'}>
      <AlertTitle>Mapbox Token Missing</AlertTitle>
      Please add it to the environment variable or pass it directly to the component
    </Alert>
  )
}

export const ElevationQuadkeyMapWithSettingsRenderer: React.FC<ElevationQuadkeyMapInnerProps> = ({ ...props }) => {
  return (
    <MapBoxInstanceProvider>
      <MapSettingsProvider defaultMapSettings={ElevationQuadkeyMapSettings} debugLayerName={MapHeatConstants.LocationDebugLayerId}>
        <ElevationQuadkeyMapInner {...props} />
      </MapSettingsProvider>
    </MapBoxInstanceProvider>
  )
}

export const ElevationQuadkeyMapRenderer: React.FC<ElevationQuadkeyMapInnerProps> = ({ ...props }) => {
  return (
    <MapBoxInstanceProvider>
      <ElevationQuadkeyMapInner {...props} />
    </MapBoxInstanceProvider>
  )
}

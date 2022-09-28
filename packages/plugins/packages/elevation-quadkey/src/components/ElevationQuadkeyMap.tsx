import { Alert, AlertTitle, useTheme } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { WithChildren } from '@xylabs/react-shared'
import { XyoPayload } from '@xyo-network/payload'
import {
  HeatMapInitializerProvider,
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

import { OpenElevationApiProvider } from '../contexts'
import { useElevationProcessor } from '../hooks'
import { ElevationExtrusionLayerBuilder } from '../layers'
import { ElevationQuadkeyMapSettings } from './ElevationQuadkeyMapSettings'

export interface ElevationQuadkeyMapInnerProps extends FlexBoxProps {
  payload?: XyoPayload
  accessToken?: string
  developerMode?: boolean
}

const ElevationQuadkeyMapInner: React.FC<ElevationQuadkeyMapInnerProps> = ({ payload, developerMode, accessToken, ...props }) => {
  const { features } = useElevationProcessor(payload)
  console.log(features)
  const theme = useTheme()
  const { accessToken: accessTokenFromContext } = useMapboxAccessToken(true)
  const accessTokenResolved = accessToken ?? accessTokenFromContext

  return accessTokenResolved ? (
    <>
      {features && features.length ? (
        <HeatMapInitializerProvider
          features={features as Feature<Polygon>[]}
          heatMapColorProps={{ staticMapColor: theme.palette.secondary.main }}
          layers={ElevationExtrusionLayerBuilder(theme.palette.secondary.main)}
        >
          <XyoMapboxHeatFlexBox
            developerMode={developerMode}
            accessToken={accessTokenResolved}
            features={features as Feature<Polygon>[]}
            {...props}
          />
        </HeatMapInitializerProvider>
      ) : (
        <FlexCol busy minHeight={400} />
      )}
    </>
  ) : (
    <Alert severity={'error'}>
      <AlertTitle>Mapbox Token Missing</AlertTitle>
      Please add it to the environment variable or pass it directly to the component
    </Alert>
  )
}

const WithProviders: React.FC<WithChildren> = ({ children }) => (
  <OpenElevationApiProvider>
    <MapBoxInstanceProvider>{children}</MapBoxInstanceProvider>
  </OpenElevationApiProvider>
)

export const ElevationQuadkeyMapWithSettingsRenderer: React.FC<ElevationQuadkeyMapInnerProps> = ({ ...props }) => {
  return (
    <WithProviders>
      <MapSettingsProvider defaultMapSettings={ElevationQuadkeyMapSettings()} debugLayerName={MapHeatConstants.LocationDebugLayerId}>
        <ElevationQuadkeyMapInner {...props} />
      </MapSettingsProvider>
    </WithProviders>
  )
}

export const ElevationQuadkeyMapRenderer: React.FC<ElevationQuadkeyMapInnerProps> = ({ ...props }) => {
  return (
    <WithProviders>
      <ElevationQuadkeyMapInner {...props} />
    </WithProviders>
  )
}

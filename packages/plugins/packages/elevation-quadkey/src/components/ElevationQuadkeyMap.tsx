import { Alert, AlertTitle, useTheme } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { WithChildren } from '@xylabs/react-shared'
import { Payload } from '@xyo-network/payload-model'
import {
  HeatMapInitializerProvider,
  MapBoxInstanceProvider,
  MapSettingsProvider,
  useMapboxAccessToken,
  XyoMapboxHeatFlexBox,
} from '@xyo-network/react-map'
import { Feature, Polygon } from 'geojson'
import React, { useMemo } from 'react'

import { OpenElevationApiProvider } from '../contexts'
import { useElevationProcessor } from '../hooks'
import { ElevationExtrusionLayerBuilder, ExtrusionLayerBuilderConstants } from '../layers'
import { ElevationQuadkeyMapSettings } from './ElevationQuadkeyMapSettings'

export interface ElevationQuadkeyMapInnerProps extends FlexBoxProps {
  accessToken?: string
  developerMode?: boolean
  payload?: Payload
}

const ElevationQuadkeyMapInner: React.FC<ElevationQuadkeyMapInnerProps> = ({ payload, developerMode, accessToken, ...props }) => {
  const { features } = useElevationProcessor(payload)
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
            mapBoxOptions={{ pitch: 40 }}
            {...props}
          >
            {/* TODO - pass elevation settings as children */}
          </XyoMapboxHeatFlexBox>
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
  const defaultElevationSettings = useMemo(() => ElevationQuadkeyMapSettings(), [])
  return (
    <WithProviders>
      <MapSettingsProvider defaultMapSettings={defaultElevationSettings} debugLayerName={ExtrusionLayerBuilderConstants.ElevationDebugLayerId}>
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

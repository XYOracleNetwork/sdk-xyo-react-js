import {
  Alert, AlertTitle, useTheme,
} from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol } from '@xylabs/react-flexbox'
import type { Payload } from '@xyo-network/payload-model'
import {
  HeatMapInitializerProvider,
  MapboxHeatFlexBox,
  MapBoxInstanceProvider,
  MapSettingsProvider,
} from '@xyo-network/react-map'
import { useMapboxAccessToken } from '@xyo-network/react-map-model'
import type { Feature, Polygon } from 'geojson'
import type { PropsWithChildren } from 'react'
import React, { useMemo } from 'react'

import { OpenElevationApiProvider } from '../contexts/index.ts'
import { useElevationProcessor } from '../hooks/index.ts'
import { ElevationExtrusionLayerBuilder, ExtrusionLayerBuilderConstants } from '../layers/index.ts'
import { ElevationQuadkeyMapSettings } from './ElevationQuadkeyMapSettings.ts'

export interface ElevationQuadkeyMapInnerProps extends FlexBoxProps {
  accessToken?: string
  developerMode?: boolean
  payload?: Payload
}

const ElevationQuadkeyMapInner: React.FC<ElevationQuadkeyMapInnerProps> = ({
  payload, developerMode, accessToken, ...props
}) => {
  const { features } = useElevationProcessor(payload)
  const theme = useTheme()
  const { accessToken: accessTokenFromContext } = useMapboxAccessToken(true)
  const accessTokenResolved = accessToken ?? accessTokenFromContext

  return accessTokenResolved
    ? (
        <>
          {features && features.length > 0
            ? (
                <HeatMapInitializerProvider
                  features={features as Feature<Polygon>[]}
                  heatMapColorProps={{ staticMapColor: theme.vars.palette.secondary.main }}
                  layers={ElevationExtrusionLayerBuilder(theme.vars.palette.secondary.main)}
                >
                  <MapboxHeatFlexBox
                    developerMode={developerMode}
                    accessToken={accessTokenResolved}
                    features={features as Feature<Polygon>[]}
                    mapBoxOptions={{ pitch: 40 }}
                    {...props}
                  >
                    {/* TODO - pass elevation settings as children */}
                  </MapboxHeatFlexBox>
                </HeatMapInitializerProvider>
              )
            : <FlexCol busy minHeight={400} />}
        </>
      )
    : (
        <Alert severity="error">
          <AlertTitle>Mapbox Token Missing</AlertTitle>
          Please add it to the environment variable or pass it directly to the component
        </Alert>
      )
}

const WithProviders: React.FC<PropsWithChildren> = ({ children }) => (
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

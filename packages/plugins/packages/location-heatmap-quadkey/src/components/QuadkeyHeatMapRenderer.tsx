import {
  Alert, AlertTitle, useTheme,
} from '@mui/material'
import { ErrorRender } from '@xylabs/react-error'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import type { Payload } from '@xyo-network/payload-model'
import {
  HeatMapInitializerProvider,
  LocationHeatMapLayerBuilder,
  MapboxHeatFlexBox,
  MapBoxInstanceProvider,
  MapHeatConstants,
  MapSettingsProvider,
  useQuadKeyPayloadsToFeatures,
} from '@xyo-network/react-map'
import {
  type MapSetting,
  type NetworkLocationHeatmapQuadkeyAnswerPayload,
  useMapboxAccessToken,
} from '@xyo-network/react-map-model'
import type { Feature, Polygon } from 'geojson'
import React, { useMemo } from 'react'

import { QuadkeyHeatMapSettings } from './QuadKeyHeatMapSettings.ts'

export interface QuadkeyHeatMapInnerProps extends FlexBoxProps {
  accessToken?: string
  developerMode?: boolean
  payload?: Payload
}

const QuadkeyHeatMapInner: React.FC<QuadkeyHeatMapInnerProps> = ({
  developerMode, payload, accessToken, ...props
}) => {
  const { error, features } = useQuadKeyPayloadsToFeatures((payload ?? {}) as NetworkLocationHeatmapQuadkeyAnswerPayload)
  const theme = useTheme()
  const { accessToken: accessTokenFromContext } = useMapboxAccessToken(true)
  const accessTokenResolved = accessToken ?? accessTokenFromContext

  const layers = useMemo(() => {
    return LocationHeatMapLayerBuilder(theme.vars.palette.secondary.main)
  }, [theme.vars.palette.secondary.main])

  return (
    <ErrorRender error={error} errorContext="QuadKeyHeatMapRenderer">
      {accessTokenResolved
        ? (
            <HeatMapInitializerProvider
              features={features as Feature<Polygon>[]}
              heatMapColorProps={{ staticMapColor: theme.vars.palette.secondary.main }}
              layers={layers}
            >
              <MapboxHeatFlexBox accessToken={accessTokenResolved} features={features as Feature<Polygon>[]} developerMode={developerMode} {...props} />
            </HeatMapInitializerProvider>
          )
        : (
            <Alert severity="error">
              <AlertTitle>Mapbox Token Missing</AlertTitle>
              Please add it to the environment variable or pass it directly to the component
            </Alert>
          )}
    </ErrorRender>
  )
}

export interface QuadkeyHeatMapSettings extends QuadkeyHeatMapInnerProps {
  settings?: MapSetting
}

export const QuadkeyHeatMapWithSettingsRenderer: React.FC<QuadkeyHeatMapSettings> = ({ settings, ...props }) => {
  return (
    <MapBoxInstanceProvider>
      <MapSettingsProvider defaultMapSettings={settings ?? QuadkeyHeatMapSettings()} debugLayerName={MapHeatConstants.LocationDebugLayerId}>
        <QuadkeyHeatMapInner {...props} />
      </MapSettingsProvider>
    </MapBoxInstanceProvider>
  )
}

export const QuadkeyHeatMapRenderer: React.FC<QuadkeyHeatMapInnerProps> = ({ ...props }) => {
  return (
    <MapBoxInstanceProvider>
      <QuadkeyHeatMapInner {...props} />
    </MapBoxInstanceProvider>
  )
}

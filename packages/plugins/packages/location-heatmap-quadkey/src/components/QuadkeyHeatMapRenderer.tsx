import { Alert, AlertTitle, useTheme } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { XyoPayload } from '@xyo-network/payload'
import {
  HeatMapInitializerProvider,
  LocationHeatMapLayerBuilder,
  MapBoxInstanceProvider,
  MapHeatConstants,
  MapSetting,
  MapSettingsProvider,
  NetworkXyoLocationHeatmapQuadkeyAnswerPayload,
  useMapboxAccessToken,
  useQuadKeyPayloadsToFeatures,
  XyoMapboxHeatFlexBox,
} from '@xyo-network/react-map'
import { Feature, Polygon } from 'geojson'
import { useMemo } from 'react'

import { QuadkeyHeatMapSettings } from './QuadKeyHeatMapSettings'

export interface QuadkeyHeatMapInnerProps extends FlexBoxProps {
  payload?: XyoPayload
  accessToken?: string
  developerMode?: boolean
}

const QuadkeyHeatMapInner: React.FC<QuadkeyHeatMapInnerProps> = ({ developerMode, payload, accessToken, ...props }) => {
  const { features } = useQuadKeyPayloadsToFeatures(payload as NetworkXyoLocationHeatmapQuadkeyAnswerPayload)
  const theme = useTheme()
  const { accessToken: accessTokenFromContext } = useMapboxAccessToken(true)
  const accessTokenResolved = accessToken ?? accessTokenFromContext

  const layers = useMemo(() => {
    return LocationHeatMapLayerBuilder(theme.palette.secondary.main, undefined)
  }, [theme.palette.secondary.main])

  return accessTokenResolved ? (
    <HeatMapInitializerProvider
      features={features as Feature<Polygon>[]}
      heatMapColorProps={{ staticMapColor: theme.palette.secondary.main }}
      layers={layers}
    >
      <XyoMapboxHeatFlexBox accessToken={accessTokenResolved} features={features as Feature<Polygon>[]} developerMode={developerMode} {...props} />
    </HeatMapInitializerProvider>
  ) : (
    <Alert severity={'error'}>
      <AlertTitle>Mapbox Token Missing</AlertTitle>
      Please add it to the environment variable or pass it directly to the component
    </Alert>
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

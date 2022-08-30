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

import { QuadkeyHeatMapSettings } from './QuadKeyHeatMapSettings'

export interface QuadkeyHeatMapInnerProps extends FlexBoxProps {
  payload?: XyoPayload
  accessToken?: string
}

const QuadkeyHeatMapInner: React.FC<QuadkeyHeatMapInnerProps> = ({ payload, accessToken, ...props }) => {
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

export const QuadkeyHeatMapWithSettingsRenderer: React.FC<QuadkeyHeatMapInnerProps> = ({ ...props }) => {
  return (
    <MapBoxInstanceProvider>
      <MapSettingsProvider defaultMapSettings={QuadkeyHeatMapSettings} debugLayerName={MapHeatConstants.LocationDebugLayerId}>
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

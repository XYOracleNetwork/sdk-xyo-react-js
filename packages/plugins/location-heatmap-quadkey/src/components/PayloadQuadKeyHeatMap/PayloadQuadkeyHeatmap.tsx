import { useTheme } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { XyoPayload } from '@xyo-network/payload'
import {
  HeatMapInitializerProvider,
  LocationHeatMapLayerBuilder,
  MapBoxHeat,
  MapBoxInstanceProvider,
  MapHeatConstants,
  MapSettingsProvider,
  NetworkXyoLocationHeatmapQuadkeyAnswerPayload,
  useMapboxAccessToken,
  useQuadKeyPayloadsToFeatures,
} from '@xyo-network/react-map'
import { Feature, Polygon } from 'geojson'

import { QuadKeyHeatMapSettings } from './QuadKeyHeatMapSettings'

interface PayloadQuadkeyHeatMapProps extends FlexBoxProps {
  payload?: XyoPayload
}

const PayloadQuadkeyHeatMap: React.FC<PayloadQuadkeyHeatMapProps> = ({ payload, ...props }) => {
  const { features } = useQuadKeyPayloadsToFeatures(payload as NetworkXyoLocationHeatmapQuadkeyAnswerPayload)
  const theme = useTheme()
  const { accessToken } = useMapboxAccessToken(true)

  return accessToken ? (
    <HeatMapInitializerProvider
      features={features as Feature<Polygon>[]}
      heatMapColorProps={{ staticMapColor: theme.palette.secondary.main }}
      layers={LocationHeatMapLayerBuilder(theme.palette.secondary.main)}
    >
      <MapBoxHeat accessToken={accessToken} features={features as Feature<Polygon>[]} {...props} />
    </HeatMapInitializerProvider>
  ) : null
}

const PayloadQuadKeyHeatMapWithSettings: React.FC<PayloadQuadkeyHeatMapProps> = ({ ...props }) => {
  return (
    <MapBoxInstanceProvider>
      <MapSettingsProvider defaultMapSettings={QuadKeyHeatMapSettings} debugLayerName={MapHeatConstants.LocationDebugLayerId}>
        <PayloadQuadkeyHeatMap {...props} />
      </MapSettingsProvider>
    </MapBoxInstanceProvider>
  )
}

export { PayloadQuadkeyHeatMap, PayloadQuadKeyHeatMapWithSettings }

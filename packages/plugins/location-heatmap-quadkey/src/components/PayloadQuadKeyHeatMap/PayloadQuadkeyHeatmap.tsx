import { useTheme } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { LocationQuadkeyHeatmapAnswerSchema, locationQuadkeyHeatmapAnswerSchema } from '@xyo-network/api'
import { XyoPayload } from '@xyo-network/payload'
import { HeatMapInitializerProvider, LocationHeatMapLayerBuilder, MapBoxHeat, MapBoxInstanceProvider, MapHeatConstants, MapSettingsProvider } from '@xyo-network/react-map'
import { Feature, Polygon } from 'geojson'

import { NetworkXyoLocationHeatmapQuadkeyAnswerPayload, useQuadKeyPayloadsToFeatures } from '../../../../../diviner'
import { QuadKeyHeatMapSettings } from './QuadKeyHeatMapSettings'

interface PayloadQuadkeyHeatMapProps extends FlexBoxProps {
  payload?: XyoPayload
}

const PayloadQuadkeyHeatMap: React.FC<PayloadQuadkeyHeatMapProps> = ({ payload, ...props }) => {
  const { features } = useQuadKeyPayloadsToFeatures(payload as NetworkXyoLocationHeatmapQuadkeyAnswerPayload)
  const theme = useTheme()

  return (
    <>
      {/* Optimistically cast schemaToTest to the intended type and let the component verify */}
      <PayloadSchemaTester<LocationQuadkeyHeatmapAnswerSchema>
        schemaToTest={payload?.schema as LocationQuadkeyHeatmapAnswerSchema}
        knownSchema={locationQuadkeyHeatmapAnswerSchema}
        payload={payload}
        loader
      >
        <HeatMapInitializerProvider
          features={features as Feature<Polygon>[]}
          heatMapColorProps={{ staticMapColor: theme.palette.secondary.main }}
          layers={LocationHeatMapLayerBuilder(theme.palette.secondary.main)}
        >
          <MapBoxHeat features={features as Feature<Polygon>[]} {...props} />
        </HeatMapInitializerProvider>
      </PayloadSchemaTester>
    </>
  )
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

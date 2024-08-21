import { HeatMapFillLayerConfig } from '../Configs/index.ts'
import { FillLayerBuilder } from '../FillLayer.ts'

const MapHeatConstants = (index: number, type: string) => ({
  LocationDebugLayerId: `location-${type}-debug-id-${index}`,
  LocationDebugLayerSource: `location-${type}-debug-source-${index}`,
  LocationFillLayerId: `location-${type}-fill-id-${index}`,
  LocationFillLayerSource: `location-${type}-fill-source-${index}`,
  LocationLineLayerId: `location-${type}-line-id-${index}`,
  LocationLineLayerSource: `location-${type}-line-source-${index}`,
})

export const LocationHeatMapLayerBuilderAnimated = (color: string, index: number, type = '') => {
  const {
    LocationFillLayerId, LocationFillLayerSource,
  } = MapHeatConstants(index, type)

  const fillLayerConfig = HeatMapFillLayerConfig(color)

  const fillLayer = new FillLayerBuilder(LocationFillLayerId, LocationFillLayerSource, fillLayerConfig)

  return fillLayer
}

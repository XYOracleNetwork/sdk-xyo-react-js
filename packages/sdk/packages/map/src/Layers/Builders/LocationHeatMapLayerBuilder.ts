import { HeatMapFillLayerConfig, HeatMapLineLayerConfig, HeatMapSymbolLayerConfig } from '../Configs/index.js'
import { FillLayerBuilder } from '../FillLayer.js'
import { LineLayerBuilder } from '../LineLayer.js'
import { SymbolLayerBuilder } from '../SymbolLayer.js'

export const MapHeatConstants = {
  LocationDebugLayerId: 'location-debug-id',
  LocationDebugLayerSource: 'location-debug-source',
  LocationFillLayerId: 'location-fill-id',
  LocationFillLayerSource: 'location-fill-source',
  LocationLineLayerId: 'location-line-id',
  LocationLineLayerSource: 'location-line-source',
}

export const LocationHeatMapLayerBuilder = (color: string, alternateColor = '#000') => {
  const {
    LocationFillLayerId,
    LocationFillLayerSource,
    LocationLineLayerId,
    LocationLineLayerSource,
    LocationDebugLayerId,
    LocationDebugLayerSource,
  } = MapHeatConstants

  const fillLayerConfig = HeatMapFillLayerConfig(color)
  const lineLayerConfig = HeatMapLineLayerConfig(color)
  const debugLayerConfig = HeatMapSymbolLayerConfig(alternateColor)

  const fillLayer = new FillLayerBuilder(LocationFillLayerId, LocationFillLayerSource, fillLayerConfig)
  const lineLayer = new LineLayerBuilder(LocationLineLayerId, LocationLineLayerSource, lineLayerConfig)
  const debugLayer = new SymbolLayerBuilder(LocationDebugLayerId, LocationDebugLayerSource, debugLayerConfig)

  return [fillLayer, lineLayer, debugLayer]
}

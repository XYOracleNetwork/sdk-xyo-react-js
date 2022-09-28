import { ElevationExtrusionLayerConfig } from '../configs'
import { FillExtrusionLayerBuilder } from '../FillExtrusionLayer'

export const MapHeatConstants = {
  ElevationDebugLayerId: 'elevation-debug-id',
  ElevationDebugLayerSource: 'elevation-debug-source',
  ElevationExtrusionLayerId: 'elevation-fill-id',
  ElevationExtrusionLayerSource: 'elevation-fill-source',
  QuadkeyElevationLayerId: 'quadkey-elevation-fill-id',
  QuadkeyElevationLayerSource: 'quadkey-elevation-fill-source',
}

export const ElevationExtrusionLayerBuilder = (color: string, alternateColor = '#000') => {
  const { ElevationExtrusionLayerId, ElevationExtrusionLayerSource, QuadkeyElevationLayerId, QuadkeyElevationLayerSource } = MapHeatConstants

  const elevationLayerConfig = ElevationExtrusionLayerConfig(color, 'elevation')
  const quadkeyElevationLayerConfig = ElevationExtrusionLayerConfig(alternateColor, 'quadkeyElevation')
  // const debugLayerConfig = HeatMapSymbolLayerConfig(alternateColor)

  const elevationLayer = new FillExtrusionLayerBuilder(ElevationExtrusionLayerId, ElevationExtrusionLayerSource, elevationLayerConfig)
  const quadkeyElevationLayer = new FillExtrusionLayerBuilder(QuadkeyElevationLayerId, QuadkeyElevationLayerSource, quadkeyElevationLayerConfig)
  // const debugLayer = new SymbolLayerBuilder(LocationDebugLayerId, LocationDebugLayerSource, debugLayerConfig)

  return [elevationLayer, quadkeyElevationLayer]
}

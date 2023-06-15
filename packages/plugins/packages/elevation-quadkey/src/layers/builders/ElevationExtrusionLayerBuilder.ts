import { MapLayer, SymbolLayerBuilder } from '@xyo-network/react-map'

import { ElevationExtrusionLayerConfig, ElevationSymbolLayerConfig } from '../configs'
import { FillExtrusionLayerBuilder } from '../FillExtrusionLayer'

export const ExtrusionLayerBuilderConstants = {
  ElevationDebugLayerId: 'elevation-debug-id',
  ElevationDebugLayerSource: 'elevation-debug-source',
  ElevationExtrusionLayerId: 'elevation-fill-id',
  ElevationExtrusionLayerSource: 'elevation-fill-source',
  QuadkeyElevationLayerId: 'quadkey-elevation-fill-id',
  QuadkeyElevationLayerSource: 'quadkey-elevation-fill-source',
}

export const ElevationExtrusionLayerBuilder = (color: string, alternateColor = '#000') => {
  const {
    ElevationExtrusionLayerId,
    ElevationExtrusionLayerSource,
    QuadkeyElevationLayerId,
    QuadkeyElevationLayerSource,
    ElevationDebugLayerId,
    ElevationDebugLayerSource,
  } = ExtrusionLayerBuilderConstants

  const elevationLayerConfig = ElevationExtrusionLayerConfig(color, 'elevation')
  const quadkeyElevationLayerConfig = ElevationExtrusionLayerConfig(alternateColor, 'quadkeyElevation')
  const debugLayerConfig = ElevationSymbolLayerConfig(alternateColor)

  const elevationLayer = new FillExtrusionLayerBuilder(ElevationExtrusionLayerId, ElevationExtrusionLayerSource, elevationLayerConfig)
  const quadkeyElevationLayer = new FillExtrusionLayerBuilder(QuadkeyElevationLayerId, QuadkeyElevationLayerSource, quadkeyElevationLayerConfig)
  const debugLayer = new SymbolLayerBuilder(ElevationDebugLayerId, ElevationDebugLayerSource, debugLayerConfig)

  const layers: MapLayer[] = [elevationLayer, quadkeyElevationLayer, debugLayer]

  return layers
}

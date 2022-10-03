import { HeatMapSymbolLayerConfig, SymbolLayerBuilder, XyoMapLayer } from '@xyo-network/react-map'

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

export const ElevationExtrusionLayerBuilder = (color: string, alternateColor = '#000', showDebugLayer = false) => {
  const {
    ElevationExtrusionLayerId,
    ElevationExtrusionLayerSource,
    QuadkeyElevationLayerId,
    QuadkeyElevationLayerSource,
    ElevationDebugLayerId,
    ElevationDebugLayerSource,
  } = MapHeatConstants

  const elevationLayerConfig = ElevationExtrusionLayerConfig(color, 'elevation')
  const quadkeyElevationLayerConfig = ElevationExtrusionLayerConfig(alternateColor, 'quadkeyElevation')
  // TODO - replace
  const debugLayerConfig = HeatMapSymbolLayerConfig(alternateColor)

  const elevationLayer = new FillExtrusionLayerBuilder(ElevationExtrusionLayerId, ElevationExtrusionLayerSource, elevationLayerConfig)
  const quadkeyElevationLayer = new FillExtrusionLayerBuilder(QuadkeyElevationLayerId, QuadkeyElevationLayerSource, quadkeyElevationLayerConfig)
  const debugLayer = new SymbolLayerBuilder(ElevationDebugLayerId, ElevationDebugLayerSource, debugLayerConfig)

  const layers: XyoMapLayer[] = [elevationLayer, quadkeyElevationLayer]
  if (showDebugLayer) {
    layers.push(debugLayer)
  }

  return layers
}

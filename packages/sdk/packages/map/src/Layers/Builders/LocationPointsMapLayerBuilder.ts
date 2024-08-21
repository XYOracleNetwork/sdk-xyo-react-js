import { CircleLayerBuilder } from '../CircleLayer.ts'
import { LocationPointLayerConfig } from '../Configs/index.ts'

export const MapPointsConstants = {
  LocationDotsLayerId: 'location-dots',
  LocationDotsLayerSource: 'location-dots-source',
}

export const LocationPointsMapLayerBuilder = (color: string, circleRadius = 6, circleOpacity = 0.8) => {
  const {
    LocationDotsLayerId, LocationDotsLayerSource,
  } = MapPointsConstants

  const dotLayerConfig = LocationPointLayerConfig(color, circleRadius, circleOpacity)

  const dotLayer = new CircleLayerBuilder(LocationDotsLayerId, LocationDotsLayerSource, dotLayerConfig)

  return [dotLayer]
}

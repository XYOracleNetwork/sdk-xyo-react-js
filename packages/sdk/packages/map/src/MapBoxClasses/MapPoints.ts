import { Feature, Point } from 'geojson'
// eslint-disable-next-line no-restricted-imports
import { FitBoundsOptions, LngLatBounds } from 'mapbox-gl'

import { MapBase, MapBaseConfig } from './MapBase'

export interface MapPointsConfig extends MapBaseConfig<Point> {
  features: Feature<Point>[]
}

export class MapPoints extends MapBase<Point> {
  private config: MapPointsConfig

  constructor(config: MapPointsConfig) {
    super(config)
    this.config = config
  }

  initialMapPositioning(options: FitBoundsOptions, initialBounds?: LngLatBounds) {
    let bounds: LngLatBounds

    if (initialBounds) {
      bounds = initialBounds
    } else {
      bounds = new LngLatBounds()

      this.config.features.forEach((feature: Feature<Point>) => {
        bounds.extend(feature.geometry.coordinates as [number, number])
      })
    }

    this.config.map.setCenter(bounds.getCenter())
    this.config.map.fitBounds(bounds, options)

    return this.config.map
  }
}

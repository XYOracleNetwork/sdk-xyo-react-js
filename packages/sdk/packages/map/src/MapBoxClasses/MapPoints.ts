import type { Feature, Point } from 'geojson'
import type { MapOptions } from 'mapbox-gl'
import { LngLatBounds } from 'mapbox-gl'

import type { MapBaseConfig } from './MapBase.ts'
import { MapBase } from './MapBase.ts'

export interface MapPointsConfig extends MapBaseConfig<Point> {
  features: Feature<Point>[]
}

export class MapPoints extends MapBase<Point> {
  private config: MapPointsConfig

  constructor(config: MapPointsConfig) {
    super(config)
    this.config = config
  }

  initialMapPositioning(options: MapOptions['fitBoundsOptions'], initialBounds?: LngLatBounds) {
    let bounds: LngLatBounds

    if (initialBounds) {
      bounds = initialBounds
    } else {
      bounds = new LngLatBounds()

      // eslint-disable-next-line unicorn/no-array-for-each
      this.config.features.forEach((feature: Feature<Point>) => {
        bounds.extend(feature.geometry.coordinates as [number, number])
      })
    }

    this.config.map.setCenter(bounds.getCenter())
    this.config.map.fitBounds(bounds, options)

    return this.config.map
  }
}

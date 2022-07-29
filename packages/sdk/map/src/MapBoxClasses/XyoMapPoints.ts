import { Feature, Point } from 'geojson'
// eslint-disable-next-line no-restricted-imports
import { FitBoundsOptions, LngLatBounds } from 'mapbox-gl'

import { XyoMapBase, XyoMapBaseConfig } from './XyoMapBase'

export interface XyoMapPointsConfig extends XyoMapBaseConfig<Point> {
  features: Feature<Point>[]
}

export class XyoMapPoints extends XyoMapBase<Point> {
  private config: XyoMapPointsConfig

  constructor(config: XyoMapPointsConfig) {
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

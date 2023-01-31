import { assertEx } from '@xylabs/assert'
import { GeoJson } from '@xyo-network/sdk-geo'
import { Feature, Geometry } from 'geojson'
// eslint-disable-next-line no-restricted-imports
import { GeoJSONSource, Map } from 'mapbox-gl'

import { XyoMapLayer } from '../Layers'

export interface XyoMapBaseConfig<T extends Geometry> {
  features: Feature<T>[]
  map: Map
  requestLocation?: boolean
  zoom?: number
}

export abstract class XyoMapBase<T extends Geometry> {
  private _config: XyoMapBaseConfig<T>

  constructor(config: XyoMapBaseConfig<T>) {
    this._config = { requestLocation: true, zoom: 2, ...config }
  }

  get isMapReady() {
    return !!this._config.map
  }

  initializeMapSource(layer: XyoMapLayer) {
    const getSource = () => {
      const featuresCollection = GeoJson.featureCollection(this._config.features)
      return GeoJson.featuresSource(featuresCollection)
    }

    const existingSource = this._config.map.getSource(layer.source as string) as GeoJSONSource
    const source = getSource()
    if (existingSource) {
      existingSource.setData(assertEx(source.data as GeoJSON.Feature<GeoJSON.Geometry> | GeoJSON.FeatureCollection<GeoJSON.Geometry>))
    } else {
      this._config.map.addSource(layer.source as string, source)
    }
    layer.update(this._config.map, true)

    return this
  }
}

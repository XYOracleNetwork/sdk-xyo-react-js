import { Feature, Polygon } from 'geojson'

import { MapLayer } from '../Layers/index.js'

export interface FeaturesToLayersMap {
  features: Feature<Polygon>[]
  layers: MapLayer[]
}

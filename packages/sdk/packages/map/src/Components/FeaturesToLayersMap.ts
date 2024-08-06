import { Feature, Polygon } from 'geojson'

import { MapLayer } from '../Layers/index.ts'

export interface FeaturesToLayersMap {
  features: Feature<Polygon>[]
  layers: MapLayer[]
}

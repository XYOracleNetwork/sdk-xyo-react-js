import type { Feature, Polygon } from 'geojson'

import type { MapLayer } from '../Layers/index.ts'

export interface FeaturesToLayersMap {
  features: Feature<Polygon>[]
  layers: MapLayer[]
}

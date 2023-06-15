import { Feature, Polygon } from 'geojson'

import { MapLayer } from '../Layers'

export interface FeaturesToLayersMap {
  features: Feature<Polygon>[]
  layers: MapLayer[]
}

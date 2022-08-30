import { Feature, Polygon } from 'geojson'

import { XyoMapLayer } from '../Layers'

export interface FeaturesToLayersMap {
  features: Feature<Polygon>[]
  layers: XyoMapLayer[]
}

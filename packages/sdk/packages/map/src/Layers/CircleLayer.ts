import { LayerBase } from '@xyo-network/sdk-geo'
import type { CircleLayerSpecification } from 'mapbox-gl'

export class CircleLayerBuilder extends LayerBase<CircleLayerSpecification> {
  CircleLayerOptions: Partial<CircleLayerSpecification>

  // ensures this class passes for `AnyLayer` type in MapBox
  type: 'circle' = 'circle' as const

  constructor(id: string, source: string, CircleLayerOptions?: Partial<CircleLayerSpecification>) {
    super(id, source)
    this.CircleLayerOptions = CircleLayerOptions || { id: this.id, source: this.source, type: 'circle' }
  }

  buildLayer(): CircleLayerSpecification {
    return {
      filter: ['==', '$type', 'Point'],
      layout: {},
      paint: {
        'circle-color': '#ff0000',
        'circle-radius': 6,
      },
      type: this.type,
      ...this.CircleLayerOptions,
      id: this.id,
      source: this.source,
    }
  }
}

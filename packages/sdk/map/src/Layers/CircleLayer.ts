import { LayerBase } from '@xyo-network/sdk-geo'
// eslint-disable-next-line no-restricted-imports
import { CircleLayer } from 'mapbox-gl'

export class CircleLayerBuilder extends LayerBase<CircleLayer> {
  CircleLayerOptions: Partial<CircleLayer>

  // ensures this class passes for `AnyLayer` type in MapBox
  type: 'circle' = 'circle'

  constructor(id: string, source: string, CircleLayerOptions?: Partial<CircleLayer>) {
    super(id, source)
    this.CircleLayerOptions = CircleLayerOptions || { id: this.id, source: this.source, type: 'circle' }
  }
  buildLayer(): CircleLayer {
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

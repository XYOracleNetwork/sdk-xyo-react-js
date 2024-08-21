import { LayerBase } from '@xyo-network/sdk-geo'
import type { LineLayerSpecification } from 'mapbox-gl'

export class LineLayerBuilder extends LayerBase<LineLayerSpecification> {
  LineLayerOptions: Partial<LineLayerSpecification>

  // ensures this class passes for `AnyLayer` type in MapBox
  type: 'line' = 'line' as const

  constructor(id: string, source: string, LineLayerOptions?: Partial<LineLayerSpecification>) {
    super(id, source)
    this.LineLayerOptions = LineLayerOptions || {
      id: this.id, source: this.source,
    }
  }

  buildLayer(): LineLayerSpecification {
    return {
      ...this.LineLayerOptions,
      id: this.id,
      layout: {},
      source: this.source,
      type: this.type,
    }
  }
}

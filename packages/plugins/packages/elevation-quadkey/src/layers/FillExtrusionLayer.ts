import { LayerBase } from '@xylabs/geo'
import type { FillExtrusionLayerSpecification } from 'mapbox-gl'

export class FillExtrusionLayerBuilder extends LayerBase<FillExtrusionLayerSpecification> {
  FillExtrusionLayerOptions: Partial<FillExtrusionLayerSpecification>

  // ensures this class passes for `AnyLayer` type in MapBox
  type: 'fill-extrusion' = 'fill-extrusion' as const

  constructor(id: string, source: string, FillExtrusionLayerOptions?: Partial<FillExtrusionLayerSpecification>) {
    super(id, source)
    this.FillExtrusionLayerOptions = FillExtrusionLayerOptions || { id: this.id, source: this.source }
  }

  buildLayer(): FillExtrusionLayerSpecification {
    return {
      ...this.FillExtrusionLayerOptions,
      id: this.id,
      source: this.source,
      type: this.type,
    }
  }
}

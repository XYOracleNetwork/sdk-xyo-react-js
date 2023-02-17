import { LayerBase } from '@xyo-network/sdk-geo'
// eslint-disable-next-line no-restricted-imports
import { FillExtrusionLayer } from 'mapbox-gl'

export class FillExtrusionLayerBuilder extends LayerBase<FillExtrusionLayer> {
  FillExtrusionLayerOptions: Partial<FillExtrusionLayer>

  // ensures this class passes for `AnyLayer` type in MapBox
  type: 'fill-extrusion' = 'fill-extrusion' as const

  constructor(id: string, source: string, FillExtrusionLayerOptions?: Partial<FillExtrusionLayer>) {
    super(id, source)
    this.FillExtrusionLayerOptions = FillExtrusionLayerOptions || { id: this.id, source: this.source }
  }
  buildLayer(): FillExtrusionLayer {
    return {
      ...this.FillExtrusionLayerOptions,
      id: this.id,
      source: this.source,
      type: this.type,
    }
  }
}

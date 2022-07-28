import { LayerBase } from '@xyo-network/sdk-geo'
// eslint-disable-next-line no-restricted-imports
import { FillLayer } from 'mapbox-gl'

export class FillLayerBuilder extends LayerBase<FillLayer> {
  FillLayerOptions: Partial<FillLayer>

  // ensures this class passes for `AnyLayer` type in MapBox
  type: 'fill' = 'fill'

  constructor(id: string, source: string, FillLayerOptions?: Partial<FillLayer>) {
    super(id, source)
    this.FillLayerOptions = FillLayerOptions || { id: this.id, source: this.source }
  }
  buildLayer(): FillLayer {
    return {
      ...this.FillLayerOptions,
      id: this.id,
      source: this.source,
      type: this.type,
    }
  }
}

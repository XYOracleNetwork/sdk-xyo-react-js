import { LayerBase } from '@xyo-network/sdk-geo'
import { FillLayerSpecification } from 'mapbox-gl'

export class FillLayerBuilder extends LayerBase<FillLayerSpecification> {
  FillLayerOptions: Partial<FillLayerSpecification>

  // ensures this class passes for `AnyLayer` type in MapBox
  type: 'fill' = 'fill' as const

  constructor(id: string, source: string, FillLayerOptions?: Partial<FillLayerSpecification>) {
    super(id, source)
    this.FillLayerOptions = FillLayerOptions || { id: this.id, source: this.source }
  }

  buildLayer(): FillLayerSpecification {
    return {
      ...this.FillLayerOptions,
      id: this.id,
      source: this.source,
      type: this.type,
    }
  }
}

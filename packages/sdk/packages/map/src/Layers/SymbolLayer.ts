import { LayerBase } from '@xylabs/geo'
import type { SymbolLayerSpecification } from 'mapbox-gl'

export class SymbolLayerBuilder extends LayerBase<SymbolLayerSpecification> {
  SymbolLayerOptions: Partial<SymbolLayerSpecification>

  // ensures this class passes for `AnyLayer` type in MapBox
  type: 'symbol' = 'symbol' as const

  constructor(id: string, source: string, SymbolLayerOptions?: Partial<SymbolLayerSpecification>) {
    super(id, source)
    this.SymbolLayerOptions = SymbolLayerOptions || { id: this.id, source: this.source }
  }

  buildLayer(): SymbolLayerSpecification {
    return {
      ...this.SymbolLayerOptions,
      id: this.id,
      source: this.source,
      type: this.type,
    }
  }
}

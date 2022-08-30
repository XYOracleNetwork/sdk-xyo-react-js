import { LayerBase } from '@xyo-network/sdk-geo'
// eslint-disable-next-line no-restricted-imports
import { SymbolLayer } from 'mapbox-gl'

export class SymbolLayerBuilder extends LayerBase<SymbolLayer> {
  SymbolLayerOptions: Partial<SymbolLayer>

  // ensures this class passes for `AnyLayer` type in MapBox
  type: 'symbol' = 'symbol' as const

  constructor(id: string, source: string, SymbolLayerOptions?: Partial<SymbolLayer>) {
    super(id, source)
    this.SymbolLayerOptions = SymbolLayerOptions || { id: this.id, source: this.source }
  }
  buildLayer(): SymbolLayer {
    return {
      ...this.SymbolLayerOptions,
      id: this.id,
      source: this.source,
      type: this.type,
    }
  }
}

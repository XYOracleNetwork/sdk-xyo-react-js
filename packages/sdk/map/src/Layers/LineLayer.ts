import { LayerBase } from '@xyo-network/sdk-geo'
// eslint-disable-next-line no-restricted-imports
import { LineLayer } from 'mapbox-gl'

export class LineLayerBuilder extends LayerBase<LineLayer> {
  LineLayerOptions: Partial<LineLayer>

  // ensures this class passes for `AnyLayer` type in MapBox
  type: 'line' = 'line'

  constructor(id: string, source: string, LineLayerOptions?: Partial<LineLayer>) {
    super(id, source)
    this.LineLayerOptions = LineLayerOptions || { id: this.id, source: this.source }
  }
  buildLayer(): LineLayer {
    return {
      ...this.LineLayerOptions,
      id: this.id,
      layout: {},
      source: this.source,
      type: this.type,
    }
  }
}

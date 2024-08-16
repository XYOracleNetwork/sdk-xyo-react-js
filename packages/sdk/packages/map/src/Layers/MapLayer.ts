import type { LayerBase } from '@xyo-network/sdk-geo'
import type { Layer, LayerSpecification } from 'mapbox-gl'

export interface MapLayer extends Layer {
  update: LayerBase<LayerSpecification>['update']
}

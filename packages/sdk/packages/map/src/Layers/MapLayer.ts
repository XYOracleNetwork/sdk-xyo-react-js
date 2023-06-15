import { LayerBase } from '@xyo-network/sdk-geo'
// eslint-disable-next-line no-restricted-imports
import { AnyLayer, Layer } from 'mapbox-gl'

export interface MapLayer extends Layer {
  update: LayerBase<AnyLayer>['update']
}

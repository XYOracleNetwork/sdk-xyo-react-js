import { LayerBase } from '@xyo-network/sdk-geo'
// eslint-disable-next-line no-restricted-imports
import { AnyLayer, Layer } from 'mapbox-gl'

export interface XyoMapLayer extends Layer {
  update: LayerBase<AnyLayer>['update']
}

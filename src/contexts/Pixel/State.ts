import { XyPixel } from '@xylabs/pixel'

import { ContextExState } from '../../modules'

export interface PixelContextState extends ContextExState {
  pixel?: XyPixel
}

import { XyPixel } from '@xylabs/pixel'

import { ContextExState } from '../contextEx'

export interface PixelContextState extends ContextExState {
  pixel?: XyPixel
}

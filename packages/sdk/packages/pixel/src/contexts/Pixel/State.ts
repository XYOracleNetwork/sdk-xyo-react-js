import { XyPixel } from '@xylabs/pixel'
import { ContextExState } from '@xyo-network/react-shared'

export interface PixelContextState extends ContextExState {
  pixel?: XyPixel
}

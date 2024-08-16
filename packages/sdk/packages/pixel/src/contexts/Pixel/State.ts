import type { XyPixel } from '@xylabs/pixel'
import type { ContextExState } from '@xyo-network/react-shared'

export interface PixelContextState extends ContextExState {
  pixel?: XyPixel
}

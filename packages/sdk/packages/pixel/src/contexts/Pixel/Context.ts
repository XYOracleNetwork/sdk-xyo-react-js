import { createContextEx } from '@xyo-network/react-shared'

import type { PixelContextState } from './State.ts'

export const PixelContext = createContextEx<PixelContextState>()

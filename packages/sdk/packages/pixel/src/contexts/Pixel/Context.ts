import { createContextEx } from '@xylabs/react-shared'

import type { PixelContextState } from './State.ts'

export const PixelContext = createContextEx<PixelContextState>()

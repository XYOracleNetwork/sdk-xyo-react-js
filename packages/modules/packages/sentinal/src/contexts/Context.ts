import { createContextEx } from '@xylabs/react-shared'

import type { SentinelContextState } from './State.ts'

export const SentinelContext = createContextEx<SentinelContextState>()

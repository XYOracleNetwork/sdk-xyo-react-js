import { createContextEx } from '@xyo-network/react-shared'

import type { SentinelContextState } from './State.ts'

export const SentinelContext = createContextEx<SentinelContextState>()

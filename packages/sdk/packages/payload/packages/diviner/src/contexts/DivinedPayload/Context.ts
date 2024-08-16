import { createContextEx } from '@xyo-network/react-shared'

import type { DivinedPayloadState } from './State.ts'

export const DivinedPayloadContext = createContextEx<DivinedPayloadState>()

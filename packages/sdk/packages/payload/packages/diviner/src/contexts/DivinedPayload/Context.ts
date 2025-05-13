import { createContextEx } from '@xylabs/react-shared'

import type { DivinedPayloadState } from './State.ts'

export const DivinedPayloadContext = createContextEx<DivinedPayloadState>()

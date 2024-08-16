import { createContextEx } from '@xyo-network/react-shared'

import type { ValidatePayloadState } from './State.ts'

export const ValidatePayloadContext = createContextEx<ValidatePayloadState>()

import { createContextEx } from '@xylabs/react-shared'

import type { ValidatePayloadState } from './State.ts'

export const ValidatePayloadContext = createContextEx<ValidatePayloadState>()

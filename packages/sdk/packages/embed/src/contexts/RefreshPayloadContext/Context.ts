import { createContextEx } from '@xylabs/react-shared'

import type { RefreshPayloadState } from './State.ts'

export const RefreshPayloadContext = createContextEx<RefreshPayloadState>()
